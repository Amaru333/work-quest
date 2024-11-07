import React from "react";
import PersonalSection from "./PersonalSection";
import CareerSection from "./CareerSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";

function ProfileSection() {
  return (
    <div className="col-span-7 border-r border-gray-400 pt-6 flex flex-col">
      <PersonalSection />
      <CareerSection />
      <EducationSection />
      <ExperienceSection />
    </div>
  );
}

export default ProfileSection;
