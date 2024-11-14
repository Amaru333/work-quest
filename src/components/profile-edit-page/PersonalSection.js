"use client";
import UITextInput from "@/widgets/UITextInput";
import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UIButton from "@/widgets/UIButton";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import { PROFILE_EDIT_PAGE_STRINGS } from "@/constants/strings/profileEditPageStrings";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { getUserDetails, setUser } from "@/redux/slices/userSlice";
import httpRequest from "@/lib/httpRequest";

function PersonalSection() {
  const lang = useSelector(selectLanguageCode);
  const userDetails = useSelector(getUserDetails);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    _id: userDetails?._id || "",
    name: userDetails?.name || "",
    slug: userDetails?.slug || "",
    email: userDetails?.email || "",
    phone_number: userDetails?.phone_number || "",
    avatar: userDetails?.avatar || "",
  });

  const save = () => {
    httpRequest
      .put("http://localhost:3001/users", userData)
      .then((res) => dispatch(setUser(res.data)))
      .catch((err) => console.log(err));
  };
  return (
    <div className="border-b border-gray-400 pb-8 mr-12">
      <p className="text-3xl font-semibold mb-6">{PROFILE_EDIT_PAGE_STRINGS.personal[lang]}</p>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{COMMON_STRINGS.full_name[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.full_name_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <UITextInput
              placeholder={COMMON_STRINGS.full_name[lang]}
              value={userData?.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.profile_url[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.profile_url_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <div className="w-full border border-slate-400 rounded-md flex">
              <p className="px-3 py-2 border-r border-slate-400 text-slate-600 text-sm">
                website.com/
              </p>
              <input
                className="flex-1 px-2 text-sm"
                placeholder="full-name"
                value={userData?.slug}
                onChange={(e) => setUserData({ ...userData, slug: e.target.value })}
              />
              <button className="bg-white rounded-r-md px-2">
                <Image src="/icons/copy.svg" width={20} height={20} alt="copy" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{COMMON_STRINGS.email_address[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.email_address_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <UITextInput
              placeholder={COMMON_STRINGS.email_address[lang]}
              value={userData?.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.phone_number[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.phone_number_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <UITextInput
              placeholder="000-000-0000"
              value={userData?.phone_number}
              onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">
              {PROFILE_EDIT_PAGE_STRINGS.profile_picture[lang]}
            </p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.profile_picture_message[lang]}
            </p>
          </div>
          <div className="w-3/5 flex gap-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userData?.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-sm font-semibold flex flex-col items-center justify-center border border-dotted border-gray-400 rounded-md py-4">
              <Image src="/icons/upload.svg" width={24} height={24} alt="upload" />
              <p>
                <span className="underline text-primary-100">
                  {PROFILE_EDIT_PAGE_STRINGS.click_to_upload[lang]}
                </span>
              </p>
              <p className="text-gray-500">
                PNG {COMMON_STRINGS.or[lang]} JPG ({COMMON_STRINGS.max[lang]}. 2 MB)
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <UIButton className="w-fit px-12 py-2" onClick={save}>
            {COMMON_STRINGS.save[lang]}
          </UIButton>
        </div>
      </div>
    </div>
  );
}

export default PersonalSection;
