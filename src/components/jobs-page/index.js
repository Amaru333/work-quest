"use client";

import React from "react";
import FilterSection from "./FilterSection";
import JobListSection from "./JobListSection";

function JobsPage() {
  const [workingScheduleFilters, setWorkingScheduleFilters] = React.useState([]);
  const [employmentTypeFilters, setEmploymentTypeFilters] = React.useState([]);
  return (
    <div className="max-w-screen-2xl px-8 2xl:px-0 mx-auto grid grid-cols-12 gap-x-8 mt-6">
      <FilterSection
        workingScheduleFilters={workingScheduleFilters}
        setWorkingScheduleFilters={setWorkingScheduleFilters}
        employmentTypeFilters={employmentTypeFilters}
        setEmploymentTypeFilters={setEmploymentTypeFilters}
      />
      <JobListSection
        workingScheduleFilters={workingScheduleFilters}
        employmentTypeFilters={employmentTypeFilters}
      />
    </div>
  );
}

export default JobsPage;
