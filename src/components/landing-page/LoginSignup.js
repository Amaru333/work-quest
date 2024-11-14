import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { LANDING_PAGE_STRINGS } from "@/constants/strings/landingPageStrings";
import UIButton from "@/widgets/UIButton";
import UISeparation from "@/widgets/UISeparation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

import { signIn, useSession } from "next-auth/react";
import httpRequest from "@/lib/httpRequest";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, setUser } from "@/redux/slices/userSlice";
import { Bounce, toast } from "react-toastify";

function LoginSignup({ lang, status, setStatus }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const userDetails = useSelector(getUserDetails);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigateToDashboard = () => {
    router.push("/jobs");
  };

  useEffect(() => {
    if (session && !userDetails?.details) {
      httpRequest
        .post("http://localhost:3001/users", {
          name: session?.user?.name,
          email: session?.user?.email,
          avatar: session?.user?.image,
          mode: "social",
        })
        .then((res) => {
          dispatch(setUser(res.data));
          navigateToDashboard();
        });
    }
  }, [session]);

  const onSignIn = () => {
    httpRequest.post("http://localhost:3001/users", loginData).then((res) => {
      dispatch(setUser(res.data));
      navigateToDashboard();
    });
    toast.success(COMMON_STRINGS.logged_in_message, {
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
    router.push("/jobs");
  };

  const onSignUp = () => {
    httpRequest
      .post("http://localhost:3001/users/register", loginData)
      .then((res) => {
        toast.success(COMMON_STRINGS.registration_success_message, {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
        <input
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-primary-100 focus:border-primary-100 sm:text-sm"
        />
        <label htmlFor="password" className="block font-semibold text-sm text-gray-500 mt-4">
          {COMMON_STRINGS.password[lang]}
        </label>
        <input
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-primary-100 focus:border-primary-100 sm:text-sm"
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <label
              htmlFor="remember-me"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {COMMON_STRINGS.rememberMe[lang]}
            </label>
          </div>
          <Link href="/forgot-password">
            <p className="text-sm font-semibold text-primary-100">
              {COMMON_STRINGS.forgotPassword[lang]}
            </p>
          </Link>
        </div>

        {status === "signup" ? (
          <UIButton onClick={onSignUp} className="mt-4">
            {COMMON_STRINGS.signUp[lang]}
          </UIButton>
        ) : (
          <UIButton onClick={onSignIn} className="mt-4">
            {COMMON_STRINGS.signIn[lang]}
          </UIButton>
        )}

        <UISeparation className="mt-4" text={COMMON_STRINGS.or[lang]} />
        <div className="w-full flex justify-center items-center gap-x-8 mt-4">
          <button onClick={() => signIn("google")}>
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
  );
}

export default LoginSignup;
