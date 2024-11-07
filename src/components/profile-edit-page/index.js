import React from "react";
import LeftSection from "./LeftSection";
import ProfileSection from "./ProfileSection";

function ProfileEdit() {
  return (
    <div className="max-w-screen-2xl px-8 2xl:px-0 mx-auto grid grid-cols-12 gap-x-8 mt-6">
      <LeftSection />
      <ProfileSection />
    </div>
  );
}

export default ProfileEdit;
