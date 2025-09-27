import { useEffect, useState } from "react";
import { useOtherStore } from "../stores/otherStore";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const getUser = useOtherStore((state) => state.getUser);
  const theUser = useOtherStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // This useEffect fetches the user data from the API
  useEffect(() => {
    if (user?.userId) {
      getUser(user.userId);
    }
  }, [getUser, user]);

  // This new useEffect listens for changes to `theUser` state
  useEffect(() => {
    console.log(theUser);
  }, [theUser]); // Logs the updated state whenever it changes

  if (!theUser) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    setIsLoading(true);
    logout();
    setIsLoading(false);
    navigate("/login");
  };

  return (
    <div className="h-screen w-full p-5 flex flex-col gap-5">
      <div className="flex w-full justify-center items-center">
        <img
          src={theUser.url}
          alt="profilePic"
          className="rounded-full h-60 w-60"
        />
      </div>
      <div className="flex items-center justify-center w-full flex-col">
        <div className="w-full">
          <p className="text-center text-text font-extrabold text-4xl capitalize">
            {theUser.name}
          </p>
          <p className="text-lightText text-center">{theUser.email}</p>

          {/* Logout Button */}
          <div className="flex justify-center items-center mt-40">
            <button
              className={`bg-accent text-white rounded-full px-6 py-3 active:scale-95 transition duration-300 w-full font-bold ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
              onClick={handleLogout}
            >
              {isLoading ? "Logging out..." : "logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
