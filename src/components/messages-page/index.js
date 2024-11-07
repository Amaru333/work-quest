"use client";

import React from "react";
import MessageList from "./MessageList";
import { useSelector } from "react-redux";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import MessageDisplay from "./MessageDisplay";

function MessagesPage() {
  const lang = useSelector(selectLanguageCode);

  const [selectedMessage, setSelectedMessage] = React.useState(null);
  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-x-8 px-8 2xl:px-0 mt-6 h-[calc(100vh-10rem)]">
      <MessageList lang={lang} selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />
      <MessageDisplay lang={lang} selectedMessage={selectedMessage} />
    </div>
  );
}

export default MessagesPage;
