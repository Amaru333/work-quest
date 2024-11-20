"use client";

import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { JOBS_PAGE_STRINGS } from "@/constants/strings/jobsPageStrings";
import httpRequest from "@/lib/httpRequest";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "../ui/checkbox";
import { CheckBoxSkeleton } from "./JobsSkeleton";

function FilterSection({
  workingScheduleFilters,
  setWorkingScheduleFilters,
  employmentTypeFilters,
  setEmploymentTypeFilters,
}) {
  const lang = useSelector(selectLanguageCode);
  const [isFilterLoading, setIsFilterLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      httpRequest.get("http://localhost:3001/working-schedules/"),
      httpRequest.get("http://localhost:3001/employment-types/"),
    ]).then(([filtersRes, employmentTypesRes]) => {
      setFilters(filtersRes.data);
      setEmploymentTypes(employmentTypesRes.data);
      setIsFilterLoading(false);
    });
  }, []);

  return (
    <div
      className={`col-span-12 md:col-span-3 ${isMobileFilterOpen ? "block" : "hidden"} md:block`}
    >
      {/* Mobile toggle button */}
      <button
        className="md:hidden text-primary-500 text-lg font-semibold mb-4"
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
      >
        {isMobileFilterOpen ? "Close Filters" : "Show Filters"}
      </button>

      <div className="h-full border-r border-gray-400 pt-6">
        <p className="font-semibold text-3xl mb-4">{COMMON_STRINGS.filters[lang]}</p>
        <p className="text-sm font-semibold text-gray-400 mb-3">
          {JOBS_PAGE_STRINGS.workingSchedule[lang]}
        </p>
        {isFilterLoading
          ? Array(5)
              .fill("")
              .map((_, i) => <CheckBoxSkeleton key={i} />)
          : filters.length > 0 &&
            filters.map((filter) => (
              <div className="flex items-center space-x-2 mt-2" key={filter?._id}>
                <Checkbox
                  id={filter?.value}
                  className="peer"
                  onCheckedChange={(value) => {
                    if (value) {
                      setWorkingScheduleFilters([...workingScheduleFilters, filter?.name?.[lang]]);
                    } else {
                      setWorkingScheduleFilters(
                        workingScheduleFilters.filter((f) => f !== filter?.name?.[lang])
                      );
                    }
                  }}
                />
                <label
                  htmlFor={filter?.value}
                  className="text-sm font-medium text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-primary-100 peer-data-[state=checked]:font-semibold"
                >
                  {filter?.name?.[lang]}
                </label>
              </div>
            ))}
        <p className="text-sm font-semibold text-gray-400 mt-4 mb-3">
          {JOBS_PAGE_STRINGS.employmentType[lang]}
        </p>
        {isFilterLoading
          ? Array(3)
              .fill("")
              .map((_, i) => <CheckBoxSkeleton key={i} />)
          : employmentTypes.length > 0 &&
            employmentTypes.map((employmentType) => (
              <div className="flex items-center space-x-2 mt-2" key={employmentType?._id}>
                <Checkbox
                  id={employmentType?.value}
                  className="peer"
                  onCheckedChange={(value) => {
                    if (value) {
                      setEmploymentTypeFilters([
                        ...employmentTypeFilters,
                        employmentType?.name?.[lang],
                      ]);
                    } else {
                      setEmploymentTypeFilters(
                        employmentTypeFilters.filter((f) => f !== employmentType?.name?.[lang])
                      );
                    }
                  }}
                />
                <label
                  htmlFor={employmentType?.value}
                  className="text-sm font-medium text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-primary-100 peer-data-[state=checked]:font-semibold"
                >
                  {employmentType?.name?.[lang]}
                </label>
              </div>
            ))}
      </div>
    </div>
  );
}

export default FilterSection;
