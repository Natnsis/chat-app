import { Mail, MessageSquare, Lock } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const LoginPage = () => {
  const onSubmit = () => {};
  return (
    <div className="bg-secondary h-screen flex justify-center items-center px-10 ">
      <div className="bg-background p-5 rounded-lg w-full flex flex-col gap-2 md:w-[60%] lg:w-[70%]">
        <div className="flex justify-center">
          <MessageSquare className="h-10 w-10 text-primary" strokeWidth="2.5" />
        </div>
        <div>
          <h1 className="text-center font-extrabold text-[2rem]">
            Welcome Back!
          </h1>
        </div>
        <Input placeholder="example@gmail.com" type="text" Icon={Mail} />
        <Input type="password" placeholder="password123" Icon={Lock} />

        <Button text="Sign In" onClick={onSubmit} styles="" />
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="text-primary font-bold" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
