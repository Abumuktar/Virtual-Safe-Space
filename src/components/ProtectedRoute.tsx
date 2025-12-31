import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink/10 via-background to-primary/10">
        <div className="flex flex-col items-center gap-4 p-8 bg-card rounded-2xl shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink to-primary flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">Loading...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to admin login if trying to access admin routes
    if (requireAdmin || location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink/10 via-background to-primary/10">
        <div className="flex flex-col items-center gap-4 p-8 bg-card rounded-2xl shadow-soft max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access this area. This section is for administrators only.</p>
          </div>
          <a href="/dashboard" className="text-primary hover:underline font-medium">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
