"use client";

import React from "react";
import FilterSection from "./FilterSection";
import JobListSection from "./JobListSection";

function JobsPage() {
  const [workingScheduleFilters, setWorkingScheduleFilters] = React.useState([]);
  const [employmentTypeFilters, setEmploymentTypeFilters] = React.useState([]);

  return (
    <div className="max-w-screen-2xl px-4 md:px-8 2xl:px-0 mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-4 md:gap-x-8 mt-6">
      {/* Filter Section should be hidden on smaller screens and shown on larger screens */}
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
