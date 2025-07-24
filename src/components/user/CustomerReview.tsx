
import ReviewCard from "../ReviewCard"
import { useEffect, useState } from "react";
import { GetAllReview } from "../../apis/Reviewapi";
export interface PopulatedReview {
  rating: number;
  review: string;
  user: string;
  userName: string;
  userEmail: string;
}

 
  

const CustomerReview = () => {
  const [review, setreview] = useState<PopulatedReview[]>([])
   useEffect(() => {
    const GetReview =async()=>{
      try {
        const res = await GetAllReview()
        //console.log("review",res.data.reviews);
        setreview(res.data.reviews)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    GetReview()
  }, [])
    return (
        <>
            <p className="font-text text-3xl sm:text-4xl font-semibold tracking-wide text-center">CUSTOMER RATING</p>
            <section className="grid 1 sm:grid-cols-4 font-text">

                {review.map((review, index) => (
        <ReviewCard
          key={index}
          name={review.userName}
          review={review.review}
          verified={true}
          stars={review.rating}
        />
      ))}





            </section>
        </>

    )
}

export default CustomerReview