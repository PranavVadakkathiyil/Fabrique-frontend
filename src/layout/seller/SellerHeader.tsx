import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdContact } from "react-icons/io"
import { MdOutlineShoppingBag } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { useNavContext } from "../../context/NavContext"
import { getCurrentSellerInfo, Logout } from "../../apis/authapi"; 

const navLinks = [
  { name: "Dashboard", path: "/store" },
  { name: "Product Management", path: "/manageproduct" },
  { name: "Orders", path: "/orders" },
  { name: "Reviews", path: "/reviews" },
  
  { name: "Chats", path: "/chats" },
];

type SellerData = {
  pic: string;
  name:string,
  email:string,
  role:string,
  
};

const SellerHeader = () => {
  const { sellerNav, setsellerNav } = useNavContext();
  const [sellerdata, setsellerdata] = useState<SellerData | null>(null)
  const [ordercount, setordercount] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const res = await getCurrentSellerInfo();
        console.log("Seller Info:", res.data);
        setsellerdata(res.data.userdata)
        setordercount(res.data.orderCount)
      } catch (error) {
        console.error("Error fetching seller info:", error);
      }
    };

    fetchSellerInfo();
  }, []);
  const handleLogout = async () => {
  try {
    const res = await Logout()
    if (res.data.clearLocalStorage) {
      localStorage.clear();
      sessionStorage.clear();
       navigate("/auth");
    }
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  return (
    <nav className="w-100dvw">
      <section className="flex w-full items-center justify-evenly py-3 border-b-1">
        <p className="sm:hidden block">
          <GiHamburgerMenu className="text-2xl" onClick={() => setsellerNav(!sellerNav)} />
        </p>

        <p className="header-logo flex items-center gap-2">
          FABRIQUE.CO <span className="text-xl rounded-full px-3 bg-black text-white">Seller</span>
        </p>

        <ul className="sm:flex gap-5 sm hidden">
          {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer text-gray-600 hover:text-black transition">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-4 items-center relative">
  {/*<li className="flex relative">
    <MdOutlineShoppingBag className="text-2xl" />
    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {ordercount}
    </span>
  </li>*/}
  {sellerdata ? (
    <div className="relative">
      <img
        src={sellerdata.pic}
        alt="Seller"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <div className="absolute right-0 top-10 bg-white shadow-md rounded-md w-60 p-4 z-10 border border-gray-200">
          <p className="text-sm font-medium text-gray-800">{sellerdata.name}</p>
          <p className="text-xs text-gray-500">{sellerdata.email}</p>
          <p className="text-xs text-gray-400 mb-3">{sellerdata.role}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-600 text-sm hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <li>
      <IoMdContact className="text-2xl" />
    </li>
  )}
</ul>
      </section>
    </nav>
  );
};

export default SellerHeader;
