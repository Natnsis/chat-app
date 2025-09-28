import { Send, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useOtherStore } from "../stores/otherStore";
import { socket } from "../socket";
import { useAuthStore } from "../stores/authStore";

const HomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getUsers = useOtherStore((state) => state.getUsers);
  const users = useOtherStore((state) => state.users);
  const getPartner = useOtherStore((state) => state.getPartner);
  const partner = useOtherStore((state) => state.partner);
  const sender = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch users and partner
  useEffect(() => {
    getUsers();
    if (id) getPartner(id);
  }, [getUsers, getPartner, id]);

  // Socket listeners
  useEffect(() => {
    if (!id || !sender?.userId) return;

    // Request messages for this chat
    socket.emit("messages", { senderId: sender.id, receiverId: id });

    // Receive all messages
    const handleMessages = (msg: any) => setMessages(msg);
    const handleReceiveMessage = (msg: any) =>
      setMessages((prev) => [...prev, msg]);

    socket.on("messages", handleMessages);
    socket.on("receive message", handleReceiveMessage);

    // Cleanup listeners on unmount or id change
    return () => {
      socket.off("messages", handleMessages);
      socket.off("receive message", handleReceiveMessage);
    };
  }, [id, sender?.userId]);

  const sendMessage = () => {
    if (!message.trim()) {
      alert("the message is missing");
      return;
    }
    if (!sender?.userId) {
      alert("the message is missing");
      return;
    }
    if (!id) {
      alert("the reciever id is missing");
      return;
    }

    socket.emit("send message", {
      senderId: sender.userId,
      receiverId: id,
      content: message,
    });

    setMessage("");
  };

  return (
    <div className="grid grid-cols-5 p-5 gap-2 h-screen md:grid-cols-4">
      {/* Sidebar */}
      <div className="col-span-1 space-y-3 h-full flex flex-col">
        <h1 className="text-[1.3rem] font-bold">Chatter</h1>
        <div className="bg-tertiary overflow-y-scroll scroller-hide md:gap-5 md:flex-col md:flex md:items-start md:pl-2 flex-grow px-2">
          {users.map((p) => (
            <div key={p.id} className="mb-2 w-full">
              <button
                onClick={() => navigate(`/home/${p.id}`)}
                className="md:flex md:gap-2 md:items-center border px-3 rounded-lg py-2 w-full"
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
      <div className="col-span-4 md:col-span-2 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 pl-5">
            <p className="text-text font-bold text-xl capitalize">
              {partner?.name || "No chat selected"}
            </p>
            {partner && (
              <>
                <p className="text-lightText text-sm">Online</p>
                <p className="w-2 bg-online h-2 rounded-full"></p>
              </>
            )}
          </div>
          <Link to="/profile" className="md:hidden">
            <User className="bg-primary rounded-full w-10 h-10 p-1" />
          </Link>
        </div>

        {/* Chat Box */}
        <div className="w-full h-[36rem] bg-chat p-5 rounded overflow-y-scroll scroller-hide flex flex-col gap-2">
          {!partner && <p className="text-lightText">No chat selected</p>}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded ${
                m.senderId === sender?.id
                  ? "bg-primary text-white self-end"
                  : "bg-tertiary"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>

        {/* Message Input */}
        {partner && (
          <div className="p-5 flex items-center gap-3 w-full">
            <div className="w-full">
              <div className="flex items-center gap-2 border rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-primary">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type Message..."
                  className="outline-none w-full placeholder-text bg-transparent"
                />
              </div>
            </div>
            <div>
              <button onClick={sendMessage}>
                <Send className="bg-accent text-white w-8 h-8 p-2 rounded-full" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Panel */}
      <div className="hidden md:col-span-1 md:grid">
        <Profile />
      </div>
    </div>
  );
};

export default HomePage;
