/**
 * Logger Utility
 * Provides consistent logging across the application with different log levels
 * and environment-aware logging
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
  context?: string;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs in memory

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, data?: unknown, context?: string): void {
    if (!this.isDevelopment) return;
    this.log(LogLevel.DEBUG, message, data, context);
    console.log(`[DEBUG] ${context ? `[${context}]` : ''} ${message}`, data || '');
  }

  /**
   * Log info messages
   */
  info(message: string, data?: unknown, context?: string): void {
    this.log(LogLevel.INFO, message, data, context);
    console.info(`[INFO] ${context ? `[${context}]` : ''} ${message}`, data || '');
  }

  /**
   * Log warning messages
   */
  warn(message: string, data?: unknown, context?: string): void {
    this.log(LogLevel.WARN, message, data, context);
    console.warn(`[WARN] ${context ? `[${context}]` : ''} ${message}`, data || '');
  }

  /**
   * Log error messages
   */
  error(message: string, error?: unknown, context?: string): void {
    this.log(LogLevel.ERROR, message, error, context);
    console.error(`[ERROR] ${context ? `[${context}]` : ''} ${message}`, error || '');

    // TODO: Send errors to error tracking service (e.g., Sentry)
    this.sendToErrorTracking(message, error, context);
  }

  /**
   * Store log entry in memory
   */
  private log(level: LogLevel, message: string, data?: unknown, context?: string): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      data,
      context,
    };

    this.logs.push(entry);

    // Limit log size
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  /**
   * Get all logs from memory
   */
  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter((log) => log.level === level);
    }
    return this.logs;
  }

  /**
   * Clear all logs from memory
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Download logs as a file
   */
  downloadLogs(): void {
    const data = this.exportLogs();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Send errors to external tracking service
   * TODO: Integrate with Sentry, LogRocket, or similar service
   */
  private sendToErrorTracking(message: string, error?: unknown, context?: string): void {
    if (!this.isDevelopment && import.meta.env.VITE_ERROR_TRACKING_ENABLED === 'true') {
      // Example: Sentry integration
      // Sentry.captureException(error, {
      //   tags: { context },
      //   extra: { message },
      // });
      
      // For now, just log that we would send to tracking
      console.log('Would send to error tracking:', { message, error, context });
    }
  }

  /**
   * Log API request
   */
  logApiRequest(method: string, url: string, data?: unknown): void {
    this.debug(`API Request: ${method} ${url}`, data, 'API');
  }

  /**
   * Log API response
   */
  logApiResponse(method: string, url: string, status: number, data?: unknown): void {
    if (status >= 200 && status < 300) {
      this.debug(`API Response: ${method} ${url} - ${status}`, data, 'API');
    } else if (status >= 400 && status < 500) {
      this.warn(`API Response: ${method} ${url} - ${status}`, data, 'API');
    } else {
      this.error(`API Response: ${method} ${url} - ${status}`, data, 'API');
    }
  }

  /**
   * Log user action
   */
  logUserAction(action: string, data?: unknown): void {
    this.info(`User Action: ${action}`, data, 'USER');
  }

  /**
   * Log navigation
   */
  logNavigation(from: string, to: string): void {
    this.debug(`Navigation: ${from} → ${to}`, undefined, 'NAVIGATION');
  }

  /**
   * Log authentication events
   */
  logAuth(event: 'login' | 'logout' | 'token_refresh' | 'session_expired', data?: unknown): void {
    this.info(`Auth Event: ${event}`, data, 'AUTH');
  }

  /**
   * Log performance metrics
   */
  logPerformance(metric: string, value: number, unit = 'ms'): void {
    this.debug(`Performance: ${metric} - ${value}${unit}`, undefined, 'PERFORMANCE');
  }
}

// Export singleton instance
const logger = new Logger();
export default logger;

// Export convenience methods
export const { debug, info, warn, error } = logger;
