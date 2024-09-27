import React from "react";
import { twMerge } from "tailwind-merge";

function UIButton({ theme = "primary", className, children }) {
  return <button className={twMerge(`bg-primary-100 rounded-lg text-white w-full px-4 py-3 hover:bg-primary-200 active:scale-95 transition-all duration-200`, className && className)}>{children}</button>;
}

export default UIButton;
