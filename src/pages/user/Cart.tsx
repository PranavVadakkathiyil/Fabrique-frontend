import CartCard from "../../components/user/CartCard";
import CartLoading from "../../components/Loading/CartLoading";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getcart } from "../../apis/cartapi";
import { useNavigate } from "react-router-dom";
import { useNavContext } from "../../context/NavContext";

interface ProductType {
  _id: string;
  name: string;
  images: string[];
}

interface CartItemType {
  _id: string;
  product: ProductType;
  amount: number;
  color: string;
  size: string;
  productcount: number;
  totalamount: number;
  refreshCart: () => void;
}

const Cart = () => {
  const { fetchUserInfo } = useNavContext();
  const [cartitems, setcartitems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalamount, settotalamount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getcartitem = async () => {
      try {
        const res = await getcart();
        settotalamount(res.data.TotalAmount);
        setcartitems(res.data.getcart);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getcartitem();
  }, []);

  const refreshCart = async () => {
    try {
      const res = await getcart();
      await fetchUserInfo();
      settotalamount(res.data.TotalAmount);
      setcartitems(res.data.getcart);
    } catch (err) {
      console.log(err);
    }
  };

  const Subtotal = totalamount + 40;

  if (loading) return <CartLoading />;

  if (cartitems.length === 0) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center text-gray-500 text-center px-4">
        <FaShoppingCart className="text-6xl mb-4" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-sm mt-1">Looks like you haven’t added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 min-h-screen px-2 sm:px-6 py-6">
      {/* Cart Items */}
      <section className="lg:w-[70%] w-full grid sm:grid-cols-1 grid-cols-1 gap-4">
        {cartitems.map((data) => (
          <CartCard
            key={data._id}
            _id={data._id}
            productname={data.product.name}
            image={data.product.images[0]}
            amount={data.amount}
            color={data.color}
            size={data.size}
            productcount={data.productcount}
            refreshCart={refreshCart}
          />
        ))}
      </section>

      {/* Order Summary */}
      <section className="lg:w-[30%] w-full bg-white shadow-lg rounded-2xl p-5 sticky top-24 self-start h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">ORDER SUMMARY</h2>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Total</span>
            <span className="text-black font-medium">₹ {totalamount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="text-black font-medium">₹ 40</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-semibold text-lg text-gray-800">
          <span>Subtotal</span>
          <span>₹ {Subtotal}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full mt-6 py-3 rounded-full bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition text-sm sm:text-base"
        >
          Checkout <FaArrowRight />
        </button>
      </section>
    </div>
  );
};

export default Cart;
