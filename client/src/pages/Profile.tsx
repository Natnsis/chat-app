import React from "react";
import Button from "../components/Button";

const Profile = () => {
  return (
    <div className="h-screen w-full p-5 flex-col gap-5 flex">
      <div className="flex w-full justify-center items-center">
        <img
          src="./people/aMan.png"
          alt="profilePic"
          className="rounded-full h-60 w-60"
        />
      </div>
      <div className="flex items-center justify-center w-full ">
        <div className="w-full">
          <p className="text-center text-text font-extrabold text-4xl">
            Natnael Sisay
          </p>
          <p className="text-lightText text-center ">example@gmail.com</p>

          <Button text="Logout" styles="w-full mt-40" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
