// src/pages/seller/Chats.tsx
import React, { useEffect, useState } from 'react';
import { getChat } from '../../apis/chatMessageapi';
import ChatPopup from '../../components/seller/ChatPopup';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  pic: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  product: string;
  seller: string;
  color: string;
  size: string;
  productcount: number;
  name: string;
  image: string;
  amount: number;
  Orderstatus: string;
  paymentStatus: string;
  paymentMode: string;
}

export interface Order {
  _id: string;
  address: string;
  name: string;
  phone: number;
  pincode: number;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  user: string;
  __v: number;
}

export interface Chat {
  _id: string;
  users: User[];
  order: Order;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Chats: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chatPopupOpen, setChatPopupOpen] = useState(false);

  const GetAllChats = async () => {
    try {
      const res = await getChat();
      setChats(res.data.Chats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllChats();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Chats</h2>

      {chats.length === 0 ? (
        <div className="w-full text-center text-gray-500 py-20 text-lg font-medium">
          🗨️ No Chats Found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-800">
                Customer: <span className="text-black">{chat.order.name}</span>
              </p>
              <p className="text-gray-700">
                Product:{' '}
                <span className="text-black">{chat.order.items[0]?.name || 'N/A'}</span>
              </p>
              <p className="text-gray-700 text-sm">
                Order ID: <span className="text-black">{chat.order._id.slice(-6)}</span>
              </p>
              <p className="text-gray-700 text-sm">Total: ₹{chat.order.totalAmount}</p>
              <button
                onClick={() => {
                  setSelectedChat(chat);
                  setChatPopupOpen(true);
                }}
                className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition text-sm"
              >
                View Chat
              </button>
            </div>
          ))}
        </div>
      )}

      {chatPopupOpen && selectedChat && (
        <ChatPopup
          chat={selectedChat}
          onClose={() => {
            setChatPopupOpen(false);
            setSelectedChat(null);
          }}
        />
      )}
    </div>
  );
};

export default Chats;
