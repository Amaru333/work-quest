import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UIButton from "@/widgets/UIButton";
import { JOB_DESCRIPTION_PAGE_STRINGS } from "@/constants/strings/jobDescriptionPageStrings";
import { COMMON_STRINGS } from "@/constants/strings/commonStrings";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "@/redux/slices/userSlice";
import { getNameInitialsInUpperCase } from "@/functions/extraFunctions";
import httpRequest from "@/lib/httpRequest";
import { useParams } from "next/navigation";
import { addComment } from "@/redux/slices/commentSlices";

function ReviewBox({ lang }) {
  const { jobSlug } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector(getUserDetails);
  const [hoverRating, setHoverRating] = React.useState(0);

  const [reviewDetails, setReviewDetails] = useState({
    rating: 0,
    description: null,
    feedback: {
      time: null,
      benefit: null,
      environment: null,
      pay: null,
    },
  });

  const onSubmitComment = () => {
    httpRequest
      .post("http://localhost:3001/comments", {
        user: userData?._id,
        job: jobSlug,
        ...reviewDetails,
      })
      .then((res) => {
        setReviewDetails({
          rating: 0,
          description: "",
          feedback: {
            time: null,
            benefit: null,
            environment: null,
            pay: null,
          },
        });
        dispatch(addComment(res.data));
      })
      .catch((err) => {
        //TODO: ERROR
      });
  };

  if (userData) {
    return (
      <div>
        <div className="flex flex-row mt-8">
          <Avatar className="w-12 h-12">
            <AvatarImage src={userData?.avatar} />
            <AvatarFallback>{getNameInitialsInUpperCase(userData?.name)}</AvatarFallback>
          </Avatar>
          <textarea
            placeholder={JOB_DESCRIPTION_PAGE_STRINGS.writeReview[lang]}
            onChange={(e) => setReviewDetails({ ...reviewDetails, description: e.target.value })}
            className="w-full h-24 p-4 ml-4 border border-gray-500 rounded-md shadow-sm focus:ring-primary-100 focus:border-primary-100 text-sm"
          >
            {reviewDetails?.description}
          </textarea>
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
                    src={`/icons/star-${
                      star <= (hoverRating || reviewDetails.rating) ? "fill" : "mute"
                    }.svg`}
                    alt="star"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => {
                      setReviewDetails({ ...reviewDetails, rating: star });
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
                <Image
                  src={`/icons/thumb-${reviewDetails?.feedback?.time ? "up-green" : "up"}.svg`}
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  alt="thumb-up"
                  onClick={() =>
                    setReviewDetails({
                      ...reviewDetails,
                      feedback: { ...reviewDetails.feedback, time: true },
                    })
                  }
                />
                <Image
                  src={`/icons/thumb-${
                    reviewDetails?.feedback?.time === false ? "down-red" : "down"
                  }.svg`}
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  alt="thumb-down"
                  onClick={() =>
                    setReviewDetails({
                      ...reviewDetails,
                      feedback: { ...reviewDetails.feedback, time: false },
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-x-2">
              <p className="text-sm">{JOB_DESCRIPTION_PAGE_STRINGS.payScale[lang]}</p>
              <div className="flex items-center gap-x-2">
                <Image
                  src={`/icons/thumb-${reviewDetails?.feedback?.pay ? "up-green" : "up"}.svg`}
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  alt="thumb-up"
                  onClick={() =>
                    setReviewDetails({
                      ...reviewDetails,
                      feedback: { ...reviewDetails.feedback, pay: true },
                    })
                  }
                />
                <Image
                  src={`/icons/thumb-${
                    reviewDetails?.feedback?.pay === false ? "down-red" : "down"
                  }.svg`}
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  alt="thumb-down"
                  onClick={() =>
                    setReviewDetails({
                      ...reviewDetails,
                      feedback: { ...reviewDetails.feedback, pay: false },
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-x-2">
              <p className="text-sm">{JOB_DESCRIPTION_PAGE_STRINGS.benefits[lang]}</p>
              <div className="flex items-center gap-x-2">
                <Image
                  src={`/icons/thumb-${reviewDetails?.feedback?.benefit ? "up-green" : "up"}.svg`}
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  alt="thumb-up"
                  onClick={() =>
                    setReviewDetails({
                      ...reviewDetails,
                      feedback: { ...reviewDetails.feedback, benefit: true },
                    })
                  }
                />
                <Image
                  src={`/icons/thumb-${
                    reviewDetails?.feedback?.benefit === false ? "down-red" : "down"
                  }.svg`}
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  alt="thumb-down"
                  onClick={() =>
                    setReviewDetails({
                      ...reviewDetails,
                      feedback: { ...reviewDetails.feedback, benefit: false },
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-x-2">
              <p className="text-sm">{JOB_DESCRIPTION_PAGE_STRINGS.workEnvironment[lang]}</p>
              <div className="flex items-center gap-x-2">
                <Image
                  src={`/icons/thumb-${
                    reviewDetails?.feedback?.environment ? "up-green" : "up"
                  }.svg`}
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  alt="thumb-up"
                  onClick={() =>
                    setReviewDetails({
                      ...reviewDetails,
                      feedback: { ...reviewDetails.feedback, environment: true },
                    })
                  }
                />
                <Image
                  src={`/icons/thumb-${
                    reviewDetails?.feedback?.environment === false ? "down-red" : "down"
                  }.svg`}
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  alt="thumb-down"
                  onClick={() =>
                    setReviewDetails({
                      ...reviewDetails,
                      feedback: { ...reviewDetails.feedback, environment: false },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div>
            <UIButton className="px-8" onClick={onSubmitComment}>
              {COMMON_STRINGS.submit[lang]}
            </UIButton>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Login to comment</p>;
  }
}

export default ReviewBox;
