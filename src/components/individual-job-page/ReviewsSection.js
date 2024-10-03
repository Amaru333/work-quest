import { JOB_DESCRIPTION_PAGE_STRINGS } from "@/constants/strings/jobDescriptionPageStrings";
import React from "react";

function ReviewsSection({ lang }) {
  return (
    <div>
      <div className="mt-8 mb-4">
        <h2 className="text-3xl font-medium mb-4">{JOB_DESCRIPTION_PAGE_STRINGS.companyReviews[lang]}</h2>
      </div>
    </div>
  );
}

export default ReviewsSection;
