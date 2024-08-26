import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Already have an account?
            <Button variant={"link"} className="text-blue-500">
              register
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Password" />
              </div>
            </div>
            <Button className="w-full mt-5">Sign In</Button>
            <Button variant={"link"} className="text-blue-500">
              Forgot Password?
            </Button>
          </form>
        </CardContent>
        <div className="relative mb-5">
          <hr className="mx-6 " />
          <p className="text-center absolute -top-3 bg-white inline-block right-0 left-0 w-40 mx-auto px-5">
            Or sign up with
          </p>
        </div>
        <CardFooter className="">
          <div className="flex justify-between items-center gap-5 w-full">
            <div className="flex-1 w-full">
              <Button variant={"outline"} size={"lg"} className="w-full">
                <FcGoogle size={25} />
              </Button>
            </div>
            <div className="flex-1 w-full">
              <Button variant={"outline"} size={"lg"} className="w-full">
                <FaFacebook size={25} color="blue" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
