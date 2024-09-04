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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { FormData, FormErrors } from "@/types/TRegister";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [register] = useRegisterMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required.";
    if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!acceptedTerms)
      newErrors.terms = "You must accept the Terms & Conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const emailAlreadyRegistered = false; // Change this based on your API logic

      if (emailAlreadyRegistered) {
        setErrors({ email: "This email is already registered." });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;
        const newFormData = {
          ...formDataWithoutConfirmPassword,
          role: "user",
          phone: "Update your phone number!",
          address: "Update your address!",
        };
        const res = await register(newFormData);
        if (res?.data?.success) {
          toast({
            description: " Registration successful!",
          });
          navigate("/login"); // Redirect to login page after successful registration
        }
      }
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedTerms(e.target.checked);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Already have an account?
            <Link to="/login">
            <Button variant={"link"} className="text-blue-500">
              Login
            </Button>
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
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
                  placeholder="Password"
                  type="text"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>{" "}
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type="text"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={handleTermsChange}
                />
                <Label htmlFor="terms">
                  I agree to the{" "}
                  <a href="/terms-and-conditions" className="text-blue-500">
                    Terms & Conditions
                  </a>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms}</p>
              )}
            </div>
            <Button className="w-full mt-5" disabled={!acceptedTerms}>
              Sign Up
            </Button>
          </form>
        </CardContent>
        <SocialLogin />
      </Card>
    </div>
  );
};

export default Register;
