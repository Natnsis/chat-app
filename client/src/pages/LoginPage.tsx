import { Mail, MessageSquare, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginTypes } from "../schemas/users";
import { useAuthStore } from "../stores/authStore";

const LoginPage = () => {
  const loginUser = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginTypes>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginTypes) => {
    try {
      await loginUser(data);
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="bg-secondary h-screen flex justify-center items-center px-4 md:px-10">
      <div className="bg-background p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col gap-4">
        <div className="flex justify-center">
          <MessageSquare className="h-10 w-10 text-primary" strokeWidth={2.5} />
        </div>
        <h1 className="text-center font-extrabold text-2xl">Welcome Back!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex gap-2 focus-within:ring-2 px-2 py-1 focus-within:ring-primary rounded-full border-b-1 focus-within:border-0 mb-5 items-center">
            <Mail className="text-secondary" />
            <input
              type="email"
              placeholder="example@gmail.com"
              className="outline-none placeholder-text w-full"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="flex gap-2 focus-within:ring-2 px-2 py-1 focus-within:ring-primary rounded-full border-b-1 focus-within:border-0 mb-5 items-center">
            <Lock className="text-secondary" />
            <input
              type="password"
              placeholder="password123"
              className="outline-none placeholder-text w-full"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* Store error */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-white font-bold rounded-full px-6 py-3 active:scale-95 transition duration:300 mt-2"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>

          {/* Link to Register */}
          <p className="text-center text-text mt-2">
            Don&apos;t have an account?{" "}
            <Link className="text-primary font-bold" to="/register">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
