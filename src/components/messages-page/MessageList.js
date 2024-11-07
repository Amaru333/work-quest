import { MESSAGES_PAGE_STRINGS } from "@/constants/strings/messagesPageStrings";
import httpRequest from "@/lib/httpRequest";
import { getRelativeTime } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function MessageList({ lang, selectedMessage, setSelectedMessage }) {
  const [messages, setMessages] = useState([]);
  //TODO: Add loading

  useEffect(() => {
    httpRequest.get("/mock/messages/messageList.json").then((res) => {
      setMessages(res.data);
    });
    //TODO: Add catch
  }, []);

  return (
    <div className="col-span-3 border-r border-gray-400 pt-6">
      <p className="font-semibold text-3xl mb-4 pr-4">{MESSAGES_PAGE_STRINGS.recent[lang]}</p>
      {messages?.map((message) => {
        const unread = message?.unread_count;
        return (
          <div key={message?._id} className={`flex gap-x-4 p-2 hover:bg-white cursor-pointer transition-all ${selectedMessage === message?._id ? "bg-white" : "bg-inherit"}`} onClick={() => setSelectedMessage(message?._id)}>
            <div>
              <Image src={message?.to?.logo} width={60} height={60} alt={message?.to?.name} className="rounded-full" />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <p className={`text-lg ${unread ? "font-semibold" : "font-normal"}`}>{message?.to?.name}</p>
                <p className={`text-xs text-gray-400 ${unread ? "font-semibold" : "font-normal"}`}>{getRelativeTime(message?.recent_message?.timestamp, lang)}</p>
              </div>
              <div className="flex items-end gap-x-2">
                <p className={`text-sm line-clamp-2 w-full ${unread ? "font-medium" : "font-normal"}`}>{message?.recent_message?.message}</p>
                {unread > 0 && (
                  <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center">
                    <p className="text-xs font-semibold text-white w-6 text-center">{unread}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
