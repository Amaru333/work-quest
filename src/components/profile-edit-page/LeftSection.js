"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { getUserDetails } from "@/redux/slices/userSlice";

function LeftSection() {
  const userDetails = useSelector(getUserDetails);
  return (
    <div className="col-span-3 h-full min-h-[calc(100vh-10rem)] border-r border-gray-400 pt-6 flex flex-col items-center">
      <div className="mr-20 flex flex-col items-center">
        <Avatar className="w-36 h-36">
          <AvatarImage src={userDetails?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-center text-4xl font-medium mt-4">{userDetails?.name}</p>
      </div>
    </div>
  );
}

export default LeftSection;
