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
import { useNavigate } from "react-router-dom";

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
        const result = await login(formData).unwrap();
        if (result?.success) {
          dispatch(signIn({ user: result?.data, token: result?.token }));
          toast({
            description: "Signed in successful!",
          });
          navigate("/"); // Redirect to the home after successful login
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrors({
          ...error,
          apiError: "Invalid email or password. Please try again.",
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
            <Button variant={"link"} className="text-blue-500">
              Register
            </Button>
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
