import { Send, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch users and partner
  useEffect(() => {
    getUsers();
    if (id) getPartner(id);
  }, [getUsers, getPartner, id]);

  // Register user on socket
  useEffect(() => {
    if (!sender?.userId) return;

    const handleConnect = () => {
      socket.emit("register", sender.userId);
    };

    if (socket.connected) handleConnect();
    socket.on("connect", handleConnect);

    return () => socket.off("connect", handleConnect);
  }, [sender?.userId]);

  // Request messages when chat changes
  useEffect(() => {
    if (id && sender?.userId) {
      socket.emit("messages", { senderId: sender.userId, receiverId: id });
    }
  }, [id, sender?.userId]);

  // Socket listeners
  useEffect(() => {
    const handleMessages = (msg: any) => setMessages(msg);
    const handleReceiveMessage = (msg: any) =>
      setMessages((prev) => [...prev, msg]);

    socket.on("messages", handleMessages);
    socket.on("receive message", handleReceiveMessage);

    return () => {
      socket.off("messages", handleMessages);
      socket.off("receive message", handleReceiveMessage);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !sender?.userId || !id) return;

    const newMessage = {
      senderId: sender.userId,
      receiverId: id,
      content: message,
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("send message", newMessage);
    setMessage("");
  };

  return (
    <div className="grid grid-cols-5 gap-2 h-screen md:grid-cols-4 bg-gray-50">
      {/* Sidebar */}
      <div className="col-span-1 h-full flex flex-col bg-white shadow-lg rounded-lg p-3 space-y-4 overflow-y-auto">
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
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-800">
              {partner?.name || "No chat selected"}
            </p>
            {partner && (
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p className="text-gray-400 text-sm">Online</p>
              </div>
            )}
          </div>
          <Link to="/profile" className="md:hidden">
            <User className="bg-primary text-white w-10 h-10 p-2 rounded-full shadow" />
          </Link>
        </div>

        {/* Chat Box */}
        <div className="flex-1 bg-chat p-4 rounded-b-lg overflow-y-auto flex flex-col gap-2 max-h-[36rem] md:max-h-[36rem]">
          {!partner && (
            <p className="text-gray-400 text-center mt-10">
              Select a user to start chatting
            </p>
          )}
          {messages.map((m, i) => {
            const isSender = m.senderId === sender?.userId;
            return (
              <div
                key={i}
                className={`max-w-[70%] p-2 rounded-lg break-words ${
                  isSender
                    ? "bg-primary text-white self-end text-right"
                    : "bg-gray-200 text-gray-800 self-start text-left"
                }`}
              >
                {m.content}
              </div>
            );
          })}
          <div ref={chatEndRef}></div>
        </div>

        {/* Message Input */}
        {partner && (
          <div className="flex items-center gap-3 p-3 bg-white border-t border-gray-200 rounded-b-lg shadow-inner">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
            />
            <button
              onClick={sendMessage}
              className="bg-primary p-3 rounded-full shadow hover:bg-primary-dark transition"
            >
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

export default HomePage;
