"use client";

import React, { useEffect, useState } from "react";
import ApplicationList from "./ApplicationList";
import httpRequest from "@/lib/httpRequest";
import ApplicationDetailsSection from "./ApplicationDetails";

function Applications() {
  const [applicationList, setApplicationList] = useState([]);
  useEffect(() => {
    httpRequest.get("/mock/applications/list.json").then((res) => {
      setApplicationList(res.data);
    });
  }, []);
  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-x-8 px-8 2xl:px-0 mt-6 h-[calc(100vh-10rem)]">
      <ApplicationList list={applicationList} />
      <ApplicationDetailsSection />
    </div>
  );
}

export default Applications;
