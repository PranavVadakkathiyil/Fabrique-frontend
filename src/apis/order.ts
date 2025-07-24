import axios from "./axios";
interface RazorpayVerificationPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const gettotalamount = async () => {
  return axios.get("/order/gettotalamount");
};
//const deleteitemcart = async (_id:string) => {
//  return axios.post('/cart/deleteitem',{item_id:_id});
//}
const OrderCOD = async (orderDetails: {
  name: string;
  address: string;
  phone: number;
  pincode: number;
  paymentMode: "cod" | "online";
  totalAmount: number;
  offerId:string;
}) => {
  return axios.post("/order/placeordercod", orderDetails);
};
const RazorpayCOD = async (orderDetails: {
  name: string;
  address: string;
  phone: number;
  pincode: number;
  paymentMode: "cod" | "online";
  totalAmount: number;
}) => {
  return axios.post("/order/placeorderrazorpay", orderDetails);
};

const VerifyPayment = async (PaymentDetails: RazorpayVerificationPayload) => {
  return axios.post("/order/verify-razorpay", PaymentDetails);
};

const GetUserOrder = async () => {
  return axios.get("/order/getuserorder");
};

const GetSellerOrder = async () => {
  return axios.get("/order/getsellerorder");
};

const UpdateOrderStatus = async ({orderId,productId,sellerId,status,}: {orderId:string; productId: string;sellerId: string;status: string;}) => {
  return axios.put("/order/updateorderstatus", {
    orderId,
    productId,
    sellerId,
    status,
  });
};


export {
  gettotalamount,
  OrderCOD,
  RazorpayCOD,
  VerifyPayment,
  GetUserOrder,
  GetSellerOrder,
  UpdateOrderStatus,
};
