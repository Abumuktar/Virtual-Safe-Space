import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, isAdmin, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in as admin
  if (user && isAdmin) {
    navigate('/admin');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message || 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Wait a moment for admin status to be checked
      setTimeout(() => {
        toast({
          title: 'Welcome Back!',
          description: 'Redirecting to admin dashboard...',
        });
        navigate('/admin');
      }, 500);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink/20 via-background to-primary/10 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-pink to-primary mb-6 shadow-lg">
              <Shield size={40} className="text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Admin Portal
            </h1>
            <p className="text-muted-foreground">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card rounded-3xl shadow-card p-8 border border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@virtualsafespace.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 rounded-xl border-border focus:border-pink focus:ring-pink"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 rounded-xl border-border focus:border-pink focus:ring-pink"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-pink to-primary hover:opacity-90 text-white font-semibold shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock size={18} />
                    Sign In to Dashboard
                  </div>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                Not an admin?{' '}
                <Link to="/login" className="text-pink hover:underline font-medium">
                  User Login
                </Link>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border/50">
            <div className="flex items-start gap-3">
              <Shield size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Secure Access</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This portal is for authorized administrators only. All login attempts are logged and monitored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 left-10 w-32 h-32 bg-pink/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default AdminLogin;
