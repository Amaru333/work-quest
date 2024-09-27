"use client";

import UIButton from "@/widgets/UIButton";
import UISeparation from "@/widgets/UISeparation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { LANDING_PAGE_STRINGS } from "@/constants/strings/landingPageStrings";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { LANGUAGE_LIST } from "@/constants/languages";

import { useDispatch, useSelector } from "react-redux";
import { selectedLanguage, setLanguage } from "@/redux/slices/languageSlice";

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
        <div className="col-span-6 h-full flex flex-col justify-between">
          <div className="font-semibold text-5xl flex flex-col gap-y-4">
            <p>{LANDING_PAGE_STRINGS.title1[lang]}</p>
            <p>{LANDING_PAGE_STRINGS.title2[lang]}</p>
            <p className="text-primary-100">{LANDING_PAGE_STRINGS.title3[lang]}</p>
          </div>
          <div className="w-full max-w-xl">
            <label htmlFor="email" className="block font-semibold text-sm text-gray-500">
              {COMMON_STRINGS.email[lang]}
            </label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-primary-100 focus:border-primary-100 sm:text-sm" />
            <label htmlFor="password" className="block font-semibold text-sm text-gray-500 mt-4">
              {COMMON_STRINGS.password[lang]}
            </label>
            <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-primary-100 focus:border-primary-100 sm:text-sm" />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-start">
                <input type="checkbox" id="remember-me" name="remember-me" className="mt-0.5" />
                <label htmlFor="remember-me" className="ml-1 text-sm font-semibold text-gray-500">
                  {COMMON_STRINGS.rememberMe[lang]}
                </label>
              </div>
              <Link href="/forgot-password">
                <p className="text-sm font-semibold text-primary-100">{COMMON_STRINGS.forgotPassword[lang]}</p>
              </Link>
            </div>

            {status === "signup" ? <UIButton className="mt-4">{COMMON_STRINGS.signUp[lang]}</UIButton> : <UIButton className="mt-4">{COMMON_STRINGS.signIn[lang]}</UIButton>}

            <UISeparation className="mt-4" text={COMMON_STRINGS.or[lang]} />
            <div className="w-full flex justify-center items-center gap-x-8 mt-4">
              <button>
                <Image src="/icons/google.svg" width={32} height={32} alt="google" />
              </button>
              <button>
                <Image src="/icons/github.svg" width={32} height={32} alt="google" />
              </button>
              <button>
                <Image src="/icons/facebook.svg" width={32} height={32} alt="google" />
              </button>
            </div>

            <p className="text-gray-600 font-medium text-center text-sm mt-6">
              {status === "signup" ? (
                <span>
                  {LANDING_PAGE_STRINGS.signInMessage[lang]}{" "}
                  <span className="text-primary-100 cursor-pointer" onClick={() => setStatus("signin")}>
                    {COMMON_STRINGS.signIn[lang]}
                  </span>
                </span>
              ) : (
                <span>
                  {LANDING_PAGE_STRINGS.signUpMessage[lang]}{" "}
                  <span className="text-primary-100 cursor-pointer" onClick={() => setStatus("signup")}>
                    {COMMON_STRINGS.signUp[lang]}
                  </span>
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-4 max-w-xl">
            <p className="w-fit">{LANDING_PAGE_STRINGS.guestMessage[lang]}</p>
            <UIButton className="w-1/2">{LANDING_PAGE_STRINGS.continueAsGuest[lang]}</UIButton>
          </div>
        </div>
        <div className="col-span-6 flex">
          <Image src="/images/homepage-image.png" width={0} height={0} sizes="50vw" className="w-full h-auto" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
