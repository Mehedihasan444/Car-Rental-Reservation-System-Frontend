import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLogin from "@/components/ui/SocialLogin";
import { useToast } from "@/components/ui/use-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { signIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FormErrors } from "@/types/TRegister";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Attempt login
        const result = await login(formData).unwrap();

        if (result?.success) {
          // Backend sets refreshToken as httpOnly cookie automatically
          // Update Redux state (tokenManager.setTokens is now handled in auth slice)
          dispatch(signIn({ user: result?.data, token: result?.token }));
          
          console.log('✅ Login successful, user:', result?.data);
          console.log('� User Role from API:', result?.data?.role);
          console.log('�🔑 Token stored, navigating to dashboard...');
          
          toast({
            description: "Signed in successfully!",
          });
          
          // Navigate based on user role
          if (result?.data?.role === 'admin') {
            console.log('🎯 Navigating to ADMIN dashboard');
            console.log('🔍 Current URL before navigation:', window.location.href);
            navigate("/dashboard/admin");
            console.log('🔍 Navigation called, URL should change to /dashboard/admin');
            
            // Check URL after a small delay
            setTimeout(() => {
              console.log('🔍 URL after 500ms:', window.location.href);
              console.log('🔍 Pathname after 500ms:', window.location.pathname);
            }, 500);
          } else {
            console.log('🎯 Navigating to USER dashboard');
            console.log('🔍 Current URL before navigation:', window.location.href);
            navigate("/dashboard/user");
            console.log('🔍 Navigation called, URL should change to /dashboard/user');
            
            // Check URL after a small delay
            setTimeout(() => {
              console.log('🔍 URL after 500ms:', window.location.href);
              console.log('🔍 Pathname after 500ms:', window.location.pathname);
            }, 500);
          }
        } else {
          // If login fails but no exception is thrown
          toast({
            description: result?.message || "Login failed. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error: unknown) {
        // Handle API errors or unexpected issues
        const apiError = error as { data?: { message?: string } };
        setErrors({
          ...errors, // Keep existing form errors if any
          apiError:
            apiError?.data?.message ||
            "Invalid email or password. Please try again.",
        });
        toast({
          description: "An error occurred during login.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Don't have an account?
            <Link to="/register">
              <Button variant={"link"} className="text-blue-500">
                Register
              </Button>
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
            {errors.apiError && (
              <p className="text-red-500 text-sm mt-2">{errors.apiError}</p>
            )}
            <Button className="w-full mt-5" type="submit" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <Button variant={"link"} className="text-blue-500 mt-2">
              Forgot Password?
            </Button>
          </form>
        </CardContent>
        {/* Social login component */}
        <SocialLogin />
      </Card>
    </div>
  );
};

export default Login;
