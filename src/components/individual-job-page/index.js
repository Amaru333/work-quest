"use client";

import httpRequest from "@/lib/httpRequest";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import JobDescriptionSection from "./JobDescriptionSection";
import { useSelector } from "react-redux";
import { selectLanguageCode } from "@/redux/slices/languageSlice";

function IndividualJobPage() {
  const { jobSlug } = useParams();
  const lang = useSelector(selectLanguageCode);

  const [jobDetails, setJobDetails] = useState(null);

  console.log(jobDetails);

  useEffect(() => {
    httpRequest.get(`/mock/jobs/${jobSlug}.json`).then((res) => {
      setJobDetails(res.data);
    });
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-12 px-8 2xl:px-0 py-12">
      <JobDescriptionSection jobDetails={jobDetails} lang={lang} />
    </div>
  );
}

export default IndividualJobPage;
