import { Search, Send, User } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const HomePage = () => {
  const [chat, setChat] = useState<boolean>(true);
  const [messageStyle, setMessageStyle] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const person = [
    { id: 1, src: "./people/aMan.png", alt: "userImga", name: "Natnael" },
    { id: 2, src: "./people/aWoman.png", alt: "userImga", name: "Melat" },
    { id: 3, src: "./people/aMan.png", alt: "userImga", name: "Natnael" },
    { id: 4, src: "./people/aWoman.png", alt: "userImga", name: "Melat" },
    { id: 5, src: "./people/aMan.png", alt: "userImga", name: "Natnael" },
    { id: 6, src: "./people/aWoman.png", alt: "userImga", name: "Melat" },
    { id: 7, src: "./people/aMan.png", alt: "userImga", name: "Natnael" },
    { id: 8, src: "./people/aWoman.png", alt: "userImga", name: "Melat" },
    { id: 9, src: "./people/aMan.png", alt: "userImga", name: "Natnael" },
    { id: 10, src: "./people/aWoman.png", alt: "userImga", name: "Melat" },
  ];
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
  ];

  return (
    <div className="grid grid-cols-5 p-5 gap-2 h-screen md:grid-cols-4">
      <div className=" col-span-1 space-y-3 h-full ">
        <div>
          <h1 className="text-[1.3rem] font-bold ">Chatter</h1>
        </div>

        {/* userLists */}
        <div className="bg-tertiary  flex-col justify-center items-center overflow-y-scroll scroller-hide h-[calc(100vh-100px)] md:gap-5 md:flex-col md:flex md:justify-start md:pl-2">
          {person.map((p) => (
            <div key={p.id}>
              <button className="md:flex md:gap-2 md:items-center">
                <img
                  src={p.src}
                  alt={p.alt}
                  className="rounded-full w-15 h-15"
                />
                <p className="text-lightText font-bold">{p.name}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-4 md:col-span-2">
        <div className="hidden md:block">
          <Input type="text" placeholder="Search" Icon={Search} />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 pl-5 mb-2">
            <p className="text-text font-bold text-center text-xl">
              Natnael Sisay
            </p>
            <p className="text-lightText text-sm">Online</p>
            <p className="w-2 bg-online h-2 rounded-full"></p>
          </div>
          <Link to="/profile" className="md:hidden">
            <User className="bg-primary rounded-full w-10 h-10 p-1" />
          </Link>
        </div>

        <div className="w-full h-[32rem] bg-chat p-5 rounded">
          {chat ? (
            // the chat
            <div className="h-full overflow-y-scroll scrollbar-hide flex-col gap-5 flex">
              {messages.map((m) => (
                <div key={m.id}>
                  {m.sender === "me" ? (
                    <div className="flex justify-end">
                      <div className="bg-secondary py-3 rounded-full rounded-br-none w-full px-5 md:w-[50%] ">
                        <p className="text-sm text-text w-full font-bold text-right ">
                          {messages[1].message}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <div className="bg-white py-3 rounded-full rounded-bl-none w-full px-5 md:w-[50%]">
                        <p className="text-sm text-primary w-full text-bold">
                          {messages[0].message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            //no chat
            <div className="h-full flex justify-center items-center w-full text-text font-bold">
              No Former Chat with this user
            </div>
          )}
        </div>
        <div className="p-5 flex items-center gap-3 w-full">
          <div className="w-full">
            <Input placeholder="Type Message..." type="text" />
          </div>
          <div>
            <button>
              <Send className="bg-accent text-white w-8 h-8 p-2 rounded-full " />
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:col-span-1 md:grid">
        <Profile />
      </div>
    </div>
  );
};

export default HomePage;
