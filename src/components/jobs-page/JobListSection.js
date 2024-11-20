"use client";

import { JOBS_PAGE_STRINGS } from "@/constants/strings/jobsPageStrings";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import httpRequest from "@/lib/httpRequest";
import { SkeletonJobCard } from "./JobsSkeleton";
import { useSearchParams } from "next/navigation";

function JobListSection({ workingScheduleFilters, employmentTypeFilters }) {
  const lang = useSelector(selectLanguageCode);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [jobList, setJobList] = React.useState([]);
  const [isJobListLoading, setIsJobListLoading] = React.useState(true);

  useEffect(() => {
    httpRequest.get("http://localhost:3001/jobs/").then((res) => {
      setJobList(res.data);
      setIsJobListLoading(false);
    });
  }, []);

  const queriedJobs = query
    ? jobList.filter(
        (job) =>
          job?.title?.[lang]?.toLowerCase().includes(query?.toLowerCase()) ||
          job?.company?.name?.toLowerCase().includes(query?.toLowerCase())
      )
    : jobList;

  const filteredJobs = queriedJobs.filter((job) => {
    if (workingScheduleFilters.length === 0 && employmentTypeFilters.length === 0) {
      return true;
    }

    const matchesWorkingSchedule =
      workingScheduleFilters.length === 0 ||
      workingScheduleFilters.includes(job?.workingSchedule?.name?.[lang]);

    const matchesEmploymentType =
      employmentTypeFilters.length === 0 ||
      employmentTypeFilters.includes(job?.employmentType?.name?.[lang]);

    return matchesWorkingSchedule && matchesEmploymentType;
  });

  return (
    <div className="col-span-12 md:col-span-9 pt-6">
      <p className="font-semibold text-3xl mb-4">{JOBS_PAGE_STRINGS.recommendedJobs[lang]}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {isJobListLoading
          ? Array(6)
              .fill("")
              .map((_, i) => <SkeletonJobCard key={i} />)
          : filteredJobs.length > 0 &&
            filteredJobs.map((job) => <JobCard key={job?._id} job={job} lang={lang} />)}
      </div>
    </div>
  );
}

export default JobListSection;
