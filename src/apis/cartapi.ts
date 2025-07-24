import axios from "./axios";

 const AddToCart = async (payload: {
  product_id: string;
  size: string;
  color: string;
  count: number;
  amount: number;
}) => {
  return axios.post('/cart/addtocart', payload);
};

const getcart = async () => {
  return axios.get('/cart/getcart');
}
const deleteitemcart = async (_id:string) => {
  return axios.post('/cart/deleteitem',{item_id:_id});
}

export {AddToCart,getcart,deleteitemcart}