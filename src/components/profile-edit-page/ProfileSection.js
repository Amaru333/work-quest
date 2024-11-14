"use client";
import React, { useEffect } from "react";
import PersonalSection from "./PersonalSection";
import CareerSection from "./CareerSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, getUserInfo, setUserInfo } from "@/redux/slices/userSlice";
import httpRequest from "@/lib/httpRequest";

function ProfileSection() {
  const userData = useSelector(getUserDetails);
  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData?._id) {
      httpRequest.get(`http://localhost:3001/users/info/${userData?._id}`).then((res) => {
        dispatch(setUserInfo(res.data));
      });
    }
  }, [userData?._id]);
  return (
    <div className="col-span-7 border-r border-gray-400 pt-6 flex flex-col">
      <PersonalSection />
      <CareerSection data={userInfo?.career} />
      <EducationSection data={userInfo?.education} />
      <ExperienceSection data={userInfo?.experience} />
    </div>
  );
}

export default ProfileSection;
