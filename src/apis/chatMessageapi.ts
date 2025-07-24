import axios from "./axios"; 

const createChat = async (storeId:string,orderId:string) => {
  return axios.post("/chat/createchat",{storeId,orderId});
};
const getChat = async () => {
  return axios.get("/chat/getchat");
};
const getMessages = async (chatId:string) => {
  return axios.get("/message",{
    params: { chatId },
  });
};
const sendMessage = async (message:string,chatId:string) => {
  return axios.post("/message",{content:message,chatId});
};




export {createChat,getMessages,sendMessage,getChat}