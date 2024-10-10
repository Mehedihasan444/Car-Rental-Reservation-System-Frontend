import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "@/AuthProvider/firebase.config";
import { useAppDispatch } from "@/redux/hooks";
import { signIn } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
const googleProvider = new GoogleAuthProvider();

const SocialLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const handleGoogleLogIn = async () => {
    try {
      // Sign in with Google via Firebase
      const user = await signInWithPopup(auth, googleProvider);

      if (user?.user) {
        // Prepare user data
        const userData = {
          name: user?.user.displayName,
          email: user?.user.email,
          phone: user?.user.phoneNumber || "Update your phone number!",
          password: "social-login",
          role: "user",
          status: "active",
          address: "Update your address!",
        };

        // Attempt to register the user
        await register(userData);

        const loginRes = await login({
          email: user?.user?.email,
          password: "social-login",
        });
        if (loginRes?.data?.success) {
          // Dispatch login action with user data and token
          dispatch(
            signIn({ user: loginRes?.data?.data, token: loginRes?.data?.token })
          );

          // Show success toast
          toast({
            description: "Signed in successfully!",
          });

          // Redirect to homepage
          navigate("/");
        } else {
          // Handle login error if any
          toast({
            description: "Login failed. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="relative mb-5">
        <hr className="mx-6 " />
        <p className="text-center absolute -top-3 bg-white dark:bg-black dark:text-white inline-block right-0 left-0 w-40 mx-auto px-5">
          Or sign up with
        </p>
      </div>
      <CardFooter className="">
        <div className="flex justify-between items-center gap-5 w-full">
          <div className="flex-1 w-full">
            <Button
              onClick={handleGoogleLogIn}
              variant={"outline"}
              size={"lg"}
              className="w-full shadow"
            >
              <FcGoogle size={25} />
            </Button>
          </div>
          <div className="flex-1 w-full">
            <Button variant={"outline"} size={"lg"} className="w-full shadow">
              <FaFacebook size={25} color="blue" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </>
  );
};

export default SocialLogin;
