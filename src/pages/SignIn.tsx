import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { LoginRequest } from "@/types/event";
import { useAuth } from "@/store/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {register,formState:{errors},handleSubmit } = useForm<LoginRequest>();
  const {login} = useAuth();
  const navigate = useNavigate();
  const {toast} = useToast();
  const onSubmit = async (data:LoginRequest) => {
    setIsLoading(true);
    try {
      const result = await login(data);
      
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
        navigate("/");
      } else {
        toast({
          title: "Sign in failed",
          description: result.error || "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-bold">EventHub</span>
          </a>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Card className="p-6 shadow-medium">
          {/* Social Sign In */}
          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full h-12 text-left justify-start gap-3">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              Continue with Google
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-3 text-sm text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email Sign In Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email',{required:"Email is required"})}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                 {...register('password',{required:"Password is required"})}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 gradient-primary text-white text-base font-semibold"
              disabled={isLoading}
            >
             {isLoading ? "Signing In" : "Sign In"}  
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </a>
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;