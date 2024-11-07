import React from "react";

function UITextInput({ ...rest }) {
  return <input className="w-full px-4 py-2 border border-slate-400 rounded-md text-sm" {...rest} />;
}

export default UITextInput;
