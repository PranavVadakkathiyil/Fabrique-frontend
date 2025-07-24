import axios from 'axios'
 const AxiosInstance = axios.create({
  baseURL: "https://fabrique-backend.vercel.app/api/v1",
  withCredentials: true,
});
export default AxiosInstance