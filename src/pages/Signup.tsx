import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import vssLogo from "@/assets/vss-logo.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast({ title: "Missing fields", variant: "destructive" }); return; }
    if (!agreeToTerms) { toast({ title: "Please agree to terms", variant: "destructive" }); return; }
    if (password.length < 8) { toast({ title: "Password must be at least 8 characters", variant: "destructive" }); return; }
    
    setIsLoading(true);
    const { error } = await signUp(email, password, name);
    setIsLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Welcome to Virtual Safe Space." });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="fixed top-0 right-0 w-64 h-64 bg-purple-light rounded-full blur-3xl opacity-50" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-teal-light rounded-full blur-3xl opacity-50" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/"><img src={vssLogo} alt="VSS" className="h-16 w-auto mx-auto mb-4" /></Link>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Create Your Safe Space</h1>
          <p className="text-muted-foreground mt-2">Join us to get the support you deserve</p>
        </div>
        <div className="bg-card rounded-3xl shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name (optional)</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="pl-11 h-12 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-11 h-12 rounded-xl" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-11 pr-11 h-12 rounded-xl" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(c) => setAgreeToTerms(c as boolean)} className="mt-1" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">I agree to the Terms of Service and Privacy Policy</Label>
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : <><span>Create Account</span><ArrowRight size={18} /></>}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-teal-light/50 rounded-xl flex items-start gap-3">
            <Shield size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Your information is secure and confidential.</p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link></p>
          </div>
        </div>
        <div className="text-center mt-6"><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to home</Link></div>
      </div>
    </div>
  );
};

export default Signup;
