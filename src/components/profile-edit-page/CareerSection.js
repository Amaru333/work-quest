"use client";
import React, { useState } from "react";
import UIButton from "@/widgets/UIButton";
import { PROFILE_EDIT_PAGE_STRINGS } from "@/constants/strings/profileEditPageStrings";
import { useSelector } from "react-redux";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import UIDescription from "@/widgets/UIDescription";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SKILLSETS } from "./arrayConstants";
import SkillSelectedBadge from "./SkillSelectedBadge";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import httpRequest from "@/lib/httpRequest";
import { getUserDetails } from "@/redux/slices/userSlice";

function CareerSection({ data }) {
  const lang = useSelector(selectLanguageCode);
  const userDetails = useSelector(getUserDetails);
  const [selectedSkills, setSelectedSkills] = useState(data?.skills || []);
  const [careerData, setCareerData] = useState({
    about_me: data?.about_me || "",
  });

  const saveCareer = () => {
    httpRequest.put("http://localhost:3001/users/career", {
      user: userDetails?._id,
      career: { ...careerData, skills: selectedSkills },
    });
  };
  return (
    <div className="border-b border-gray-400 pb-8 pt-12 mr-12">
      <p className="text-3xl font-semibold mb-6">{PROFILE_EDIT_PAGE_STRINGS.career[lang]}</p>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.about_me[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.about_me_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <UIDescription
              onChange={(e) => setCareerData({ ...careerData, about_me: e.target.value })}
              value={careerData.about_me}
              placeholder={PROFILE_EDIT_PAGE_STRINGS.about_me[lang]}
            />
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.skills[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.skills_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <Select
              ItemIndicator={<div />}
              onValueChange={(e) => {
                e !== "empty" &&
                  !selectedSkills.includes(e) &&
                  setSelectedSkills([...selectedSkills, e]);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={COMMON_STRINGS.select[lang]} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="empty">{COMMON_STRINGS.select[lang]}</SelectItem>
                  {SKILLSETS.map((skill, i) => (
                    <SelectItem value={skill} key={i}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSkills.map((skill, i) => (
                <SkillSelectedBadge
                  onClick={() => {
                    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                  }}
                  key={i}
                >
                  {skill}
                </SkillSelectedBadge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-x-12">
          <div className="flex flex-col w-2/5">
            <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.resume[lang]}</p>
            <p className="text-xs text-gray-400 font-medium">
              {PROFILE_EDIT_PAGE_STRINGS.resume_message[lang]}
            </p>
          </div>
          <div className="w-3/5">
            <div className="flex-1 text-sm font-semibold flex flex-col items-center justify-center border border-dotted border-gray-400 rounded-md py-12">
              <p>
                <span className="underline text-primary-100">
                  {PROFILE_EDIT_PAGE_STRINGS.click_to_upload[lang]}
                </span>{" "}
                {PROFILE_EDIT_PAGE_STRINGS.resume[lang]}
              </p>
              <p className="text-gray-500">
                PDF {COMMON_STRINGS.or[lang]} DOC ({COMMON_STRINGS.max[lang]}. 10 MB)
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <UIButton className="w-fit px-12 py-2" onClick={saveCareer}>
            {COMMON_STRINGS.save[lang]}
          </UIButton>
        </div>
      </div>
    </div>
  );
}

export default CareerSection;
