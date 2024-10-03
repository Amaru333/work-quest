import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { JOB_DESCRIPTION_PAGE_STRINGS } from "@/constants/strings/jobDescriptionPageStrings";
import { currencyShort, getCurrencySymbol } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import ReviewsSection from "./ReviewsSection";

function JobDescriptionSection({ jobDetails, lang }) {
  return (
    <div className="col-span-8 border-r border-gray-400 pr-8">
      {jobDetails && (
        <div>
          <div className="flex items-center gap-x-8">
            <div>
              <Image src={jobDetails?.company?.logo} width={128} height={128} alt={jobDetails?.company?.name} className="rounded-full" />
            </div>
            <div className="flex flex-col gap-y-4">
              <div>
                <h1 className="text-4xl font-semibold">{jobDetails?.title?.[lang]}</h1>
                <p className="text-xs text-gray-500 font-medium">
                  {COMMON_STRINGS.at[lang]} <b>{jobDetails?.company?.name}</b>
                </p>
              </div>
              <div className="flex items-center gap-x-8">
                <div className="flex items-center gap-x-2">
                  <Image src="/icons/money.svg" width={0} height={0} alt="pay" className="h-4 w-auto" />
                  <p className="font-semibold text-xs text-gray-500">
                    {getCurrencySymbol(jobDetails?.salary?.currency)}
                    {currencyShort(jobDetails?.salary?.min)} to {getCurrencySymbol(jobDetails?.salary?.currency)}
                    {currencyShort(jobDetails?.salary?.max)}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image src="/icons/building.svg" width={0} height={0} alt="pay" className="h-4 w-auto" />
                  <p className="font-semibold text-xs text-gray-500">{jobDetails?.employmentType?.[lang]}</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image src="/icons/clock.svg" width={0} height={0} alt="pay" className="h-4 w-auto" />
                  <p className="font-semibold text-xs text-gray-500">{jobDetails?.workingSchedule?.[lang]}</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image src="/icons/location.svg" width={0} height={0} alt="pay" className="h-4 w-auto" />
                  <p className="font-semibold text-xs text-gray-500">
                    {jobDetails?.location?.city}, {jobDetails?.location?.stateCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4">
            <h2 className="text-3xl font-medium">{JOB_DESCRIPTION_PAGE_STRINGS.jobDescription[lang]}</h2>
            <ul className="list-disc list-inside mt-4">
              {jobDetails?.jobDescription?.map((description, index) => (
                <li key={index}>{description[lang]}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 mb-4">
            <h2 className="text-3xl font-medium">{JOB_DESCRIPTION_PAGE_STRINGS.requirements[lang]}</h2>
            <ul className="list-disc list-inside mt-4">
              {jobDetails?.requirements?.map((requirement, index) => (
                <li key={index}>{requirement[lang]}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 mb-4">
            <h2 className="text-3xl font-medium mb-4">{JOB_DESCRIPTION_PAGE_STRINGS.aboutTheCompany[lang]}</h2>
            <p>{jobDetails?.company?.about?.[lang]}</p>
          </div>
        </div>
      )}
      <ReviewsSection lang={lang} />
    </div>
  );
}

export default JobDescriptionSection;
