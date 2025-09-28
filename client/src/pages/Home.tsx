import { Send, User } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useOtherStore } from "../stores/otherStore";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const getUsers = useOtherStore((state) => state.getUsers);
  const users = useOtherStore((state) => state.users);
  const sender = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // No chat selected initially
  const chatSelected = false;

  return (
    <div className="grid grid-cols-5 gap-2 h-screen md:grid-cols-4 bg-gray-50">
      {/* Sidebar */}
      <div className="col-span-1 h-full flex flex-col shadow-lg bg-white rounded-lg p-3 space-y-4 overflow-y-auto">
        <h1 className="text-xl font-bold text-gray-800 text-center">Chatter</h1>
        <div className="flex flex-col gap-3">
          {users
            .filter((p) => p.id !== sender?.userId)
            .map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/home/${p.id}`)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <img
                  src={p.url}
                  alt={p.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <p className="text-gray-700 font-semibold truncate">{p.name}</p>
              </button>
            ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="col-span-4 md:col-span-2 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-white shadow-sm rounded-t-lg">
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {chatSelected ? "Chat" : "No chat selected"}
            </p>
          </div>
          <Link to="/profile" className="md:hidden">
            <User className="bg-primary text-white w-10 h-10 p-2 rounded-full shadow" />
          </Link>
        </div>

        {/* Chat Box */}
        <div className="flex-1 bg-chat p-4 rounded-b-lg overflow-y-auto flex items-center justify-center">
          {!chatSelected && (
            <p className="text-gray-400 text-center">
              Select a user to start chatting
            </p>
          )}
        </div>

        {/* Message input */}
        {chatSelected && (
          <div className="flex items-center gap-3 p-3 bg-white border-t border-gray-200 rounded-b-lg shadow-inner">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
              />
            </div>
            <button className="bg-primary p-3 rounded-full shadow hover:bg-primary-dark transition">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Profile Panel */}
      <div className="hidden md:block md:col-span-1">
        <Profile />
      </div>
    </div>
  );
};

export default Home;
