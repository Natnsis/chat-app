import React from "react";

const Profile = () => {
  return (
    <div className="h-screen w-full p-5 flex flex-col gap-5">
      <div className="flex w-full justify-center items-center">
        <img
          src="/aMan.png"
          alt="profilePic"
          className="rounded-full h-60 w-60"
        />
      </div>
      <div className="flex items-center justify-center w-full flex-col">
        <div className="w-full">
          <p className="text-center text-text font-extrabold text-4xl">
            Natnael Sisay
          </p>
          <p className="text-lightText text-center">example@gmail.com</p>

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
