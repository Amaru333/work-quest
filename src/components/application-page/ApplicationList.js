import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { MY_APPLICATIONS_PAGE_STRINGS } from "@/constants/strings/myApplicationsPageStrings";
import { useSelector } from "react-redux";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import { getRelativeTime } from "@/lib/utils";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { useRouter } from "next/navigation";

function ApplicationList({ list = [], setSelectedApplication, selectedApplication }) {
  const router = useRouter();
  const lang = useSelector(selectLanguageCode);
  const statuses = [
    {
      name: MY_APPLICATIONS_PAGE_STRINGS.approved[lang],
      applications: list?.filter((app) => app.status === "approved"),
      icon: "/icons/approved.svg",
    },
    {
      name: MY_APPLICATIONS_PAGE_STRINGS.inProcess[lang],
      applications: list?.filter(
        (app) =>
          app.status === "processing" ||
          app.status === "shortlisted" ||
          app.status === "interviewed"
      ),
      icon: "/icons/process.svg",
    },
    {
      name: MY_APPLICATIONS_PAGE_STRINGS.saved[lang],
      applications: list?.filter((app) => app.status === "saved"),
      icon: "/icons/saved.svg",
    },
    {
      name: MY_APPLICATIONS_PAGE_STRINGS.rejected[lang],
      applications: list?.filter((app) => app.status === "rejected"),
      icon: "/icons/rejected.svg",
    },
  ];
  return (
    <div className="col-span-3 border-r border-gray-400 pt-6">
      <p className="text-3xl font-medium mb-2">
        {MY_APPLICATIONS_PAGE_STRINGS.myApplications[lang]}
      </p>
      <div className="pr-4">
        <Accordion
          type="multiple"
          collapsible
          defaultValue={MY_APPLICATIONS_PAGE_STRINGS.approved[lang]}
        >
          {statuses.map((status, index) => {
            return (
              <AccordionItem value={status.name} key={index}>
                <AccordionTrigger className="text-xl font-semibold">
                  {status.name} ({status.applications.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    {status?.applications?.map((app, index) => {
                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between mb-2 cursor-pointer`}
                          onClick={() => {
                            if (app.status === "saved") {
                              router.push(`/jobs/${app.job.company.slug}/${app.job._id}`);
                            }
                            setSelectedApplication(app);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={app?.job?.company?.logo}
                              width={50}
                              height={50}
                              className="rounded-full"
                              alt={app?.job?.company?.name}
                            />
                            <div>
                              <p
                                className={`text-base font-semibold leading-5 ${
                                  selectedApplication?._id === app?._id ? "underline" : ""
                                }`}
                              >
                                {app?.job?.title?.[lang]} - {app?.job?.company?.name}
                              </p>
                              <p className="text-xs font-semibold text-gray-500">
                                {COMMON_STRINGS.applied[lang]}{" "}
                                {getRelativeTime(app?.applied_on, lang)}
                              </p>
                            </div>
                          </div>
                          <Image src={status?.icon} width={24} height={24} alt="approved" />
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default ApplicationList;
