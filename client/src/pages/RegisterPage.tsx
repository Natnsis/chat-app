import { Mail, MessageSquare, Lock } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const onSubmit = () => {};
  return (
    <div className="bg-secondary h-screen flex justify-center items-center px-10">
      <div className="bg-background p-5 rounded-lg w-full flex flex-col gap-2">
        <div className="flex justify-center">
          <MessageSquare className="h-10 w-10 text-primary" strokeWidth="2.5" />
        </div>
        <div>
          <h1 className="text-center font-extrabold text-[2rem]">
            Create Your Account
          </h1>
        </div>
        <div className="flex gap-2 focus-within:ring-2 px-2 py-1 focus-within:ring-primary rounded-full border-b-1 focus-within:border-0 mb-5">
          <Mail className="text-secondary" />
          <input
            type="text"
            placeholder="example@gmail.com"
            className="outline-none placeholder-text"
          />
        </div>
        <div className="flex gap-2 focus-within:ring-2 px-2 py-1 focus-within:ring-primary rounded-full border-b-1 focus-within:border-0 mb-5">
          <Lock className="text-secondary" />
          <input
            type="password"
            placeholder="password123"
            className="outline-none placeholder-text "
          />
        </div>
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
