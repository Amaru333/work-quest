import React from "react";
import { twMerge } from "tailwind-merge";

function UISeparation({ text, vertical = false, className, color = "gray-400" }) {
  return (
    <div className={twMerge("flex items-center", className)}>
      <div className={twMerge(`bg-${color} h-px w-full`)}></div>
      {text && <p className={twMerge(`text-sm text-${color} px-4`)}>{text}</p>}
      <div className={twMerge(`bg-${color} h-px w-full`)}></div>
    </div>
  );
}

export default UISeparation;
