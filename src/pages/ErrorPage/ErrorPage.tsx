import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string; status?: number };
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const errorMessage = error?.statusText || error?.message || "An unexpected error occurred";
  const errorStatus = error?.status || 500;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-900">
      <Card className="max-w-lg w-full shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <AlertCircle className="h-20 w-20 text-orange-500 dark:text-orange-400" />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center">
                {errorStatus}
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            {errorStatus === 404 ? "Page Not Found" : "Oops! Something went wrong"}
          </CardTitle>
          <CardDescription className="text-base mt-3">
            {errorStatus === 404
              ? "The page you're looking for doesn't exist or has been moved."
              : "We encountered an error while processing your request."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <p className="text-sm text-orange-800 dark:text-orange-300 break-words">
              <span className="font-semibold">Error Details:</span> {errorMessage}
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">What you can do:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Check the URL for typos</li>
              <li>Go back to the previous page</li>
              <li>Return to the homepage</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-3">
          <Button onClick={handleGoBack} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={handleGoHome} className="gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
