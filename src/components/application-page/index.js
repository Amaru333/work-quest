"use client";

import React, { useEffect, useState } from "react";
import ApplicationList from "./ApplicationList";
import httpRequest from "@/lib/httpRequest";
import ApplicationDetailsSection from "./ApplicationDetails";
import { useSelector } from "react-redux";
import { getUserDetails } from "@/redux/slices/userSlice";

function Applications() {
  const [apiApplicationList, setApiApplicationList] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const userDetails = useSelector(getUserDetails);
  useEffect(() => {
    httpRequest.get(`http://localhost:3001/applications/${userDetails?._id}`).then((res) => {
      setApiApplicationList(res.data);
      setSelectedApplication(res.data[0]);
    });
  }, []);
  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-x-8 px-8 2xl:px-0 mt-6 h-[calc(100vh-10rem)]">
      <ApplicationList
        list={apiApplicationList}
        setSelectedApplication={setSelectedApplication}
        selectedApplication={selectedApplication}
      />
      <ApplicationDetailsSection selectedApplication={selectedApplication} />
    </div>
  );
}

export default Applications;
