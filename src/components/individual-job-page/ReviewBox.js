import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UIButton from "@/widgets/UIButton";
import { JOB_DESCRIPTION_PAGE_STRINGS } from "@/constants/strings/jobDescriptionPageStrings";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function ReviewBox({ lang }) {
  const [hoverRating, setHoverRating] = React.useState(0);
  return (
    <div>
      <div className="flex flex-row mt-8">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/images/placeholder-avatar.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <textarea placeholder={JOB_DESCRIPTION_PAGE_STRINGS.writeReview[lang]} className="w-full h-24 p-4 ml-4 border border-gray-500 rounded-md shadow-sm focus:ring-primary-100 focus:border-primary-100"></textarea>
      </div>
      <div className="flex items-center justify-between mt-6 ml-16">
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  className="cursor-pointer"
                  key={star}
                  width={24}
                  height={24}
                  src={`/icons/star-${star <= hoverRating ? "fill" : "mute"}.svg`}
                  alt="star"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => {
                    // setRating(star)
                    console.log(star, "STARS");
                  }}
                />
              ))}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {hoverRating > 0 && (
              <p>
                {hoverRating} star{hoverRating > 1 && "s"}
              </p>
            )}
          </TooltipContent>
        </Tooltip>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex items-center justify-between gap-x-2">
            <p className="text-sm">{JOB_DESCRIPTION_PAGE_STRINGS.timeFlexibility[lang]}</p>
            <div className="flex items-center gap-x-2">
              <Image src="/icons/thumb-up.svg" width={18} height={18} alt="thumb-up" />
              <Image src="/icons/thumb-down.svg" width={18} height={18} alt="thumb-down" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-2">
            <p className="text-sm">{JOB_DESCRIPTION_PAGE_STRINGS.payScale[lang]}</p>
            <div className="flex items-center gap-x-2">
              <Image src="/icons/thumb-up.svg" width={18} height={18} alt="thumb-up" />
              <Image src="/icons/thumb-down.svg" width={18} height={18} alt="thumb-down" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-2">
            <p className="text-sm">{JOB_DESCRIPTION_PAGE_STRINGS.benefits[lang]}</p>
            <div className="flex items-center gap-x-2">
              <Image src="/icons/thumb-up.svg" width={18} height={18} alt="thumb-up" />
              <Image src="/icons/thumb-down.svg" width={18} height={18} alt="thumb-down" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-2">
            <p className="text-sm">{JOB_DESCRIPTION_PAGE_STRINGS.workEnvironment[lang]}</p>
            <div className="flex items-center gap-x-2">
              <Image src="/icons/thumb-up.svg" width={18} height={18} alt="thumb-up" />
              <Image src="/icons/thumb-down.svg" width={18} height={18} alt="thumb-down" />
            </div>
          </div>
        </div>
        <div>
          <UIButton className="px-8">{COMMON_STRINGS.submit[lang]}</UIButton>
        </div>
      </div>
    </div>
  );
}

export default ReviewBox;
