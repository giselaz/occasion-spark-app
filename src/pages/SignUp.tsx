import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData,formSchema } from "@/lib/UserValidation";
import { Switch } from "../components/ui/switch";
import CreateVendor from "@/components/CreateVendor";
import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "@/api/userService";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
 
  const defaultValues:UserFormData = {
      user:{
        name:'',
        surname:'',
        isVerified:false,
        email:'',
        role:'user',
        password:'',
        confirmPassword:'',
      },
      vendor:{
        name:'',
        logo:'',
        description:''
      }
    
    } as UserFormData 
   const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors}} = useForm<UserFormData>({defaultValues});
  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn: signUpApi,
    onSuccess:()=>
    {
      navigate('/signin');
    }
  });
    const onSubmit = (data:UserFormData) => {
      const userData = data.user;
        mutate(userData);
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
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground">Join EventHub and discover amazing events</p>
        </div>

        <Card className="p-6 shadow-medium">
          {/* Social Sign Up */}
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

          {/* Sign Up Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {isError && <div className="p-4 bg-red-400">{error.message}</div>}
            {isSuccess && <div className="p-4 bg-green-400">{JSON.stringify(data)}</div>}
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="First name"
                    {...register('user.name')}
                    className="pl-10 h-12"
                    error={errors.user?.name?.message.length !== 0}
                  />
                  {errors.user?.name?.message && <p className="text-red-600">{errors.user.name?.message}</p> }
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="surname"
                  type="text"
                  placeholder="Last name"
                  {...register('user.surname',{required:"Surname is required"})}
                  className="h-12"
                  error={errors.user?.surname?.message.length !== 0}
                />
                  {errors.user?.surname?.message && <p className="text-red-600">{errors.user.surname?.message}</p> }
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  {...register('user.email',{required:"Email is required"})}
                  placeholder="Enter your email"
                  className="pl-10 h-12"
                  error={errors.user?.email?.message.length !== 0}
                />
                {errors.user?.email?.message && <p className="text-red-600">{errors.user.email.message}</p> }
              </div>
            </div>


            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register('user.password')}
                  className="pl-10 pr-10 h-12"
                  error={errors.user?.password?.message.length !== 0}
                />
                {errors.user?.password?.message && <p className="text-red-600">{errors.user.password.message}</p> }
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-12"
                 {...register('user.confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {errors.user?.confirmPassword?.message &&  <p className="text-red-600">{errors.user?.confirmPassword.message}</p>}
              </div>
            </div>
              {/* Is Vendor Check*/}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
              <div className="flex justify-between items-start space-x-2">
                <div>
                    <Label htmlFor="isvendor" className="text-base font-medium">
                      Want to register as Vendor
                    </Label>
                <p className="text-sm text-muted-foreground mt-1">
                      Enable if you want to create and manage events
                    </p>
                </div>
                <Switch id="isvendor" checked={isVendor} onCheckedChange={setIsVendor}/>
              </div>
            </div>
            {isVendor && <CreateVendor register={register} errors={errors}/>}
            {/* Vendor form data*/}
            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  // checked={formData.agreeToTerms}
                  // onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked === true)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to EventHub's{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              // disabled={isPending}
              className="w-full h-12 gradient-primary text-white text-base font-semibold"
              // disabled={!formData.agreeToTerms}
            >
                 {isPending ? "Signing up..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <a href="/signin" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;