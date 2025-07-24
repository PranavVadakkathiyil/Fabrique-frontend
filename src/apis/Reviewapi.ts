import axios from "./axios"; 

 const submitProductReview = async (data: {
  product: string;
  order: string;
  rating: number;
  review: string;
}) => {
  return axios.post("/review/addreivew", data);
};

const GetSellerReview = async () => {
  return axios.get("/review/getsellerreview");
};

const GetAllReview = async () => {
  return axios.get("/review/allreview");
};



export {submitProductReview,GetSellerReview,GetAllReview}