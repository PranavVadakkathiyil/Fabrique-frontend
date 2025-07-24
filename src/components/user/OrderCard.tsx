import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import toast from "react-hot-toast";
import { BsFillChatDotsFill } from "react-icons/bs";
import { submitProductReview } from "../../apis/Reviewapi";
import { createChat, getMessages } from "../../apis/chatMessageapi";
import Chat from "../../components/user/Chat"; 

interface OrderItemProps {
  item: {
    product: string;
    name: string;
    image: string;
    amount: number;
    size: string;
    color: string;
    productcount: number;
    Orderstatus: string;
    paymentStatus: string;
    seller: string;
    paymentMode: string;
  };
  order: {
    _id: string;
    createdAt: string;
    totalAmount: number;
  };
}


const OrderCard: React.FC<OrderItemProps> = ({ item, order }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [chatData, setChatData] = useState<{
    chatId: string;
    userId: string;
  } | null>(null);

  const statusColor =
    item.Orderstatus === "Delivered"
      ? "text-green-600"
      : item.Orderstatus === "Pending"
      ? "text-yellow-600"
      : "text-blue-600";

  const statusDotColor =
    item.Orderstatus === "Delivered"
      ? "bg-green-500"
      : item.Orderstatus === "Pending"
      ? "bg-yellow-500"
      : "bg-blue-500";

  const paymentColor =
    item.paymentStatus.toLowerCase() === "completed"
      ? "text-green-600"
      : "text-red-500";

  const handleRatingClick = (star: number) => setRating(star);
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value);

  const submitFeedback = async () => {
    if (rating === 0 || review.trim() === "") {
      toast.error("Please select a rating and write a review.");
      return;
    }

    try {
      await submitProductReview({
        product: item.product,
        order: order._id,
        rating,
        review,
      });

      toast.success("Review submitted successfully!");
      setRating(0);
      setReview("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const ChatWithStore = async (storeId: string) => {
    try {
      const res = await createChat(storeId, order._id);
      const chatIdres = res.data.populatedChat._id;

      const messagesRes = await getMessages(chatIdres);
      setChatData({
        chatId: chatIdres,
        userId: messagesRes.data.user,
      });

      setChatPopupOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <div className="col-span-1 flex flex-col sm:flex-row bg-white border border-gray-100 shadow-md rounded-2xl p-4 w-full max-w-[420px] transition hover:shadow-lg duration-200">
        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0 sm:mr-5">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">
              Color: <span className="capitalize text-gray-700">{item.color}</span> | Size:{" "}
              <span className="uppercase text-gray-700">{item.size}</span>
            </p>
            <p className="text-sm text-gray-600">Qty: {item.productcount}</p>
            <p className="text-sm text-gray-600">Amount: ₹{item.amount}</p>
            <p className="text-sm">
              Payment: <span className="capitalize">{item.paymentMode}</span> —{" "}
              <span className={`${paymentColor} capitalize font-medium`}>{item.paymentStatus}</span>
            </p>
            <p className="text-xs text-gray-400">Order ID: #{order._id.slice(-6)}</p>
            <p className="text-xs text-gray-400">
              Ordered on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${statusDotColor}`}></span>
              <span className={`text-sm font-medium ${statusColor}`}>{item.Orderstatus}</span>
            </div>
            <button
              onClick={() => ChatWithStore(item.seller)}
              className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-xs hover:bg-gray-800 transition-all duration-150"
            >
              <BsFillChatDotsFill className="text-sm" />
              Chat Store
            </button>
          </div>

          {item.Orderstatus === "Delivered" && (
            <div className="mt-4 border-t pt-3">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <AiFillStar
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-xl cursor-pointer ${
                      (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <textarea
                placeholder="Write your review..."
                className="w-full text-sm border rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                rows={2}
                value={review}
                onChange={handleReviewChange}
              />

              <button
                onClick={submitFeedback}
                className="mt-2 w-full bg-black text-white py-1.5 text-sm rounded-md hover:bg-gray-800 transition-all"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat popup rendered separately */}
      {chatPopupOpen && chatData && (
        <Chat
          orderId={order._id}
          itemName={item.name}
          totalAmount={order.totalAmount}
          chatId={chatData.chatId}
          onClose={() => setChatPopupOpen(false)}
          userId={chatData.userId}
        />
      )}
    </>
  );
};

export default OrderCard;
