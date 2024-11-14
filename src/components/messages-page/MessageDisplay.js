import httpRequest from "@/lib/httpRequest";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getDateAndTime } from "@/lib/utils";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { MESSAGES_PAGE_STRINGS } from "@/constants/strings/messagesPageStrings";
import UIButton from "@/widgets/UIButton";
import { useSelector } from "react-redux";
import { getUserDetails } from "@/redux/slices/userSlice";

function MessageDisplay({ lang, selectedMessage }) {
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);
  const userData = useSelector(getUserDetails);
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

  const sendMessage = () => {
    const message = {
      _id: "5f5b3b3b1b3e3b3b3b3b3b3d",
      message: newMessage,
      sender: {
        type: "user",
        user: {
          _id: "5f5b3b3b1b3e3b3b3b3b3b3e",
          name: "John Doe",
          avatar: "/images/placeholder-avatar.png",
        },
      },
      timestamp: "2024-10-03T10:00:00.000Z",
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };
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
                    <AvatarImage
                      src={
                        message?.sender?.type === "company"
                          ? message?.sender?.user?.avatar
                          : userData?.avatar
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-medium">
                      {message?.sender?.type === "company"
                        ? message?.sender?.user?.name
                        : userData?.name}
                    </p>
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
                <AvatarImage src={userData?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full h-24 p-4 border border-gray-400 rounded-lg"
                placeholder={MESSAGES_PAGE_STRINGS.typeMessage[lang]}
              ></textarea>
            </div>
            <UIButton className="mt-4 w-fit px-20 py-2 ml-16" onClick={sendMessage}>
              {COMMON_STRINGS.send[lang]}
            </UIButton>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a message to view
        </div>
      )}
    </div>
  );
}

export default MessageDisplay;
