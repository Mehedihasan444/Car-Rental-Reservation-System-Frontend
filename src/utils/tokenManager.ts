import { STORAGE_KEYS } from '@/constants';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

/**
 * Token Manager - Handles token storage, retrieval, and validation
 */
class TokenManager {
  private static instance: TokenManager;

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  /**
   * Store tokens in local storage
   */
  public setTokens(accessToken: string, refreshToken: string, expiresIn: number = 3600): void {
    // Try to decode JWT to get actual expiration
    let expiresAt = Date.now() + expiresIn * 1000;
    
    try {
      // Decode JWT (simple base64 decode, no verification needed for expiration)
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      if (payload.exp) {
        // JWT exp is in seconds, convert to milliseconds
        expiresAt = payload.exp * 1000;
        console.log('🔑 Token expires at:', new Date(expiresAt).toLocaleString());
      }
    } catch {
      console.warn('⚠️ Could not decode JWT, using default expiration');
    }
    
    const tokenData: TokenData = {
      accessToken,
      refreshToken,
      expiresAt,
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(tokenData));
  }

  /**
   * Get access token from storage
   */
  public getAccessToken(): string | null {
    const tokenData = this.getTokenData();
    return tokenData?.accessToken || null;
  }

  /**
   * Get refresh token from storage
   */
  public getRefreshToken(): string | null {
    const tokenData = this.getTokenData();
    return tokenData?.refreshToken || null;
  }

  /**
   * Get all token data
   */
  public getTokenData(): TokenData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error parsing token data:', error);
      return null;
    }
  }

  /**
   * Check if access token is expired
   */
  public isTokenExpired(): boolean {
    const tokenData = this.getTokenData();
    if (!tokenData) return true;
    
    // Add 5 minute buffer before actual expiration (instead of 60 seconds)
    const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    return Date.now() >= tokenData.expiresAt - bufferTime;
  }

  /**
   * Check if token exists
   */
  public hasToken(): boolean {
    return this.getAccessToken() !== null;
  }

  /**
   * Clear all tokens
   */
  public clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Update access token (after refresh)
   */
  public updateAccessToken(accessToken: string, expiresIn: number = 3600): void {
    const tokenData = this.getTokenData();
    
    // Try to decode JWT to get actual expiration
    let expiresAt = Date.now() + expiresIn * 1000;
    
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      if (payload.exp) {
        expiresAt = payload.exp * 1000;
        console.log('🔑 Updated token expires at:', new Date(expiresAt).toLocaleString());
      }
    } catch {
      console.warn('⚠️ Could not decode JWT, using default expiration');
    }
    
    const updatedData: TokenData = {
      accessToken,
      refreshToken: tokenData?.refreshToken || '', // Keep existing refresh token or empty string
      expiresAt,
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(updatedData));
  }

  /**
   * Get time until token expiration (in seconds)
   */
  public getTimeUntilExpiration(): number {
    const tokenData = this.getTokenData();
    if (!tokenData) return 0;
    
    const timeRemaining = Math.floor((tokenData.expiresAt - Date.now()) / 1000);
    return Math.max(0, timeRemaining);
  }

  /**
   * Schedule token refresh before expiration
   */
  public scheduleTokenRefresh(refreshCallback: () => Promise<void>): NodeJS.Timeout | null {
    const timeUntilExpiration = this.getTimeUntilExpiration();
    
    if (timeUntilExpiration <= 0) {
      return null;
    }

    // Refresh 5 minutes before expiration
    const refreshTime = Math.max(0, (timeUntilExpiration - 300) * 1000);

    return setTimeout(() => {
      refreshCallback().catch((error) => {
        console.error('Token refresh failed:', error);
      });
    }, refreshTime);
  }
}

export default TokenManager.getInstance();

// Make it available globally for debugging
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).tokenManager = TokenManager.getInstance();
