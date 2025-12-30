import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-teal-light rounded-full blur-3xl opacity-50" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-pink-light rounded-full blur-3xl opacity-50" />

      <div className="text-center relative z-10">
        <div className="font-display text-8xl md:text-9xl font-bold text-gradient mb-4">
          404
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back to safety.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" asChild>
            <Link to="/">
              <Home size={18} />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
