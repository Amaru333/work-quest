"use client";

import httpRequest from "@/lib/httpRequest";
import { getUserDetails, setUser } from "@/redux/slices/userSlice";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LoginProvider({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = useSelector(getUserDetails);
  const { data: session } = useSession();
  useEffect(() => {
    if (session && !userDetails) {
      httpRequest
        .post("http://localhost:3001/users", {
          name: session?.user?.name,
          email: session?.user?.email,
          avatar: session?.user?.image,
          mode: "social",
        })
        .then((res) => {
          dispatch(setUser(res.data));
          // navigateToDashboard();
        });
    }
  }, [session, userDetails]);
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return children;
  }
}

export default LoginProvider;
