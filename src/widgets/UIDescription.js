import React from "react";

function UIDescription({ ...rest }) {
  return <textarea rows={6} className="w-full px-4 py-2 border border-slate-400 rounded-md text-sm resize-none" {...rest} />;
}

export default UIDescription;
