import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useNavContext } from "../../context/NavContext";
import { getCurrentUserInfo, Logout } from "../../apis/authapi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Products", path: "/products" },
  { name: "New Arrivals", path: "/products/NewArrivels" },
  { name: "Top Sellings", path: "/products/TopSelling" },
  { name: "Accessories", path: "/products/Accessories" },
];

const UserNav = () => {
  const { userNav, setuserNav,setCartCount,cartCount,fetchUserInfo,userdata,setuserdata } = useNavContext();
  
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState<string>(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await fetchUserInfo();
        
      } catch (error) {
        console.error("Error fetching user info:", error);
       

      }
    };
    fetchInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await Logout();
      if (res.data.clearLocalStorage) {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/auth");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Search function
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products/${search}`);
    }
  };

  return (
    <nav className="w-100dvw">
      <section className="sm:text-[14px] text-[12px] w-full bg-black text-gray-400 text-center">
        <p>
          India's Fastest Online Shopping Destination{" "}
          <span className="text-gray-300 underline hover:text-gray-400">
            Shop Now
          </span>
        </p>
      </section>

      <section className="flex w-full items-center justify-evenly py-3 border-b-1">
        {/* Hamburger menu for mobile */}
        <p className="sm:hidden block">
          <GiHamburgerMenu className="text-2xl" onClick={() => setuserNav(!userNav)} />
        </p>

        {/* Logo */}
        <p className="header-logo">FABRIQUE.CO</p>

        {/* Nav links for desktop */}
        <ul className="sm:flex gap-5 sm hidden">
          {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer text-gray-600 hover:text-black transition">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* ✅ Desktop search */}
        <div className="sm:flex hidden items-center justify-between border px-6 h-10 w-96 rounded-full bg-gray-100">
          <input
            type="text"
            placeholder="Get your Fashion Now"
            className="outline-none bg-transparent w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FiSearch className="text-2xl cursor-pointer" onClick={handleSearch} />
        </div>

        {/* Icons section */}
        <ul className="flex gap-4 items-center relative">
          <li className="relative">
            <MdOutlineShoppingBag className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </li>

          {/* User dropdown or icon */}
          {userdata ? (
            <div className="relative">
              <img
                src={userdata.pic}
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 top-10 bg-white shadow-md rounded-md w-60 p-4 z-10 border border-gray-200">
                  <p className="text-sm font-medium text-gray-800">{userdata.name}</p>
                  <p className="text-xs text-gray-500">{userdata.email}</p>
                  <p className="text-xs text-gray-400 mb-3">{userdata.role}</p>

                  <div className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
                    <Link to="/order" className="hover:underline hover:text-black">
                      My Orders
                    </Link>
                    <Link to="/cart" className="hover:underline hover:text-black">
                      My Cart
                    </Link>
                  </div>

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

export default UserNav;
