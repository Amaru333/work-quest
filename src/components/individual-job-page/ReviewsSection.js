import axios from "axios";
import React, { useEffect } from "react";
import ReviewStats from "./ReviewStats";
import ReviewBox from "./ReviewBox";
import ReviewList from "./ReviewList";

function ReviewsSection({ lang }) {
  const [reviewData, setReviewData] = React.useState({});

  useEffect(() => {
    axios.get(`/mock/reviews/${1}.json`).then((res) => {
      setReviewData(res.data);
    });
    //TODO: Handle catch
  }, []);

  console.log(reviewData, "REVIEW DATA");
  return (
    <div className="mt-8 mb-4">
      <ReviewStats lang={lang} reviewData={reviewData} />
      <ReviewBox lang={lang} />
      <ReviewList lang={lang} reviewData={reviewData} />
    </div>
  );
}

export default ReviewsSection;
