import React, { createContext, useState,useContext } from "react";
import { getCurrentUserInfo } from "../apis/authapi";
import { useNavigate } from "react-router-dom";

type NavContextType = {
    userNav: boolean;
    setuserNav: React.Dispatch<React.SetStateAction<boolean>>;
    sellerNav: boolean;
    setsellerNav: React.Dispatch<React.SetStateAction<boolean>>;
    adminNav: boolean;
    setadminNav: React.Dispatch<React.SetStateAction<boolean>>;
    filter:boolean;
    setfilter:React.Dispatch<React.SetStateAction<boolean>>
    cartCount:number;
    setCartCount:React.Dispatch<React.SetStateAction<number>>
    fetchUserInfo: () => Promise<void>;
    
    userdata:any
    setuserdata:React.Dispatch<React.SetStateAction<any>>;

};

export const NavContext = createContext<NavContextType | undefined>(undefined);

type ContextProps = {
    children: React.ReactNode;
};

export const NavContextProvider = ({ children }: ContextProps) => {
    const [userNav, setuserNav] = useState(false);
    const [sellerNav, setsellerNav] = useState(false);
    const [adminNav, setadminNav] = useState(false);
    const [filter, setfilter] = useState(false);
    
    const [cartCount, setCartCount] = useState<number>(0);
    const [userdata, setuserdata] = useState<any>(null);
    const navigate = useNavigate()
    const fetchUserInfo = async () => {
    try {
      const res = await getCurrentUserInfo(); 
      setCartCount(res.data.cartCount);
      console.log("hi",res.data);
      setuserdata(res.data.userdata)
      
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
     
        localStorage.clear()
        navigate('/auth')

    }
  };
    return (
        <NavContext.Provider
            value={{
                userNav,
                setuserNav,
                sellerNav,
                setsellerNav,
                adminNav,
                setadminNav,
                filter,
                setfilter,
                cartCount,
                setCartCount,
                fetchUserInfo,
                userdata,
                setuserdata,
            }}
        >
            {children}
        </NavContext.Provider>
    );
}; 


export const useNavContext = ()=>{
    const context = useContext(NavContext)
    if(context === undefined){
        throw new Error("Context error occured");
        
    }
    return context
} 
