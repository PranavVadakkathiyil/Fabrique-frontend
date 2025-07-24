import { FaStar } from "react-icons/fa"
import { MdVerified } from "react-icons/md"
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

const reviewsData = [
    {
      name: 'Pranav V',
      review: 'Lorem ipsum Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur.',
      verified: true,
      stars: 5,
    },
    {
      name: 'John Doe',
      review: 'Amazing product! Will buy again.',
      verified: true,
      stars: 4,
    },
    {
      name: 'Jane Smith',
      review: 'Good quality but delivery was late.',
      verified: false,
      stars: 3,
    },
    {
      name: 'Pranav V',
      review: 'Lorem ipsum Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur.',
      verified: true,
      stars: 5,
    },
    {
      name: 'John Doe',
      review: 'Amazing product! Will buy again.',
      verified: true,
      stars: 4,
    },
    {
      name: 'Jane Smith',
      review: 'Good quality but delivery was late.',
      verified: false,
      stars: 3,
    },
  ];
 
  

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