import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { gettotalamount, OrderCOD, RazorpayCOD } from "../../apis/order";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"
import { LuTag } from "react-icons/lu";

import { VerifyPayment } from '../../apis/order'
import { ValidateCoupon } from "../../apis/Couponapi";
const Order = () => {
  const [orderSummary, setOrderSummary] = useState({
    totalAmount: 0,
    offer: 0,
    deliveryFee: 0,
  });

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [totalamount, settotelamount] = useState(0);
  const [paymentMode, setPaymentMode] = useState<"cod" | "online" | "">("");
  const [coupon, setcoupon] = useState("")
  const [couponloading, setcouponloading] = useState(false)
  const [promodiscount, setpromodiscount] = useState(0)
  const [couponInfo, setcouponInfo] = useState("")
  const [orderloading, setorderloading] = useState(false)

  const navigate = useNavigate();

  const successmsg = (msg: string) => {
    toast.success(msg, {
      icon: "👏",
      style: { backgroundColor: "black", color: "white" },
    });
  };

  const errmsg = (msg: string) => {
    toast.error(msg, {
      icon: "🔥",
      style: { backgroundColor: "#d00000", color: "white" },
    });
  };

  useEffect(() => {
    const Gettotalamount = async () => {
      const res = await gettotalamount();
      if (res.data.success) {
        const { totalAmount, offer, deliveryFee } = res.data;
        console.log(res.data, "fees");

        setOrderSummary({ totalAmount, offer, deliveryFee });
        settotelamount(totalAmount + deliveryFee - offer);
      }
    };
    Gettotalamount();
  }, []);
  const CheckCoupon = async (coupon: string) => {
    try {
      if (!coupon) { errmsg("Add Coupon code"); return }
      setcouponloading(true)
      const res = await ValidateCoupon(coupon)
      console.log(res.data);
      setcouponInfo(res.data.couponInfo)

      if (res.data.success) {
        setcouponloading(false)
        setpromodiscount(res.data.discount)
        successmsg(res.data.message)
      }
      else {
        errmsg(res.data.message)
      }
    } catch (error) {
      setcouponloading(false)


      errmsg("Not a Valid Coupon");
      console.log(error);

    }
    finally {
      setcouponloading(false)
    }

  }

  const createorder = async () => {
    if (!name || !address || !phone || !pincode || !paymentMode) {
      errmsg("All fields are required");
      return;
    }
    setorderloading(true)

    const orderDetails = {
      name,
      address,
      phone: Number(phone),
      pincode: Number(pincode),
      paymentMode,
      totalAmount: totalamount,
      offerId: couponInfo,

    };


    console.log("Order Details:", orderDetails);

    try {
      if (paymentMode === "cod") {
        const res = await OrderCOD(orderDetails);
        if (res.data.success) {
          successmsg(res.data.message);
          setorderloading(false)
          navigate("/order");
        } else {
          errmsg("Order failed. Try again later.");
          setorderloading(false)

        }
      } else {
        const res = await RazorpayCOD(orderDetails);
        if (res.data.razorpayOrder && res.data.razorpayOrder.id) {
          const { razorpayOrder } = res.data;
          console.log(res.data);
          console.log(razorpayOrder);

          console.log(razorpayOrder.key_id);

          const options = {
            key: razorpayOrder.key_id,
            amount: razorpayOrder.amount,
            currency: "INR",
            name: "FABRIQUE.CO",
            description: "Complete your purchase",
            order_id: razorpayOrder.id,
            handler: async function (response: any) {
              try {
                const verifyRes = await VerifyPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });

                if (verifyRes.data.success) {
                  successmsg("✅ Payment verified & order confirmed");
          setorderloading(false)

                  navigate("/order");
                } else {
                  errmsg("❌ Payment verification failed");
          setorderloading(false)

                  navigate("/order");
                }
              } catch (error) {
                console.error("Verification Error:", error);
          setorderloading(false)

                errmsg("⚠️ Payment verification error");
              }
            },
            prefill: {
              name,
              contact: phone,
              //email: "test@example.com", // Optional: add user's email if available
            },
            theme: {
              color: "#000000",
            },
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } else {
          errmsg("Unable to initiate Razorpay. Try again.");
        }
      }
    } catch (error) {
      console.error("Error on CheckOut", error);
      errmsg("Server error. Please try again.");
    }
  };
  const discount = promodiscount > 0 ? Math.round(orderSummary.totalAmount * (promodiscount / 100)) : 0;

  return (
    <>

      <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-10 flex flex-col sm:flex-row gap-6">
        {/* Left Side - Address & Payment */}
        <div className="flex flex-col sm:w-2/3 gap-6">
          {/* Address Section */}
          <section className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">1. Add Address to Deliver</h2>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Address</label>
                <textarea
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 min-h-[100px] outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Phone</label>
                <input
                  type="number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) setPhone(val);
                  }}
                  required
                  placeholder="Enter Phone"
                  className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Pincode</label>
                <input
                  type="number"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) setPincode(val);
                  }}
                  required
                  placeholder="Enter Pincode"
                  className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </form>
          </section>

          {/* Payment Section */}
          <section className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">2. Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  className="accent-black"
                  checked={paymentMode === "cod"}
                  onChange={() => setPaymentMode("cod")}
                />
                CASH ON DELIVERY
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  className="accent-black"
                  checked={paymentMode === "online"}
                  onChange={() => setPaymentMode("online")}
                />
                ONLINE PAYMENT
              </label>
            </div>
          </section>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:w-[30%] w-full bg-white shadow-lg rounded-2xl p-5 sticky top-24 self-start h-fit">
          <h2 className="text-2xl font-semibold mb-4">ORDER SUMMARY</h2>

          <div className="space-y-2 text-sm">
            <p className="flex justify-between text-gray-500">
              Subtotal <span className="text-black font-medium">₹{orderSummary.totalAmount}</span>
            </p>
            <p className="flex justify-between text-gray-500">
              Discount <span className="text-red-500 font-medium">- ₹{discount}</span>
            </p>
            <p className="flex justify-between text-gray-500">
              Delivery Fee <span className="text-black font-medium">₹{orderSummary.deliveryFee}</span>
            </p>
          </div>

          <hr className="my-4" />

          <p className="flex justify-between font-semibold text-lg">
            Total <span>₹{orderSummary.totalAmount + orderSummary.deliveryFee - discount}</span> {/*- discount*/}
          </p>
          <div className="mt-4 flex gap-2">
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 w-full">
              <LuTag className="text-gray-400 mr-2" />
              <input
                type="text"
                value={coupon}
                placeholder="Add Promo code"
                className="flex-grow outline-none bg-transparent text-sm"
                onChange={(e) => setcoupon(e.target.value)}
              />
            </div>
            <button
              onClick={() => CheckCoupon(coupon)}
              className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800"
            >
              {
                couponloading ? (<Loader2 />) : (
                  "Submit"
                )
              }

            </button>
          </div>

          <button
            onClick={createorder}
            className="w-full mt-6 py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition"
          >
            {
                orderloading ? (<Loader2 />) : (
                 <>
                 Checkout <FaArrowRight />
                 </> 
                )
              }
             
          </button>
        </div>
      </div>
    </>
  );
};

export default Order;
