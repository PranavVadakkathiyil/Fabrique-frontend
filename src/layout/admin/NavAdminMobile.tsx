import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useNavContext } from "../../context/NavContext";

const navLinks = [
  { name: "Dashboard", path: "/admin" },
  { name: "Product Management", path: "/manage_product" },
  { name: "Seller Management", path: "/manage_seller" },
  { name: "User Management", path: "/manage_user" },
  { name: "Coupons", path: "/coupons" },
  
];

const NavAdminMobile = () => {
      const {adminNav,setadminNav} = useNavContext()
    
    return (
        <div className={`${adminNav ? "fixed" : "hidden"}  top-0 left-0 bottom-0 w-full h-100dvh bg-white z-9999`}>
            <section className="flex items-center justify-between w-full p-4">
                <p className="header-logo">FABRIQUE.CO</p>
                <p><IoClose className="text-3xl" onClick={()=>setadminNav(!adminNav)}/></p>
            </section>
            
            <section>
                <ul>
                    {
                        navLinks.map((info, index) => (
                            <li key={index} className="p-3" onClick={()=>setadminNav(!adminNav)}>
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

export default NavAdminMobile