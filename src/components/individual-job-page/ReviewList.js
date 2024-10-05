import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getRelativeTime } from "@/lib/utils";
import Image from "next/image";
import { JOB_DESCRIPTION_PAGE_STRINGS } from "@/constants/strings/jobDescriptionPageStrings";

function ReviewList({ lang, reviewData }) {
  return (
    <div>
      {reviewData?.reviews?.map((review, index) => {
        return (
          <div key={index} className="mb-8">
            <div className="flex gap-x-4 mt-8 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={review?.user?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="">
                <p className="text-xl font-semibold">{review?.user?.name}</p>
                <p className="text-xs text-gray-400 font-medium mb-2">{getRelativeTime(review?.createdAt, lang)}</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Image key={star} width={20} height={20} src={`/icons/star-${star <= review?.rating ? "fill" : "mute"}.svg`} alt="star" />
                  ))}
                </div>
              </div>
              <div className=" ml-2 flex items-center gap-x-4">
                <div className={`flex items-center gap-x-2 px-2 py-1 rounded-md border ${review?.feedbacks?.time ? "text-green-700 border-green-700 bg-green-200" : "text-red-700 border-red-700 bg-red-200"}`}>
                  <p className="text-xs">{JOB_DESCRIPTION_PAGE_STRINGS.timeFlexibility[lang]}</p>
                  <Image src={`/icons/thumb-${review?.feedbacks?.time ? "up-green" : "down-red"}.svg`} width={18} height={18} alt="thumb-up" />
                </div>
                <div className={`flex items-center gap-x-2 px-2 py-1 rounded-md border ${review?.feedbacks?.benefit ? "text-green-700 border-green-700 bg-green-200" : "text-red-700 border-red-700 bg-red-200"}`}>
                  <p className="text-xs">{JOB_DESCRIPTION_PAGE_STRINGS.benefits[lang]}</p>
                  <Image src={`/icons/thumb-${review?.feedbacks?.benefit ? "up-green" : "down-red"}.svg`} width={18} height={18} alt="thumb-up" />
                </div>
                <div className={`flex items-center gap-x-2 px-2 py-1 rounded-md border ${review?.feedbacks?.pay ? "text-green-700 border-green-700 bg-green-200" : "text-red-700 border-red-700 bg-red-200"}`}>
                  <p className="text-xs">{JOB_DESCRIPTION_PAGE_STRINGS.payScale[lang]}</p>
                  <Image src={`/icons/thumb-${review?.feedbacks?.pay ? "up-green" : "down-red"}.svg`} width={18} height={18} alt="thumb-up" />
                </div>
                <div className={`flex items-center gap-x-2 px-2 py-1 rounded-md border ${review?.feedbacks?.environment ? "text-green-700 border-green-700 bg-green-200" : "text-red-700 border-red-700 bg-red-200"}`}>
                  <p className="text-xs">{JOB_DESCRIPTION_PAGE_STRINGS.workEnvironment[lang]}</p>
                  <Image src={`/icons/thumb-${review?.feedbacks?.environment ? "up-green" : "down-red"}.svg`} width={18} height={18} alt="thumb-up" />
                </div>
              </div>
            </div>
            <p className="ml-16 text-sm">{review?.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
