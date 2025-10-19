import { toast } from "@/components/ui/use-toast";

interface ApiErrorResponse {
  message?: string;
  errors?: Array<{ message: string }>;
  data?: {
    message?: string;
  };
}

export const handleApiError = (error: unknown, customMessage?: string) => {
  console.error("API Error:", error);

  let errorMessage = customMessage || "An unexpected error occurred";

  if (error && typeof error === "object") {
    const apiError = error as ApiErrorResponse;
    
    // Extract error message from various response formats
    if (apiError.message) {
      errorMessage = apiError.message;
    } else if (apiError.data?.message) {
      errorMessage = apiError.data.message;
    } else if (apiError.errors && apiError.errors.length > 0) {
      errorMessage = apiError.errors[0].message;
    }
  }

  toast({
    variant: "destructive",
    title: "Error",
    description: errorMessage,
  });

  return errorMessage;
};

export const handleApiSuccess = (message: string, description?: string) => {
  toast({
    title: message,
    description: description || "Operation completed successfully",
    variant: "default",
  });
};

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Array<{ message: string }>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Retry logic for failed API requests
export const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2);
  }
};
