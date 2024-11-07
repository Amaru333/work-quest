import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function LeftSection() {
  return (
    <div className="col-span-3 h-full min-h-[calc(100vh-10rem)] border-r border-gray-400 pt-6 flex flex-col items-center">
      <div className="mr-20 flex flex-col items-center">
        <Avatar className="w-36 h-36">
          <AvatarImage src="/images/placeholder-avatar.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-center text-4xl font-medium mt-4">Full Name</p>
      </div>
    </div>
  );
}

export default LeftSection;
