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
import SocialLogin from "@/components/ui/socialLogin";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Don't have an account?
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
        {/* social login component */}
        <SocialLogin />
      </Card>
    </div>
  );
};

export default Login;
