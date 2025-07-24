import { useEffect, useState } from 'react';
import { GetSellerOrder, UpdateOrderStatus } from '../../apis/order';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBox,
  FaRupeeSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaPrint,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import SellerOrderSkeleton from '../../components/Loading/SellerOrderSkeleton';

interface OrderItem {
  name: string;
  size: string;
  color: string;
  amount: number;
  paymentMode: string;
  paymentStatus: string;
  productcount: number;
  Orderstatus: string;
  image: string;
  product: string;
  seller: string;
}

interface OrderType {
  _id: string;
  name: string;
  address: string;
  phone: number;
  pincode: number;
  user: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

const Order = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const res = await GetSellerOrder();
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const orderStatusHandler = async ({
    orderId,
    productId,
    sellerId,
    newStatus,
  }: {
    orderId: string;
    productId: string;
    sellerId: string;
    newStatus: string;
  }) => {
    try {
      const res = await UpdateOrderStatus({
        orderId,
        productId,
        sellerId,
        status: newStatus,
      });

      if (res.data.success) {
        toast.success('Order status updated!');
        await getAllOrders();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update order status');
    }
  };

  const printOrderDetails = (order: OrderType, item: OrderItem) => {
    const printContent = `
Order ID: ${order._id}
Date: ${new Date(order.createdAt).toLocaleString('en-IN')}
----------------------------------------
Product: ${item.name}
Size: ${item.size}
Color: ${item.color}
Quantity: ${item.productcount}
Price: ₹${item.amount}
Payment Mode: ${item.paymentMode}
Payment Status: ${item.paymentStatus}
Order Status: ${item.Orderstatus}
----------------------------------------
Shipping To:
${order.name}
${order.address}
Pincode: ${order.pincode}
Phone: ${order.phone}
----------------------------------------
Total: ₹${order.totalAmount}
`;

    const newWindow = window.open('', '_blank', 'width=600,height=800');
    if (newWindow) {
      newWindow.document.write(
        `<pre style="font-family: monospace; padding: 20px;">${printContent}</pre>`
      );
      newWindow.document.close();
      newWindow.print();
    }
  };

  const hasItems = orders.some((order) => order.items.length > 0);

  if (loading) return <SellerOrderSkeleton />;

  return (
    <div className="w-full px-4 py-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center tracking-tight">
        🧾 Your Orders
      </h2>

      <div className="space-y-8 max-w-7xl mx-auto">
        {!hasItems ? (
          <div className="text-center text-gray-500 py-20 text-lg font-medium">
            🚫 No Orders Found for Your Products
          </div>
        ) : (
          orders.map((order) =>
            order.items.map((item, idx) => (
              <div
                key={`${order._id}-${idx}`}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                <div className="md:col-span-2 h-36 md:h-full overflow-hidden rounded-xl border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 text-sm text-gray-700 gap-y-1 mt-2">
                      <p><strong>Size:</strong> {item.size}</p>
                      <p><strong>Qty:</strong> {item.productcount}</p>
                      <p><strong>Color:</strong> {item.color}</p>
                      <p className="flex items-center gap-1"><FaRupeeSign /> {item.amount}</p>
                      <p><strong>Payment:</strong> {item.paymentMode.toUpperCase()}</p>
                      <p>
                        <strong>Status:</strong>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold 
                          ${item.paymentStatus === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'}`}>
                          {item.paymentStatus}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center text-xs text-gray-500 gap-4">
                    <div className="flex items-center gap-1">
                      <FaBox />
                      <span className="font-medium">Order ID:</span> {order._id}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      {new Date(order.createdAt).toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-center gap-1">
                      {item.Orderstatus === 'Pending' ? (
                        <>
                          <span className="text-red-500">❌</span>
                          <span className="font-semibold text-red-600">{item.Orderstatus}</span>
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="text-green-500" />
                          <span className="font-semibold text-green-700">{item.Orderstatus}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col justify-between">
                  <div className="text-sm text-gray-800 mb-4">
                    <h4 className="font-bold mb-1 flex items-center gap-1">
                      <FaMapMarkerAlt /> Shipping Address
                    </h4>
                    <p>{order.name}</p>
                    <p>{order.address}</p>
                    <p>Pincode: {order.pincode}</p>
                    <p className="flex items-center gap-1 mt-1"><FaPhoneAlt /> {order.phone}</p>
                  </div>

                  <div>
                    <label
                      htmlFor={`status-${order._id}-${idx}`}
                      className="block text-sm font-semibold mb-1"
                    >
                      Update Order Status
                    </label>
                    <select
                      id={`status-${order._id}-${idx}`}
                      defaultValue={item.Orderstatus}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                      onChange={(e) =>
                        orderStatusHandler({
                          orderId: order._id,
                          productId: item.product,
                          sellerId: item.seller,
                          newStatus: e.target.value,
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() => printOrderDetails(order, item)}
                      disabled={item.Orderstatus === 'Pending'}
                      className={`mt-4 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition
                      ${item.Orderstatus === 'Pending'
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                      <FaPrint className="mr-2" />
                      Print Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Order;
