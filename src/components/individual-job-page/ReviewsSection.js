import React, { useEffect } from "react";
import ReviewStats from "./ReviewStats";
import ReviewBox from "./ReviewBox";
import ReviewList from "./ReviewList";
import httpRequest from "@/lib/httpRequest";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getComments, setComments } from "@/redux/slices/commentSlices";

function ReviewsSection({ lang }) {
  const modifiyComments = (comments) => {
    if (!Array.isArray(comments)) {
      console.error("Invalid data format: comments is not an array");
      return;
    }

    // Total count
    const count = comments.length;

    // Handle case when there are no comments
    if (count === 0) {
      return;
    }

    // Average rating
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const average = parseFloat((totalRating / count).toFixed(1));

    // Rating distribution
    const distribution = comments.reduce((dist, comment) => {
      const ratingStr = comment.rating.toString();
      dist[ratingStr] = (dist[ratingStr] || 0) + 1;
      return dist;
    }, {});

    // Ensure all ratings from 1 to 5 are included in the distribution
    for (let i = 1; i <= 5; i++) {
      const key = i.toString();
      if (!distribution[key]) {
        distribution[key] = 0;
      }
    }

    // Feedback counts
    const feedbacks = comments.reduce((feedbackCounts, comment) => {
      if (comment.feedback.time) feedbackCounts.time = (feedbackCounts.time || 0) + 1;
      if (comment.feedback.benefit) feedbackCounts.benefit = (feedbackCounts.benefit || 0) + 1;
      if (comment.feedback.pay) feedbackCounts.pay = (feedbackCounts.pay || 0) + 1;
      if (comment.feedback.environment)
        feedbackCounts.environment = (feedbackCounts.environment || 0) + 1;
      return feedbackCounts;
    }, {});

    // Initialize feedback counts to zero if not present
    ["time", "benefit", "pay", "environment"].forEach((key) => {
      if (!feedbacks[key]) {
        feedbacks[key] = 0;
      }
    });

    // Create a copy of the comments array before sorting
    const sortedComments = [...comments].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // All reviews
    const reviews = sortedComments.map((comment) => ({
      _id: comment._id,
      user: {
        _id: comment.user._id,
        name: comment.user.name,
        avatar: comment.user.avatar,
      },
      rating: comment.rating,
      description: comment.description,
      createdAt: comment.createdAt,
      feedbacks: {
        time: comment.feedback.time,
        benefit: comment.feedback.benefit,
        pay: comment.feedback.pay,
        environment: comment.feedback.environment,
      },
    }));

    // Construct the final object
    const result = {
      count,
      average,
      distribution,
      feedbacks,
      reviews,
    };
    return result;
  };
  const { jobSlug } = useParams();
  const dispatch = useDispatch();
  // const [reviewData, setReviewData] = React.useState([]);

  const reduxComments = useSelector(getComments);

  useEffect(() => {
    // axios.get(`/mock/reviews/${1}.json`).then((res) => {
    //   setReviewData(res.data);
    // });
    httpRequest.get(`http://localhost:3001/comments/job/${jobSlug}`).then((res) => {
      // setReviewData(res.data);
      dispatch(setComments(res.data));
    });
    //TODO: Handle catch
  }, []);

  return (
    <div className="mt-8 mb-4">
      <ReviewStats lang={lang} reviewData={modifiyComments(reduxComments)} />
      <ReviewBox lang={lang} />
      <ReviewList lang={lang} reviewData={modifiyComments(reduxComments)} />
    </div>
  );
}

export default ReviewsSection;
