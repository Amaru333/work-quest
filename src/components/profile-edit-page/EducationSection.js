"use client";
import UITextInput from "@/widgets/UITextInput";
import React, { useState } from "react";
import UIButton from "@/widgets/UIButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import { useSelector } from "react-redux";
import { PROFILE_EDIT_PAGE_STRINGS } from "@/constants/strings/profileEditPageStrings";
import { EDUCATION_LEVELS, FIELDS, MONTH_LIST, YEAR_LIST } from "./arrayConstants";
import { Checkbox } from "../ui/checkbox";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { getUserDetails } from "@/redux/slices/userSlice";
import httpRequest from "@/lib/httpRequest";

function EducationSection({ data }) {
  const lang = useSelector(selectLanguageCode);
  const userDetails = useSelector(getUserDetails);

  const [educationDetails, setEducationDetails] = useState({
    institution: data?.[0]?.institution || "",
    location: data?.[0]?.location || "",
    from: {
      month: data?.[0]?.from?.month || "",
      year: data?.[0]?.from?.year || "",
    },
    to: {
      month: data?.[0]?.to?.month || "",
      year: data?.[0]?.to?.year || "",
    },
    education_level: data?.[0]?.education_level || "",
    field_of_study: data?.[0]?.field_of_study || "",
  });

  const saveEducation = () => {
    httpRequest.put("http://localhost:3001/users/education", {
      user: userDetails?._id,
      education: [educationDetails],
    });
  };
  return (
    <div className="border-b border-gray-400 pb-8 pt-12 mr-12">
      <p className="text-3xl font-semibold mb-6">{PROFILE_EDIT_PAGE_STRINGS.education[lang]}</p>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">
              {PROFILE_EDIT_PAGE_STRINGS.institution_name[lang]}
            </p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.institution_name_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <UITextInput
              placeholder={PROFILE_EDIT_PAGE_STRINGS.institution_name[lang]}
              value={educationDetails.institution}
              onChange={(e) =>
                setEducationDetails({ ...educationDetails, institution: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.location[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.location_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <UITextInput
              placeholder={PROFILE_EDIT_PAGE_STRINGS.location[lang]}
              value={educationDetails.location}
              onChange={(e) =>
                setEducationDetails({ ...educationDetails, location: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.from[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.from_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <div className="flex flex-row items-center gap-x-4">
              <Select
                value={educationDetails.from.month}
                onValueChange={(v) =>
                  setEducationDetails({
                    ...educationDetails,
                    from: { ...educationDetails.from, month: v },
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={PROFILE_EDIT_PAGE_STRINGS.select_month[lang]} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {MONTH_LIST.map((month, i) => (
                      <SelectItem value={month.value} key={i}>
                        {month.label[lang]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={parseInt(educationDetails.from.year)}
                onValueChange={(v) =>
                  setEducationDetails({
                    ...educationDetails,
                    from: { ...educationDetails.from, year: v },
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={PROFILE_EDIT_PAGE_STRINGS.select_year[lang]} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {YEAR_LIST.map((year, i) => (
                      <SelectItem value={year} key={i}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.to[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.to_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <div className="flex flex-row items-center gap-x-4">
              <Select
                value={educationDetails.to.month}
                onValueChange={(v) =>
                  setEducationDetails({
                    ...educationDetails,
                    to: { ...educationDetails.to, month: v },
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={PROFILE_EDIT_PAGE_STRINGS.select_month[lang]} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {MONTH_LIST.map((month, i) => (
                      <SelectItem value={month.value} key={i}>
                        {month.label[lang]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={parseInt(educationDetails.to.year)}
                onValueChange={(v) =>
                  setEducationDetails({
                    ...educationDetails,
                    to: { ...educationDetails.to, year: v },
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={PROFILE_EDIT_PAGE_STRINGS.select_year[lang]} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {YEAR_LIST.map((year, i) => (
                      <SelectItem value={year} key={i}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="studying_here" className="peer" />
              <label
                htmlFor="studying_here"
                className="text-sm font-medium text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-primary-100 peer-data-[state=checked]:font-semibold"
              >
                {PROFILE_EDIT_PAGE_STRINGS.currently_studying[lang]}
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">
              {PROFILE_EDIT_PAGE_STRINGS.education_level_title[lang]}
            </p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.education_level_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <Select
              value={educationDetails.education_level}
              onValueChange={(v) =>
                setEducationDetails({ ...educationDetails, education_level: v })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={EDUCATION_LEVELS[0].label[lang]} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {EDUCATION_LEVELS.map((level, i) => (
                    <SelectItem value={level.value} key={i}>
                      {level.label?.[lang]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.field[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.fields_list_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <Select
              value={educationDetails.field_of_study}
              onValueChange={(v) => setEducationDetails({ ...educationDetails, field_of_study: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={FIELDS[0].label[lang]} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FIELDS.map((level, i) => (
                    <SelectItem value={level.value} key={i}>
                      {level.label?.[lang]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <UIButton className="w-fit px-12 py-2" onClick={saveEducation}>
            {COMMON_STRINGS.save[lang]}
          </UIButton>
        </div>
      </div>
    </div>
  );
}

export default EducationSection;
