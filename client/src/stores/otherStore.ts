import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

type MessageData = {
  senderId: string;
  receiverId: string;
  content: string;
};

type Chat = {
  senderId: string;
  receiverId: string;
};

type UserStoreType = {
  users: any[];
  messages: Chat[];
  response: null;
  getUsers: () => Promise<void>;
  sendMessage: (data: MessageData) => Promise<void>;
  getMessage: (chat: Chat) => Promise<void>;
};

export const useUsersStore = create<UserStoreType>((set, get) => ({
  users: [],
  messages: [],
  response: null,

  getUsers: async () => {
    const res = await api.get("/users");
    set({ users: res.data });
  },

  sendMessage: async (data: MessageData) => {
    const res = await api.post("/message/send", data);
    set({ response: res.data });
  },

  getMessage: async (chat: Chat) => {
    const res = await api.post("/message/get", chat);
    set({ messages: res.data });
  },
}));
