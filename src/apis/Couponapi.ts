import axios from "./axios"; 
type payload= {
    code: string;
    expiryDate: string;
    maxUsage: number;
}
const addCoupon = async (data:payload) => {
  return axios.post("/coupon/addcoupon",data);
};
const getCoupon = async () => {
  return axios.get("/coupon/getsellercoupon");
};
const blockCoupon = async (couponId:string) => {
  return axios.post("/coupon/deletecoupon",{couponId});
};
const ValidateCoupon = async (coupon:string) => {
  return axios.post("/coupon/verifycoupon",{coupon});
};



export {addCoupon,getCoupon,blockCoupon,ValidateCoupon}