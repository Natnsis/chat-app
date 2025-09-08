import { useState } from "react";
import { Mail, MessageSquare, Lock, UserPen } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const RegisterPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageBase64 = "";
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      imageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
      });
    }

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          imageBase64,
        }),
      });

      const data = await response.json();
      console.log("Registered user:", data);
    } catch (err) {
      console.error("Registration failed:", err);
    }
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="John Doe"
            type="text"
            Icon={UserPen}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="example@gmail.com"
            type="email"
            Icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password123"
            type="password"
            Icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-col space-y-2">
            <label className="text-text font-medium">
              Select Profile Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="profile-image"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="profile-image"
                className="px-4 py-2 bg-accent text-white font-semibold rounded-lg cursor-pointer hover:bg-accent-dark transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Choose File</span>
              </label>
              <span className="text-text text-sm">
                {file ? file.name : "No file selected"}
              </span>
            </div>
          </div>

          <Button text="Sign Up" type="submit" styles="mt-4" />

          <p className="text-center text-text">
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
