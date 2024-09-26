import Image from "next/image";
import React from "react";

function LandingPage() {
  return (
    <div className="max-w-screen-2xl mx-auto py-12 h-screen px-4">
      <Image src="/images/logo-full.svg" width={120} height={120} alt="logo" />
      <div className="grid grid-cols-12">
        <div className="col-span-6 h-full flex flex-col justify-center">
          <div className="font-semibold text-5xl flex flex-col gap-y-4">
            <p>Need your first job?</p>
            <p>Looking for a job switch?</p>
            <p className="text-primary-100">We&apos;re here for you.</p>
          </div>
        </div>
        <div className="col-span-6">
          <Image src="/images/homepage-image.png" width={0} height={0} sizes="50vw" className="w-full h-auto" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
