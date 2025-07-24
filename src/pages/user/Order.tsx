import { useEffect, useState } from "react";
import OrderCard from "../../components/user/OrderCard";
import OrderCardLoading from "../../components/Loading/OrderCardLoading";
import { GetUserOrder } from "../../apis/order";
import { useNavContext } from "../../context/NavContext";
import { AiTwotonePrinter } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  product: string;
  name: string;
  image: string;
  amount: number;
  size: string;
  color: string;
  seller:string;
  Orderstatus: string;
  paymentStatus: string;
  paymentMode: string;
  productcount: number;
}

interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
  subtotal: number;
  discount:number;
  deliveryFee: number;
  items: OrderItem[];
  name: string;
  address: string;
  phone: number;
  pincode: number;
}

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const { fetchUserInfo } = useNavContext();
  
  const navigate = useNavigate()

  useEffect(() => {
    const getuserorders = async () => {
      try {
        const res = await GetUserOrder();
        console.log(res.data.orders);
        await fetchUserInfo();
        
        setOrders(res.data.orders);
      } catch (error) {
        console.log("Order fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    getuserorders();
  }, []);
  const handleInvoice = (order:Order) => {
    navigate("/invoice", { state: { order } });
    console.log("hi");
    
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>

      {loading ? (
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <OrderCardLoading key={idx} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No orders found.
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 border-b border-gray-300 pb-3">
                <div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-700">Order ID:</span> #{order._id.slice(0, 6)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-700">Placed on:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Delivery Address:</span> {order.address},{" "}
                    {order.pincode}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Phone:</span> {order.phone}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {order.items.map((item, idx) => (
                  <OrderCard key={`${order._id}-${idx}`} item={item} order={order} />
                ))}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:justify-end border-t  border-gray-300 pt-4 mt-4 text-sm text-gray-700 gap-2 sm:gap-8">
                
                <button className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-xs hover:bg-gray-800 transition-all duration-150">
                  <AiTwotonePrinter onClick={()=>handleInvoice(order)}    className="text-sm" />
                  Invoice Download
                </button>
                
                <p>
                  <span className="font-medium">Subtotal:</span> ₹{order.subtotal}
                </p>
                <p>
                  <span className="font-medium">Delivery Fee:</span> ₹{order.deliveryFee}
                </p>
                 <p>
                  <span className="font-medium">Discount:</span> {order.discount ? order.discount : 0}%
                </p>
                <p className="font-bold text-lg text-black">
                  Total: ₹{order.totalAmount}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default OrdersList;
