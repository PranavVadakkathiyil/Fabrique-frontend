import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { useNavContext } from "../../context/NavContext";
import {  useState } from "react";

const categories = [
    { data: "T-Shirts", Link: "t-shirts" },
    { data: "Shirts", Link: "shirts" },
    { data: "Jeans", Link: "jeans" },
    { data: "Trousers", Link: "trousers" },
    { data: "Innerwear", Link: "innerwear" },
    { data: "Footwear", Link: "footwear" },
    { data: "Accessories", Link: "accessories" },
    { data: "Huddy", Link: "huddy" },
    { data: "Jackets", Link: "jackets" },
    { data: "Kurta", Link: "kurta" },
    
    
];

const NavBarMobile = () => {
      const {userNav,setuserNav} = useNavContext()
      const [search, setsearch] = useState<string>("")
      const navigate = useNavigate()
      const Searching = ()=>{
        if (search.trim()) {
      navigate(`/products/${search}`);
    }
      }
      
    
    return (
        <div className={`${userNav ? "fixed" : "hidden"}  top-0 left-0 w-full h-screen bg-white z-9999`}>
            <section className="flex items-center justify-between w-full p-4">
                <p className="header-logo">FABRIQUE.CO</p>
                <p><IoClose className="text-3xl" onClick={()=>setuserNav(!userNav)}/></p>
            </section>
            <section>
                <div className="border flex justify-between items-center p-1 m-2 rounded-full ">
                    <input onChange={(e)=>setsearch(e.target.value)} type="text" name="search" id="search" className="outline-none px-2 "/>
                    <button onClick={()=>{Searching(); setuserNav(!userNav);}}  className=" p-3 rounded-full bg-black text-white"><FiSearch/></button>
                </div>
            </section>
            <section>
                <ul>
                    {
                        categories.map((info, index) => (
                            <li key={index} className="p-3" onClick={()=>setuserNav(!userNav)}>
                                <Link to={`/products/${info.Link}`}>
                                    <p className="text-xl">{info.data}</p>
                                </Link>
                            </li>

                        ))
                    }

                </ul>
            </section>
            

        </div>
    )
}

export default NavBarMobile