import React from "react";
import { twMerge } from "tailwind-merge";

function UIButton({ theme = "primary", className, children, ...rest }) {
  return (
    <button
      className={twMerge(
        `rounded-lg disabled:opacity-30 w-full px-4 py-3 active:scale-95 transition-all duration-200 ${
          theme === "primary"
            ? "bg-primary-100 hover:bg-primary-200 text-white border border-primary-100 hover:border-primary-200"
            : "bg-white text-primary-100 border border-primary-100 hover:border-primary-200 hover:text-primary-200"
        }`,
        className && className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default UIButton;
