import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
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
            <Button variant={"outline"} size={"lg"} className="w-full shadow">
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
