import { MessageSquare, UserPen, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterType } from "../schemas/users";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

const RegisterPage = () => {
  const registerData = useAuthStore((state) => state.register);
  const response = useAuthStore((state) => state.response);
  const [imageName, setImageName] = useState("No file chosen");
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const OnSubmit = async (data: RegisterType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("file", image);
    await registerData(formData);
    console.log(response);
  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setImageName(image.name);
  };

  return (
    <div className="bg-secondary min-h-screen flex justify-center items-center px-4 md:px-10">
      <div className="bg-background p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col gap-4">
        <div className="flex justify-center">
          <MessageSquare className="h-10 w-10 text-primary" strokeWidth={2.5} />
        </div>
        <h1 className="text-center font-extrabold text-2xl">
          Create Your Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(OnSubmit)}>
          {/* Name */}
          <div>
            <div className="flex gap-2 focus-within:ring-2 px-2 py-1 focus-within:ring-primary rounded-full border-b-1 focus-within:border-0 mb-5 items-center">
              <UserPen className="text-secondary" />
              <input
                type="text"
                placeholder="John Doe"
                className="outline-none placeholder-text w-full"
                {...register("name")}
              />
            </div>
            <p className="text-center text-red-400">
              {errors && errors?.name?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <div className="flex gap-2 focus-within:ring-2 px-2 py-1 focus-within:ring-primary rounded-full border-b-1 focus-within:border-0 mb-5 items-center">
              <Mail className="text-secondary" />
              <input
                type="email"
                placeholder="example@gmail.com"
                className="outline-none placeholder-text w-full"
                {...register("email")}
              />
            </div>
            <p className="text-center text-red-400">
              {errors && errors?.email?.message}
            </p>
          </div>

          {/* Password */}
          <div>
            <div className="flex gap-2 focus-within:ring-2 px-2 py-1 focus-within:ring-primary rounded-full border-b-1 focus-within:border-0 mb-5 items-center">
              <Lock className="text-secondary" />
              <input
                type="password"
                placeholder="password123"
                className="outline-none placeholder-text w-full"
                {...register("password")}
              />
            </div>
            <p className="text-center text-red-400">
              {errors && errors?.password?.message}
            </p>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col space-y-2">
            <label className="text-text font-medium">
              Select Profile Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="profile-image"
                className="hidden"
                onChange={handleImage}
              />
              <label
                htmlFor="profile-image"
                className="px-4 py-2 bg-accent text-white font-semibold rounded-lg cursor-pointer hover:bg-accent-dark transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Choose File</span>
              </label>
              <span className="text-text text-sm">{imageName}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-accent text-white font-bold rounded-full px-6 py-3 active:scale-95 transition duration:300 mt-4"
            >
              Sign Up
            </button>
          </div>

          {/* Link to Login */}
          <p className="text-center text-text mt-2">
            Already have an account?{" "}
            <Link className="text-primary font-bold" to="/login">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
