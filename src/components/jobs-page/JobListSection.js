"use client";

import { JOBS_PAGE_STRINGS } from "@/constants/strings/jobsPageStrings";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import httpRequest from "@/lib/httpRequest";

function JobListSection() {
  const lang = useSelector(selectLanguageCode);

  const [jobList, setJobList] = React.useState([]);

  useEffect(() => {
    httpRequest.get("/mock/jobs.json").then((res) => {
      setJobList(res.data);
    });
  }, []);
  return (
    <div className="col-span-9 pt-6">
      <p className="font-semibold text-3xl mb-4">{JOBS_PAGE_STRINGS.recommendedJobs[lang]}</p>
      <div className="grid grid-cols-3 gap-8">{jobList.length > 0 && jobList.map((job) => <JobCard key={job?.objectID} job={job} lang={lang} />)}</div>
    </div>
  );
}

export default JobListSection;
