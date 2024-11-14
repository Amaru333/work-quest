"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { NAVBAR_CONSTANTS } from "@/constants/navbarConstants";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { selectedLanguage, setLanguage } from "@/redux/slices/languageSlice";
import UISeparation from "@/widgets/UISeparation";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGE_LIST } from "@/constants/languages";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUserDetails } from "@/redux/slices/userSlice";
import { getNameInitialsInUpperCase } from "@/functions/extraFunctions";
import { signOut } from "next-auth/react";
import { Bounce, toast } from "react-toastify";

function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { code: lang } = useSelector(selectedLanguage);
  const userData = useSelector(getUserDetails);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = React.useState(false);
  const [queryParam, setQueryParam] = React.useState("");

  const profileSettingsOptions = [
    { name: COMMON_STRINGS.profile, action: () => {}, visible: userData !== null },
    {
      name: COMMON_STRINGS.settings,
      action: () => {
        router.push("/profile/edit");
      },
      visible: userData !== null,
    },
    {
      name: COMMON_STRINGS.changeLanguage,
      action: () => {
        setIsLanguageModalOpen(true);
      },
      visible: true,
    },
  ];

  const dispatchLanguage = (language) => {
    dispatch(setLanguage(language));
  };

  const logout = () => {
    signOut();
    toast.success(COMMON_STRINGS.logged_out_message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <div className="bg-primary-100">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto py-6 px-8 2xl:px-0">
        <Link href="/jobs">
          <Image src="/images/logo-small.svg" width={100} height={80} alt="logo" />
        </Link>
        <button className="text-white text-sm bg-primary-300 flex items-center px-3 py-2 rounded-2xl">
          <Image src="/icons/pin-white.svg" width={24} height={24} alt="location" />
          <p className="ml-1">Charlotte, NC</p>
        </button>
        <div className="flex gap-x-6 font-medium">
          {NAVBAR_CONSTANTS.map((item, index) => (
            <div className="flex flex-col relative" key={index}>
              {item.link === "/jobs" ? (
                <Link href={item.link} key={index} className="text-white">
                  {item.name[lang]}
                </Link>
              ) : userData ? (
                <Link href={item.link} key={index} className="text-white">
                  {item.name[lang]}
                </Link>
              ) : (
                <p className="text-white opacity-30 cursor-default">{item.name[lang]}</p>
              )}
              {pathname.includes(item.link) && (
                <div className="w-full h-0.5 rounded-full bg-white absolute -bottom-4 left-0"></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex bg-background rounded-full w-2/5">
          <input
            type="text"
            placeholder={COMMON_STRINGS.searchJobs[lang]}
            className="bg-background w-full py-3 px-4 rounded-full !outline-none"
            value={queryParam}
            onChange={(e) => {
              setQueryParam(e.target.value);
              router.push(`/jobs?query=${e.target.value}`);
            }}
          />
          <button
            className="px-4"
            onClick={() => {
              router.push(`/jobs?query=${queryParam}`);
            }}
          >
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
                    className={`w-full text-left py-3 px-6 text-black hover:bg-gray-200 transition-all duration-200 cursor-pointer rounded-lg ${
                      language.code === lang ? "bg-gray-200" : "bg-white"
                    }`}
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
                <AvatarImage src={userData?.avatar || "/images/default-avatar.jpg"} />
                <AvatarFallback>{getNameInitialsInUpperCase(userData?.name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary-300 text-white px-0 py-0">
              {profileSettingsOptions.map((option, index) => (
                <>
                  {option.visible && (
                    <DropdownMenuItem
                      key={index}
                      className={`w-full text-left py-3 px-6 hover:bg-primary-200 transition-all duration-200 cursor-pointer bg-primary-300 font-medium`}
                      onClick={option.action}
                    >
                      {option.name[lang]}
                    </DropdownMenuItem>
                  )}
                </>
              ))}
              <UISeparation color="primary-100" className="px-2" />
              {userData !== null ? (
                <DropdownMenuItem
                  className={`w-full text-left py-3 px-6 hover:bg-primary-200 transition-all duration-200 cursor-pointer bg-primary-300 font-medium`}
                  onClick={logout}
                >
                  {COMMON_STRINGS.signOut[lang]}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className={`w-full text-left py-3 px-6 hover:bg-primary-200 transition-all duration-200 cursor-pointer bg-primary-300 font-medium`}
                  onClick={() => router.push("/")}
                >
                  {COMMON_STRINGS.signIn[lang]}
                </DropdownMenuItem>
              )}
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
