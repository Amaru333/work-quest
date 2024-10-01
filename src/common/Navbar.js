"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { NAVBAR_CONSTANTS } from "@/constants/navbarConstants";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { selectedLanguage, setLanguage } from "@/redux/slices/languageSlice";
import UISeparation from "@/widgets/UISeparation";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGE_LIST } from "@/constants/languages";

function Navbar() {
  const dispatch = useDispatch();
  const { code: lang, name: langName } = useSelector(selectedLanguage);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = React.useState(false);

  const profileSettingsOptions = [
    { name: COMMON_STRINGS.profile, action: () => {} },
    { name: COMMON_STRINGS.settings, action: () => {} },
    {
      name: COMMON_STRINGS.changeLanguage,
      action: () => {
        setIsLanguageModalOpen(true);
      },
    },
  ];

  const dispatchLanguage = (language) => {
    dispatch(setLanguage(language));
  };

  return (
    <div className="bg-primary-100">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto py-6 px-8 2xl:px-0">
        <Image src="/images/logo-small.svg" width={100} height={80} alt="logo" />
        <button className="text-white text-sm bg-primary-300 flex items-center px-3 py-2 rounded-2xl">
          <Image src="/icons/pin-white.svg" width={24} height={24} alt="location" />
          <p className="ml-1">Charlotte, NC</p>
        </button>
        <div className="flex gap-x-6 font-medium">
          {NAVBAR_CONSTANTS.map((item, index) => (
            <button key={index} className="text-white">
              {item.name[lang]}
            </button>
          ))}
        </div>
        <div className="flex bg-background rounded-full w-2/5">
          <input type="text" placeholder={COMMON_STRINGS.searchJobs[lang]} className="bg-background w-full py-3 px-4 rounded-full !outline-none" />
          <button className="px-4">
            <Image src="/icons/search.svg" width={16} height={16} alt="search" />
          </button>
        </div>
        <Dialog open={isLanguageModalOpen} onOpenChange={setIsLanguageModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{COMMON_STRINGS.changeLanguage[lang]}</DialogTitle>
              <DialogDescription>
                <div className="mt-4"></div>
                {LANGUAGE_LIST.map((language) => (
                  <div
                    key={language.code}
                    className={`w-full text-left py-3 px-6 text-black hover:bg-gray-200 transition-all duration-200 cursor-pointer rounded-lg ${language.code === lang ? "bg-gray-200" : "bg-white"}`}
                    onClick={() => {
                      dispatchLanguage(language);
                      setIsLanguageModalOpen(false);
                    }}
                  >
                    {language.name}
                  </div>
                ))}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-primary-100 flex items-center">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/images/placeholder-avatar.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary-300 text-white px-0 py-0">
              {profileSettingsOptions.map((option, index) => (
                <DropdownMenuItem key={index} className={`w-full text-left py-3 px-6 hover:bg-primary-200 transition-all duration-200 cursor-pointer bg-primary-300 font-medium`} onClick={option.action}>
                  {option.name[lang]}
                </DropdownMenuItem>
              ))}
              <UISeparation color="primary-100" className="px-2" />
              <DropdownMenuItem className={`w-full text-left py-3 px-6 hover:bg-primary-200 transition-all duration-200 cursor-pointer bg-primary-300 font-medium`} onClick={() => {}}>
                {COMMON_STRINGS.signOut[lang]}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="w-12 h-12 rounded-full bg-background flex items-center justify-center bg-white">
            <Image src="/icons/notification.svg" width={24} height={24} alt="search" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
