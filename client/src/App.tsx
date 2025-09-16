import { Menu, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-gradient-to-bl from-primary to-transparent h-screen px-3 py-5">
      {/* heading */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" strokeWidth="2.5" />
          <h1 className="text-2xl font-extrabold">Chatter</h1>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-text font-bold">
            Login
          </Link>{" "}
          <Link to="/register" className="text-text font-bold">
            Register
          </Link>
        </div>
        <div className="md:hidden">
          <Menu strokeWidth={2.5} />
        </div>
      </div>

      {/* body */}
      <div className="mt-20 flex flex-col ">
        <h1 className="text-[3rem] text-center font-extrabold">Chat.</h1>
        <h1 className="text-[3rem] text-center font-extrabold">Connect.</h1>
        <h1 className="text-[3rem] text-center font-extrabold">Collaborate.</h1>
      </div>

      {/* mini texts */}
      <div className="mt-10">
        <p className="text-text text-center">
          The modern, clean and minimal way to stay in touch. Experience
          seamless communication like never before
        </p>
      </div>
      <div className="flex justify-center">
        <Link to="/login">
          <button className="bg-accent text-white font-bold rounded-full px-6 py-3 active:scale-95 transition duration:300 mt-4">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default App;
