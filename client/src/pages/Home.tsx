import { Send, User } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useOtherStore } from "../stores/otherStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const getUsers = useOtherStore((state) => state.getUsers);
  const users = useOtherStore((state) => state.users) as User[];
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  console.log(users);
  const navigate = useNavigate();

  const messages = [
    {
      id: 1,
      sender: "me",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 2,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 3,
      sender: "me",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 4,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 5,
      sender: "me",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 6,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 7,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 7,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 7,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 7,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 7,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
    {
      id: 7,
      sender: "no",
      message: "hi there i was here for some chat",
      status: "active",
    },
  ];

  return (
    <div className="grid grid-cols-5 p-5 gap-2 h-screen md:grid-cols-4">
      {/* Sidebar */}
      <div className="col-span-1 space-y-3 h-full flex flex-col">
        <h1 className="text-[1.3rem] font-bold">Chatter</h1>
        <div className="bg-tertiary overflow-y-scroll scroller-hide md:gap-5 md:flex-col md:flex md:items-start md:pl-2 flex-grow h-[3rem] px-2">
          {users.map((p) => (
            <div key={p.id} className="mb-2 w-full">
              <button
                onClick={() => navigate(`/home/${p.id}`)}
                className="md:flex md:gap-2 md:items-center border-1 px-3 rounded-lg py-2 w-full"
              >
                <img
                  src={p.url}
                  alt="user_image"
                  className="rounded-full w-15 h-15"
                />
                <p className="text-lightText font-bold">{p.name}</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="col-span-4 md:col-span-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 pl-5">
            <p className="text-text font-bold text-xl">Natnael Sisay</p>
            <p className="text-lightText text-sm">Online</p>
            <p className="w-2 bg-online h-2 rounded-full"></p>
          </div>
          <Link to="/profile" className="md:hidden">
            <User className="bg-primary rounded-full w-10 h-10 p-1" />
          </Link>
        </div>

        {/* Chat Box */}
        <div className="w-full h-[36rem] bg-chat p-5 rounded overflow-y-scroll scroller-hide">
          <div className="w-full h-full flex items-center justify-center">
            <p>No chat selected</p>
          </div>
        </div>

        {/* Message input */}
        <div className="p-5 flex items-center gap-3 w-full">
          <div className="w-full">
            <div className="flex items-center gap-2 border rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-primary">
              <input
                type="text"
                placeholder="Type Message..."
                className="outline-none w-full placeholder-text bg-transparent"
              />
            </div>
          </div>
          <div>
            <button>
              <Send className="bg-accent text-white w-8 h-8 p-2 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Panel */}
      <div className="hidden md:col-span-1 md:grid">
        <Profile />
      </div>
    </div>
  );
};

export default Home;
