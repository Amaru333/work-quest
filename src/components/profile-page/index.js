"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { selectLanguageCode } from "@/redux/slices/languageSlice";
import { getUserDetails, getUserInfo, setUserInfo } from "@/redux/slices/userSlice";
import httpRequest from "@/lib/httpRequest";
import { PROFILE_EDIT_PAGE_STRINGS } from "@/constants/strings/profileEditPageStrings";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";

function ProfilePage() {
  const lang = useSelector(selectLanguageCode);
  const userDetails = useSelector(getUserDetails);
  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails?._id) {
      httpRequest.get(`http://localhost:3001/users/info/${userDetails?._id}`).then((res) => {
        dispatch(setUserInfo(res.data));
      });
    }
  }, [userDetails?._id]);

  return (
    <div className="max-w-screen-2xl px-8 2xl:px-0 mx-auto grid grid-cols-12 gap-x-8 mt-6">
      {/* Left Section - Profile Picture and Name */}
      <div className="col-span-3 h-full min-h-[calc(100vh-10rem)] border-r border-gray-400 pt-6 flex flex-col items-center">
        <div className="mr-20 flex flex-col items-center">
          <Avatar className="w-36 h-36">
            <AvatarImage src={userDetails?.avatar || "/images/placeholder-avatar.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-center text-4xl font-medium mt-4">{userDetails?.name}</p>
        </div>
      </div>

      {/* Right Section - Profile Information */}
      <div className="col-span-7 border-r border-gray-400 pt-6 flex flex-col">
        {/* Personal Section */}
        <div className="border-b border-gray-400 pb-8 mr-12">
          <p className="text-3xl font-semibold mb-6">{COMMON_STRINGS.personal_information[lang]}</p>
          <div className="flex flex-col gap-y-4">
            <div>
              <p className="text-xl font-semibold">{COMMON_STRINGS.full_name[lang]}</p>
              <p className="text-gray-600">{userDetails?.name}</p>
            </div>
            <div>
              <p className="text-xl font-semibold">{COMMON_STRINGS.email_address[lang]}</p>
              <p className="text-gray-600">{userDetails?.email}</p>
            </div>
            <div>
              <p className="text-xl font-semibold">{COMMON_STRINGS.phone_number[lang]}</p>
              <p className="text-gray-600">{userDetails?.phone_number}</p>
            </div>
          </div>
        </div>

        {/* Career Section */}
        <div className="border-b border-gray-400 pb-8 pt-12 mr-12">
          <p className="text-3xl font-semibold mb-6">{PROFILE_EDIT_PAGE_STRINGS.career[lang]}</p>
          <div className="flex flex-col gap-y-4">
            <div>
              <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.about_me[lang]}</p>
              <p className="text-gray-600">{userInfo?.career?.about_me}</p>
            </div>
            <div>
              <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.skills[lang]}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {userInfo?.career?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border border-primary-100 bg-white text-primary-100 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="border-b border-gray-400 pb-8 pt-12 mr-12">
          <p className="text-3xl font-semibold mb-6">{PROFILE_EDIT_PAGE_STRINGS.education[lang]}</p>
          {userInfo?.education?.map((education, index) => (
            <div key={index} className="flex flex-col gap-y-4">
              <div>
                <p className="text-xl font-semibold">
                  {PROFILE_EDIT_PAGE_STRINGS.institution_name[lang]}
                </p>
                <p className="text-gray-600">{education.institution}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.location[lang]}</p>
                <p className="text-gray-600">{education.location}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{COMMON_STRINGS.field_of_study[lang]}</p>
                <p className="text-gray-600">{education.field_of_study}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="border-b border-gray-400 pb-8 pt-12 mr-12">
          <p className="text-3xl font-semibold mb-6">
            {PROFILE_EDIT_PAGE_STRINGS.experience[lang]}
          </p>
          {userInfo?.experience?.map((experience, index) => (
            <div key={index} className="flex flex-col gap-y-4">
              <div>
                <p className="text-xl font-semibold">
                  {PROFILE_EDIT_PAGE_STRINGS.company_name[lang]}
                </p>
                <p className="text-gray-600">{experience.company}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.role[lang]}</p>
                <p className="text-gray-600">{experience.role}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{PROFILE_EDIT_PAGE_STRINGS.field[lang]}</p>
                <p className="text-gray-600">{experience.field}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
