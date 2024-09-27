import React from "react";
import { twMerge } from "tailwind-merge";

function UISeparation({ text, className }) {
  return (
    <div className={twMerge("flex items-center", className)}>
      <div className="bg-gray-400 h-px w-full"></div>
      {text && <p className="text-sm text-gray-400 px-4">{text}</p>}
      <div className="bg-gray-400 h-px w-full"></div>
    </div>
  );
}

export default UISeparation;
