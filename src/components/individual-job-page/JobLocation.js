import { JOB_DESCRIPTION_PAGE_STRINGS } from "@/constants/strings/jobDescriptionPageStrings";
import { getRelativeTime } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import dynamic from "next/dynamic";
import UIButton from "@/widgets/UIButton";

function JobLocation({ jobDetails, lang }) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/widgets/UIMap"), {
        loading: () => <p></p>,
        ssr: false,
      }),
    []
  );
  return (
    <div className="col-span-4 ml-8">
      <div className="sticky top-0 pt-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-x-4">
            <div>
              <Image src={jobDetails?.company?.logo} width={72} height={72} alt={jobDetails?.company?.name} className="rounded-full" />
            </div>
            <div>
              <div className="flex items-center">
                <p className="text-3xl font-medium mr-2">{jobDetails?.company?.name}</p>
                <Tooltip>
                  <TooltipTrigger>
                    <Image src="/icons/verified.svg" width={32} height={32} alt="verified" className="rounded-full" />
                  </TooltipTrigger>
                  <TooltipContent>Verified</TooltipContent>
                </Tooltip>
              </div>
              <p className="text-xs text-gray-600 my-1">
                {jobDetails?.company?.location?.city}, {jobDetails?.company?.location?.stateCode}, {jobDetails?.company?.location?.country}
              </p>
              <p className="text-xs font-medium text-gray-600 mb-2">
                {JOB_DESCRIPTION_PAGE_STRINGS.posted[lang]} {getRelativeTime(jobDetails?.createdAt, lang)}
              </p>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Image key={star} width={20} height={20} src={`/icons/star-${star <= jobDetails?.company?.avgRating ? "fill" : "mute"}.svg`} alt="star" />
                    ))}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average ratings: {jobDetails?.company?.avgRating} stars</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <Image src="/icons/share.svg" width={24} height={24} alt="share" className="rounded-full" />
        </div>
        <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
          <Map posix={[jobDetails?.company?.location?.coordinates?.lat, jobDetails?.company?.location?.coordinates?.lng]} popover={jobDetails?.company?.name} />
        </div>
        <div className="flex gap-x-4">
          <UIButton>{JOB_DESCRIPTION_PAGE_STRINGS.applyNow[lang]}</UIButton>
          <UIButton theme="secondary">{JOB_DESCRIPTION_PAGE_STRINGS.saveForLater[lang]}</UIButton>
        </div>
      </div>
    </div>
  );
}

export default JobLocation;
