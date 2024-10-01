import React from "react";
import FilterSection from "./FilterSection";
import JobListSection from "./JobListSection";

function JobsPage() {
  return (
    <div className="max-w-screen-2xl px-8 2xl:px-0 mx-auto grid grid-cols-12 gap-x-8 mt-6">
      <FilterSection />
      <JobListSection />
    </div>
  );
}

export default JobsPage;
