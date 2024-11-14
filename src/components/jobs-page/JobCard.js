import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { generateRandomLightColor } from "@/functions/extraFunctions";
import { currencyShort, getCurrencySymbol, getRelativeTime } from "@/lib/utils";
import UIButton from "@/widgets/UIButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function JobCard({ job, lang }) {
  const randomColor = generateRandomLightColor();
  const Badge = ({ label }) => {
    return <p className="border rounded-full px-2 text-xs py-1 border-black">{label}</p>;
  };
  return (
    <div className="rounded-2xl p-1 bg-white border border-gray-300 flex flex-col">
      <div className="rounded-xl p-3 flex-1 flex flex-col" style={{ backgroundColor: randomColor }}>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-white px-3 rounded-full flex items-center justify-center">
            <p className="text-xs font-medium">{getRelativeTime(job?.createdAt, lang)}</p>
          </div>
          <button className="bg-white h-6 w-6 rounded-full flex items-center justify-center">
            <Image src="/icons/star-outline.svg" width={14} height={14} alt="favorite" />
          </button>
        </div>
        <p className="text-sm mt-8 font-medium">{job?.company?.name}</p>
        <div className="flex items-center justify-between mt-2 gap-x-2 flex-1">
          <p className="text-3xl font-semibold w-full">{job?.title?.[lang]}</p>
          <Image
            src={job?.company?.logo}
            width={72}
            height={72}
            alt={job?.company?.name}
            className="rounded-full bg-white"
          />
        </div>
        <div className="flex items-center flex-wrap gap-2 mt-6 mb-4">
          <Badge label={job?.employmentType?.name?.[lang]} />
          <Badge label={job?.workingSchedule?.name?.[lang]} />
        </div>
      </div>
      <div className="px-3 py-4 flex items-center justify-between">
        <div className="w-2/3">
          <p className="font-semibold text-xl">
            {getCurrencySymbol(job?.salary?.currency)}
            {currencyShort(job?.salary?.min)} to {getCurrencySymbol(job?.salary?.currency)}
            {currencyShort(job?.salary?.max)}
          </p>
          <p className="font-semibold text-xs text-gray-400">
            {job?.company?.location?.city}, {job?.company?.location?.stateCode}
          </p>
        </div>
        <div className="w-1/3">
          <Link href={`/jobs/${job?.company?.slug}/${job?._id}`}>
            <UIButton>{COMMON_STRINGS.details[lang]}</UIButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
