import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useNavContext } from "../../context/NavContext";

const navLinks = [
  { name: "Dashboard", path: "/store" },
  { name: "Product Management", path: "/manageproduct" },
  { name: "Orders", path: "/orders" },
  { name: "Reviews", path: "/reviews" },
 
  { name: "Chats", path: "/chats" },
];

const NavSellerMobile = () => {
      const {sellerNav,setsellerNav} = useNavContext()
    
    return (
        <div className={`${sellerNav ? "fixed" : "hidden"}  top-0 left-0 bottom-0 w-full h-100dvh bg-white z-9999`}>
            <section className="flex items-center justify-between w-full p-4">
                <p className="header-logo">FABRIQUE.CO</p>
                <p><IoClose className="text-3xl" onClick={()=>setsellerNav(!sellerNav)}/></p>
            </section>
            <section>
                <div className="border flex justify-between items-center p-1 m-2 rounded-full">
                    <input type="text" name="search" id="search" className="outline-none px-2"/>
                    <button className=" p-3 rounded-full bg-black text-white"><FiSearch/></button>
                </div>
            </section>
            <section>
                <ul>
                    {
                        navLinks.map((info, index) => (
                            <li key={index} className="p-3" onClick={()=>setsellerNav(!sellerNav)}>
                                <Link to={`${info.path}`}>
                                    <p className="text-xl">{info.name}</p>
                                </Link>
                            </li>

                        ))
                    }

                </ul>
            </section>
            

        </div>
    )
}

export default NavSellerMobile