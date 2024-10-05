import { JOB_DESCRIPTION_PAGE_STRINGS } from "@/constants/strings/jobDescriptionPageStrings";
import { currencyShort } from "@/lib/utils";
import Image from "next/image";
import React from "react";

function ReviewStats({ lang, reviewData }) {
  return (
    <div>
      <h2 className="text-3xl font-medium mb-4">{JOB_DESCRIPTION_PAGE_STRINGS.companyReviews[lang]}</h2>
      <div className="grid grid-cols-6 gap-x-4">
        <div className="col-span-1">
          <p className="text-xs">{JOB_DESCRIPTION_PAGE_STRINGS.totalReviews[lang]}</p>
          <p className="font-medium text-3xl">{reviewData?.count?.toLocaleString()}</p>
        </div>
        <div className="col-span-1">
          <p className="text-xs">{JOB_DESCRIPTION_PAGE_STRINGS.averageRating[lang]}</p>
          <div className="flex items-center gap-x-2">
            <p className="font-medium text-3xl">{reviewData?.average}</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image key={star} width={20} height={20} src={`/icons/star-${star <= reviewData?.average ? "fill" : "mute"}.svg`} alt="star" />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const highestStarDistribution = Math.max(...Object.values(reviewData?.distribution || { a: 10 }));
            return (
              <div key={star} className="flex items-center gap-x-1 text-[10px] mb-1">
                <Image width={12} height={12} src={`/icons/star-fill.svg`} alt="star" />
                <p className="w-2">{star}</p>
                <div className="bg-primary-100 h-1 rounded-full mx-1" style={{ width: `${(reviewData?.distribution?.[star] * 100) / highestStarDistribution}%` }}></div>
                <p>{currencyShort(reviewData?.distribution?.[star])}</p>
              </div>
            );
          })}
        </div>
        <div className="col-span-2">
          <div className="flex text-[10px] mb-1 items-center gap-x-2">
            <p className="w-40">{JOB_DESCRIPTION_PAGE_STRINGS.timeFlexibility[lang]}</p>
            <div className="w-full h-1 bg-gray-300 rounded-full">
              <div className="h-1 bg-primary-100 rounded-full" style={{ width: `${(reviewData?.feedbacks?.time * 100) / reviewData?.count}%` }}></div>
            </div>
            <p>{((reviewData?.feedbacks?.time * 100) / reviewData?.count).toFixed(0)}%</p>
          </div>
          <div className="flex text-[10px] mb-1 items-center gap-x-2">
            <p className="w-40">{JOB_DESCRIPTION_PAGE_STRINGS.benefits[lang]}</p>
            <div className="w-full h-1 bg-gray-300 rounded-full">
              <div className="h-1 bg-primary-100 rounded-full" style={{ width: `${(reviewData?.feedbacks?.benefit * 100) / reviewData?.count}%` }}></div>
            </div>
            <p>{((reviewData?.feedbacks?.benefit * 100) / reviewData?.count).toFixed(0)}%</p>
          </div>
          <div className="flex text-[10px] mb-1 items-center gap-x-2">
            <p className="w-40">{JOB_DESCRIPTION_PAGE_STRINGS.payScale[lang]}</p>
            <div className="w-full h-1 bg-gray-300 rounded-full">
              <div className="h-1 bg-primary-100 rounded-full" style={{ width: `${(reviewData?.feedbacks?.pay * 100) / reviewData?.count}%` }}></div>
            </div>
            <p>{((reviewData?.feedbacks?.pay * 100) / reviewData?.count).toFixed(0)}%</p>
          </div>
          <div className="flex text-[10px] mb-1 items-center gap-x-2">
            <p className="w-40">{JOB_DESCRIPTION_PAGE_STRINGS.workEnvironment[lang]}</p>
            <div className="w-full h-1 bg-gray-300 rounded-full">
              <div className="h-1 bg-primary-100 rounded-full" style={{ width: `${(reviewData?.feedbacks?.environment * 100) / reviewData?.count}%` }}></div>
            </div>
            <p>{((reviewData?.feedbacks?.environment * 100) / reviewData?.count).toFixed(0)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewStats;
