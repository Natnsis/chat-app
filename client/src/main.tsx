import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import App from "./App";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/home/:id", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/home", element: <Home /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/profile", element: <Profile /> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
