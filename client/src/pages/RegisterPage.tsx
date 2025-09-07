import { Mail, MessageSquare, Lock, UserPen } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const RegisterPage = () => {
  const onSubmit = () => {};
  return (
    <div className="bg-secondary h-screen flex justify-center items-center px-10">
      <div className="bg-background p-5 rounded-lg w-full flex flex-col gap-2 md:w-[60%] lg:w-[70%]">
        <div className="flex justify-center">
          <MessageSquare className="h-10 w-10 text-primary" strokeWidth="2.5" />
        </div>
        <div>
          <h1 className="text-center font-extrabold text-[2rem]">
            Create Your Account
          </h1>
        </div>
        <Input placeholder="John doe" type="text" Icon={UserPen} />
        <Input placeholder="example@gmail.com" type="text" Icon={Mail} />
        <Input type="password" placeholder="password123" Icon={Lock} />

        <div className="flex flex-col space-y-2">
          <label className="text-text">Select Profile Image</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              name="file"
              id="profile-image"
              className="hidden"
            />

            <label
              htmlFor="profile-image"
              className="
        px-4 py-2
        bg-accent text-white font-semibold rounded-lg
        cursor-pointer
        hover:bg-accent-dark
        transition-colors duration-200
        flex items-center space-x-2
      "
            >
              <span>Choose File</span>
            </label>

            <span id="fileName" className="text-text text-sm">
              No file selected
            </span>
          </div>
        </div>
        <Button text="Sign Up" onClick={onSubmit} styles="mt-5" />
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-primary font-bold" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
