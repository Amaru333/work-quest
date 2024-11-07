import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { MY_APPLICATIONS_PAGE_STRINGS } from "@/constants/strings/myApplicationsPageStrings";
import httpRequest from "@/lib/httpRequest";
import { getRelativeTime } from "@/lib/utils";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ApplicationDetailsSection() {
  const lang = useSelector(selectLanguageCode);
  const [applicationDetails, setApplicationDetails] = useState(null);
  useEffect(() => {
    httpRequest.get("/mock/applications/list.json").then((res) => {
      console.log(res.data[0]);
      setApplicationDetails(res.data[0]);
    });
  }, []);
  return (
    <div className="col-span-9 pt-6">
      <div className="flex gap-x-3">
        <div>
          <Image src={applicationDetails?.company?.logo} alt="Company Logo" width={64} height={64} className="rounded-full" />
        </div>
        <div className="flex flex-col">
          <p className="text-3xl font-semibold">{applicationDetails?.position[lang]}</p>
          <p className="text-sm text-gray-500">
            {COMMON_STRINGS.at[lang]} <span className="font-semibold">{applicationDetails?.company?.name}</span>
          </p>
          <p className="font-semibold text-sm text-gray-500 mt-1">
            {COMMON_STRINGS.published[lang]} {getRelativeTime(applicationDetails?.createdAt, lang)} • {COMMON_STRINGS.applied[lang]} {getRelativeTime(applicationDetails?.applied_on, lang)}
          </p>
        </div>
      </div>
      <div className="w-full max-w-screen-md relative mt-8">
        <div className="h-1.5 w-[90%] absolute left-8 top-0 bg-primary-100 rounded-full" />
        <div className="w-full absolute left-0 -top-2 flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 h-6 w-6 rounded-full" />
            <div className="flex flex-col items-center mt-2">
              <p className="font-semibold leading-4 text-slate-800">Applied</p>
              <p className="text-xs font-semibold text-gray-500">Sept 13, 2024</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 h-6 w-6 rounded-full" />
            <div className="flex flex-col items-center mt-2">
              <p className="font-semibold leading-4 text-slate-800">Shortlisted</p>
              <p className="text-xs font-semibold text-gray-500">Sept 13, 2024</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary-100 h-6 w-6 rounded-full" />
            <div className="flex flex-col items-center mt-2">
              <p className="font-semibold leading-4 text-slate-800">Interviewed</p>
              <p className="text-xs font-semibold text-gray-500">Sept 13, 2024</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/icons/approved.svg" alt="Check Circle" width={24} height={24} className="rounded-full bg-[#F2F2F2]" />
            <div className="flex flex-col items-center mt-2">
              <p className="font-semibold leading-4 text-slate-800">Approved 🎉</p>
              <p className="text-xs font-semibold text-gray-500">Sept 13, 2024</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <p className="text-2xl font-semibold my-4">{MY_APPLICATIONS_PAGE_STRINGS.applicationStatus[lang]}</p>
        <p dangerouslySetInnerHTML={{ __html: MY_APPLICATIONS_PAGE_STRINGS.approvedMessage[lang].replace("{role}", applicationDetails?.position?.[lang]).replace("{company}", applicationDetails?.company?.name) }} />
      </div>
    </div>
  );
}

export default ApplicationDetailsSection;
