"use client";

import httpRequest from "@/lib/httpRequest";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import JobDescriptionSection from "./JobDescriptionSection";
import { useSelector } from "react-redux";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import JobLocation from "./JobLocation";
import { getUserDetails } from "@/redux/slices/userSlice";

function IndividualJobPage() {
  const { jobSlug } = useParams();
  const userDetails = useSelector(getUserDetails);
  const lang = useSelector(selectLanguageCode);

  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    httpRequest
      .get(`http://localhost:3001/jobs/${jobSlug}/${userDetails?._id || `guest`}`)
      .then((res) => {
        setJobDetails(res.data);
      });
  }, [jobSlug, userDetails?._id]);

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-12 px-8 2xl:px-0 py-12">
      <JobDescriptionSection jobDetails={jobDetails} lang={lang} />
      <JobLocation jobDetails={jobDetails} lang={lang} />
    </div>
  );
}

export default IndividualJobPage;
