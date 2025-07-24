 const discount = (newprice: number, oldprice: number): number => {
  const discount = ((oldprice - newprice) / oldprice) * 100;
  const roundedDiscount = Math.round(discount);
  return roundedDiscount;
};
export default  discount