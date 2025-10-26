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
  const [open, setOpen] = useState(true);
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
    <div className="h-screen flex flex-col justify-center items-center">
      {/* admin credentials */}

      <div className="w-[350px] mb-4">
        <div
          className={`border border-gray-200 shadow-sm rounded-lg overflow-hidden transition-all`}
        >
          {/* HEADER */}
          <button
            onClick={() => setOpen((p) => !p)}
            className="w-full flex items-center justify-between gap-2 p-3 bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-600 rounded" /> {/* LEFT BORDER STYLE */}
              <span className="font-semibold text-sm text-gray-900">
                Demo Credentials
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* BODY */}
          {open && (
            <div className="px-5 pb-4 pt-1 text-sm text-gray-700">
              Use these to sign in:
              <div className="mt-2">
                <span className="font-medium">Admin:</span>{" "}
                <span className="italic">admin@gmail.com</span> /{" "}
                <span className="italic">admin@gmail.com</span>
              </div>
            </div>
          )}
        </div>
      </div>


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
