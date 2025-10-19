import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import logger from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console
    console.error('Uncaught error:', error, errorInfo);
    
    // Log using our logger utility
    logger.error('React Error Boundary caught an error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    }, 'ERROR_BOUNDARY');
    
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-900">
          <Card className="max-w-2xl w-full shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">
                Oops! Something went wrong
              </CardTitle>
              <CardDescription className="text-base mt-2">
                We apologize for the inconvenience. An unexpected error has occurred.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                    Error Details (Development Mode):
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-400 font-mono break-all">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-semibold text-red-800 dark:text-red-300">
                        Stack Trace
                      </summary>
                      <pre className="text-xs mt-2 overflow-auto max-h-48 text-red-700 dark:text-red-400">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-center gap-4">
              <Button onClick={this.handleReset} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button onClick={this.handleGoHome} className="gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
