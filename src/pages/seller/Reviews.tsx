import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import { GetSellerReview } from "../../apis/Reviewapi"; // Make sure this function exists and is correct
import ReviewCardLoading from "../../components/Loading/ReviewLoad";

interface Review {
  user: {
    name: string;
    email: string;
  };
  review: string;
  rating: number;
  product?: {
    name?: string;
    images?: string[];
  };
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await GetSellerReview(); // Must return { reviews: [...] }
        setReviews(res.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">
        Customer Reviews
      </h2>

     <div className="grid sm:grid-cols-4 grid-cols-1">
       {loading ? (
        <ReviewCardLoading/>
      ) : reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.user.name}
            review={review.review}
            verified={true} // Optional: you can add logic to check if it's verified
            stars={review.rating}
          />
        ))
      )}
     </div>
    </div>
  );
};

export default Reviews;
