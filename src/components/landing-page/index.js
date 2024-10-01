"use client";

import Image from "next/image";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { LANGUAGE_LIST } from "@/constants/languages";

import { useDispatch, useSelector } from "react-redux";
import { selectedLanguage, setLanguage } from "@/redux/slices/languageSlice";
import LoginSignup from "./LoginSignup";

function LandingPage() {
  const { code: lang, name: langName } = useSelector(selectedLanguage);
  const [status, setStatus] = useState("signup");
  const dispatch = useDispatch();

  const dispatchLanguage = (language) => {
    dispatch(setLanguage(language));
  };
  return (
    <div className="max-w-screen-2xl mx-auto py-8 min-h-screen px-4">
      <div className="flex items-center justify-between">
        <Image src="/images/logo-full.svg" width={120} height={120} alt="logo" />
        <DropdownMenu>
          <DropdownMenuTrigger className="text-primary-100 flex items-center w-32">
            <Image src="/icons/globe-light.svg" width={40} height={40} alt="language" className="text-primary-100" />
            <p className="font-semibold w-full text-start ml-3">{langName}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-primary-300 text-white max-w-40 px-0 py-0">
            {LANGUAGE_LIST.map((language) => (
              <DropdownMenuItem key={language.code} className={`w-full text-left py-3 px-6 hover:bg-primary-200 transition-all duration-200 cursor-pointer ${language.code === lang ? "bg-primary-200" : "bg-primary-300"}`} onClick={() => dispatchLanguage(language)}>
                {language.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-12 gap-x-12 mt-12">
        <LoginSignup status={status} setStatus={setStatus} lang={lang} />
        <div className="col-span-6 flex">
          <Image src="/images/homepage-image.png" width={0} height={0} sizes="50vw" className="w-full h-auto" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
