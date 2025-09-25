import { useEffect } from "react";
import { useOtherStore } from "../stores/otherStore";
import { useAuthStore } from "../stores/authStore";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const getUser = useOtherStore((state) => state.getUser);
  const theUser = useOtherStore((state) => state.user);

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
              className="bg-accent text-white font-bold rounded-full px-6 py-3 active:scale-95 transition duration:300 w-full"
              onClick={() => {
                console.log("Logout clicked");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
