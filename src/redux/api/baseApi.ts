/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { store } from "../store";
import { logout } from "../features/auth/authSlice";
import { handleApiError } from "@/utils/errorHandler";
import logger from "@/utils/logger";
import performanceMonitor from "@/utils/performance";

// A wrapper around fetchBaseQuery to handle JWT expiration and errors
const baseUrl = import.meta.env.VITE_BASEURL || 'http://localhost:5000/api';

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        logger.debug('Attaching auth header', { tokenPreview: `${token.slice(0, 10)}...` }, 'API');
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  // Extract request info for logging
  const method = typeof args === 'string' ? 'GET' : args.method || 'GET';
  const url = typeof args === 'string' ? args : args.url;

  // Log API request
  logger.logApiRequest(method, `${baseUrl}${url}`, typeof args === 'object' ? args.body : undefined);

  // Start performance measurement
  const startTime = performance.now();

  const result = await baseQuery(args, api, extraOptions);

  // End performance measurement
  const duration = performance.now() - startTime;
  performanceMonitor.recordMetric(`api:${method}:${url}`, duration);

  // Log API response
  if (result.error) {
    logger.logApiResponse(method, `${baseUrl}${url}`, result.error.status as number, result.error.data);
  } else {
    logger.logApiResponse(method, `${baseUrl}${url}`, 200, result.data);
  }

  // Handle different error scenarios
  if (result.error) {
    const { status } = result.error;
    const errorData = result.error.data as { message?: string };

    // Handle JWT expiration
    if (status === 500 && errorData?.message === "jwt expired") {
      logger.logAuth('session_expired', { reason: 'jwt_expired' });
      store.dispatch(logout());
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }
      return result;
    }

    // Handle 401 Unauthorized
    if (status === 401) {
      logger.warn('Unauthorized API request', { url, method }, 'API');
      
      // Check if it's a "no access" error vs authentication error
      const isNoAccessError = errorData?.message?.includes('no access to this route');
      
      if (isNoAccessError) {
        // Don't logout for permission errors - just log and return the error
        logger.warn('Permission denied for endpoint', { url, method, role: store.getState().auth.user?.role }, 'API');
        handleApiError(result.error, "You don't have permission to access this resource.");
        return result;
      }
      
      // For actual authentication failures, logout
      handleApiError(result.error, "Session expired. Please login again.");
      store.dispatch(logout());
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }
      return result;
    }

    // Handle 403 Forbidden
    if (status === 403) {
      logger.warn('Forbidden API request', { url, method }, 'API');
      handleApiError(result.error, "You don't have permission to perform this action.");
      return result;
    }

    // Handle 404 Not Found
    if (status === 404) {
      logger.debug('Resource not found', { url, method }, 'API');
      handleApiError(result.error, "The requested resource was not found.");
      return result;
    }

    // Handle 429 Too Many Requests
    if (status === 429) {
      logger.warn('Rate limit exceeded', { url, method }, 'API');
      handleApiError(result.error, "Too many requests. Please try again later.");
      return result;
    }

    // Handle server errors (500+)
    if (typeof status === 'number' && status >= 500) {
      logger.error('Server error', { url, method, status, error: errorData }, 'API');
      handleApiError(result.error, "Server error. Please try again later.");
      return result;
    }

    // Log all errors in development
    if (import.meta.env.DEV) {
      console.error("API Error:", result.error);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["car", "user", "booking", "review"],
  endpoints: () => ({}),
  // Enable refetching on focus and reconnect
  refetchOnFocus: true,
  refetchOnReconnect: true,
  // Keep unused data in cache for 60 seconds
  keepUnusedDataFor: 60,
});

