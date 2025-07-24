// src/components/ChatPopup.tsx
import React, { useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { sendMessage, getMessages } from '../../apis/chatMessageapi';
import type  { Chat } from '../../pages/seller/Chats';
import { io, Socket } from 'socket.io-client';

interface ChatPopupProps {
  chat: Chat;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ chat, onClose }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [socketconn, setsocketconn] = useState(false)
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);


  const fetchMessages = async () => {
    try {
      const res = await getMessages(chat._id);
      setMessages(res.data.messages);
      console.log(res.data.messages);
      
      setUserId(res.data.user); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chat]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const res = await sendMessage(message, chat._id);
      
      const msgdata = {
                msg: message,
                chatid: chat._id,
                userid: res.data.messageData.sender._id

            }
            socketRef.current?.emit('newmsg', msgdata)
      setMessage('');
      fetchMessages(); 
    } catch (error) {
      console.log(error);
    }
  };
 useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_SERVER);
        socketRef.current = socket;
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });
         socket.emit("makechat",chat._id)
         socket.on("connected", () => {
            setsocketconn(true)
        })
        socket.on("message received", (newMsg) => {
        console.log("Received new message via socket", newMsg);
        
        
        setMessages((prev) => [...prev, newMsg]); 
    });

       
        return () => {
            socket.disconnect();
        };
    }, [chat._id])
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white w-full h-full sm:max-w-sm sm:h-[90vh] rounded-lg shadow-lg flex flex-col overflow-hidden">
              {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Order #{chat.order._id.slice(-6)}
            </p>
            <p className="text-xs text-gray-500">
              Total: ₹{chat.order.totalAmount} |{' '}
              {chat.order.items[0]?.name || 'Product'}
            </p>
          </div>
          <button onClick={onClose}>
            <IoClose className="text-xl text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Messages */}
<div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 space-y-2">
  {messages.length === 0 ? (
    <p className="text-center text-gray-400">
      Start chatting with the customer...
    </p>
  ) : (
    <>
      {messages.map((msg, index) => {
        if (!msg || !msg.content) return null;

        const senderId = msg.sender?._id || msg.sender;
        const isSender = senderId ? senderId === userId : true;

        return (
          <div
            key={index}
            className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 max-w-[70%] rounded-lg text-sm ${
                isSender
                  ? 'bg-black text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} /> {/* 👈 Scrolls to this invisible anchor */}
    </>
  )}
</div>


        {/* Input */}
        <div className="p-3 border-t flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-1.5 border rounded-full text-sm outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-black text-white rounded-full p-2 hover:bg-gray-800"
          >
            <IoMdSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
