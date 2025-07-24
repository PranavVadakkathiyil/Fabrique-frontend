// src/components/Chat.tsx
import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { getMessages, sendMessage } from "../../apis/chatMessageapi";
import { io, Socket } from "socket.io-client";

interface ChatProps {
    orderId: string;
    itemName: string;
    totalAmount: number;
    chatId: string;
    onClose: () => void;
    userId: string;
}



const Chat: React.FC<ChatProps> = ({
    orderId,
    itemName,
    totalAmount,
    chatId,
    onClose,
    userId,
}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [socketconn, setsocketconn] = useState(false)
    const socketRef = useRef<Socket | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const handleSendMessage = async () => {
        if (!message.trim()) return;

        try {
            const res = await sendMessage(message, chatId);
            
            const mess = res.data.messageData.content
            const msgdata = {
                msg: res.data.messageData.content,
                chatid: chatId,
                userid: res.data.messageData.sender._id

            }
            socketRef.current?.emit('newmsg', msgdata)
            setMessages((prev) => [...prev, mess]);
            setMessage("");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await getMessages(chatId);
            setMessages(res.data.messages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_SERVER);
        socketRef.current = socket;
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });
        socket.emit("makechat", chatId)
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
    }, [orderId, chatId])
    useEffect(() => {

        fetchMessages();

    }, [messages])

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white w-full h-full sm:max-w-sm sm:h-[90vh] rounded-lg shadow-lg flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            Order #{orderId.slice(-6)}
                        </p>
                        <p className="text-xs text-gray-500">
                            Total: ₹{totalAmount} | {itemName}
                        </p>
                    </div>
                    <button onClick={onClose}>
                        <IoClose className="text-xl text-gray-600 hover:text-red-500" />
                    </button>
                </div>

                {/* Messages */}
                {/* Messages */}
                <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-white">
                    {messages.length === 0 ? (
                        <p className="text-center text-gray-400">
                            Start chatting with the store...
                        </p>
                    ) : (
                        messages.map((msg, idx) => {
                            if (!msg || !msg.content) return null;

                            const senderId = msg.sender?._id || msg.sender;
                            const isSender = senderId ? senderId === userId : true;

                            return (
                                <div
                                    key={idx}
                                    className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`px-4 py-2 max-w-[70%] rounded-lg text-sm ${isSender
                                            ? "bg-black text-white rounded-br-none"
                                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={bottomRef} /> {/* 👈 This enables smooth scroll */}
                </div>


                {/* Input */}
                <div className="p-3 border-t bg-gray-50 flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm outline-none focus:ring-2 focus:ring-black"
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

export default Chat;
