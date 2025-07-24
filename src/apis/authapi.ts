import axios from "./axios";
 const registerUser = async(formData:FormData)=>{
    return axios.post('/user/register',formData)
}
 const loginUser = async(data:{email:string,password:string})=>{
    return axios.post('/user/login',data)
}
const validateUser = async () => {
    return axios.get('/user/validate')
}

const getCurrentSellerInfo = async () => {
    return axios.get('/user/sellerdata')
}

const getCurrentUserInfo = async () => {
    return axios.get('/user/userdata')
}


const Logout = async () => {
    return axios.post('/user/logout')
}
const changeRole = async (id:string,role:string) => {
    return axios.post('/user/rolechange',{id,role})
}



export {registerUser,loginUser,validateUser,getCurrentUserInfo,Logout,getCurrentSellerInfo,changeRole}