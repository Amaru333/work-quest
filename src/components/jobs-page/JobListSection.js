"use client";

import { JOBS_PAGE_STRINGS } from "@/constants/strings/jobsPageStrings";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import httpRequest from "@/lib/httpRequest";
import { SkeletonJobCard } from "./JobsSkeleton";

function JobListSection() {
  const lang = useSelector(selectLanguageCode);

  const [jobList, setJobList] = React.useState([]);
  const [isJobListLoading, setIsJobListLoading] = React.useState(true);

  useEffect(() => {
    httpRequest.get("/mock/jobs.json").then((res) => {
      setJobList(res.data);
      setIsJobListLoading(false);
    });
  }, []);
  return (
    <div className="col-span-9 pt-6">
      <p className="font-semibold text-3xl mb-4">{JOBS_PAGE_STRINGS.recommendedJobs[lang]}</p>
      <div className="grid grid-cols-3 gap-8">
        {isJobListLoading
          ? Array(6)
              .fill("")
              .map((_, i) => <SkeletonJobCard key={i} />)
          : jobList.length > 0 && jobList.map((job) => <JobCard key={job?._id} job={job} lang={lang} />)}
      </div>
    </div>
  );
}

export default JobListSection;
