import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  loading?: boolean;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const Loading = ({ 
  loading = true, 
  fullScreen = true, 
  size = "md", 
  message = "Loading...",
  className 
}: LoadingProps) => {
  if (!loading) return null;

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const containerClasses = fullScreen 
    ? "flex flex-col items-center justify-center min-h-screen w-screen bg-background/80 backdrop-blur-sm" 
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center space-y-4">
        {/* Modern Animated Spinner */}
        <Loader2 className={cn(sizeClasses[size], "animate-spin text-primary")} />
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">{message}</h2>
          <p className="text-sm text-muted-foreground">Please wait a moment...</p>
        </div>
        {/* Progress indicator */}
        <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse rounded-full" style={{
            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

// Export a simpler inline loader for use within components
export const InlineLoader = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center", className)}>
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>
);

// Button Loading State
export const ButtonLoader = () => (
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
);
  