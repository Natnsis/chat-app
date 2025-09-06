import { Mail, MessageSquare, Lock } from "lucide-react";

const LoginPage = () => {
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
        <div className="flex gap-2 focus-within:ring-2 px-2 py-1 mb-5 hover:border hover:border-primary">
          <label htmlFor="name"></label>
          <input
            type="file"
            name="file"
            placeholder="password123"
            className="outline-none placeholder-text "
          />
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;
