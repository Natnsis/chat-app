import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4002",
});

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
};

export type Chat = {
  senderId: string;
  receiverId: string;
};

export type UserOtherType = {
  users: User[];
  messages: Message[];
  response: any;
  user: User | null;
  partner: User | null;
  getUsers: () => Promise<void>;
  getUser: (id: string) => Promise<void>;
  sendMessage: (data: Message) => Promise<void>;
  getMessage: (chat: Chat) => Promise<void>;
  getPartner: (id: string) => Promise<void>;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  url: string;
  status: string;
  createdAt: string;
};

export const useOtherStore = create<UserOtherType>((set, get) => ({
  users: [],
  user: null,
  messages: [],
  response: null,
  partner: null,

  getUsers: async () => {
    const res = await api.get("/users");
    set({ users: res.data });
  },

  sendMessage: async (data: Message) => {
    const res = await api.post("/message/send", data);
    set({ response: res.data });
  },

  getMessage: async (chat: Chat) => {
    const res = await api.post("/message/get", chat);
    set({ messages: res.data });
  },

  getUser: async (id: string) => {
    const res = await api.get(`/users/${id}`);
    set({ user: res.data });
  },
  getPartner: async (id: string) => {
    const res = await api.get(`/users/${id}`);
    set({ partner: res.data });
  },
}));
