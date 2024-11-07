import httpRequest from "@/lib/httpRequest";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getDateAndTime } from "@/lib/utils";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { MESSAGES_PAGE_STRINGS } from "@/constants/strings/messagesPageStrings";
import UIButton from "@/widgets/UIButton";

function MessageDisplay({ lang, selectedMessage }) {
  const [messages, setMessages] = useState(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    if (selectedMessage) {
      httpRequest.get("/mock/messages/1.json").then((res) => {
        setMessages(res.data);
      });
    } else {
      setMessages(null);
    }
  }, [selectedMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="col-span-9 h-full pt-6">
      {messages ? (
        <div className="h-full flex flex-col">
          <div className="overflow-y-auto h-[calc(100vh-21rem)] pr-2" ref={scrollRef}>
            {messages?.map((message) => {
              const { date, time } = getDateAndTime(message?.timestamp);
              return (
                <div key={message?._id} className="flex items-start gap-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={message?.sender?.user?.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-medium">{message?.sender?.user?.name}</p>
                    <p className="text-gray-400 text-xs font-semibold">
                      {date} {COMMON_STRINGS.at[lang]} {time}
                    </p>
                    <p className="mt-2 mb-4">{message?.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className="flex gap-x-4 items-start">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/images/placeholder-avatar.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <textarea className="w-full h-24 p-4 border border-gray-400 rounded-lg" placeholder={MESSAGES_PAGE_STRINGS.typeMessage[lang]}></textarea>
            </div>
            <UIButton className="mt-4 w-fit px-20 py-2 ml-16">{COMMON_STRINGS.send[lang]}</UIButton>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">Select a message to view</div>
      )}
    </div>
  );
}

export default MessageDisplay;
