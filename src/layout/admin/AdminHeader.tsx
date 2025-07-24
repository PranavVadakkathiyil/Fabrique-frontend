import { useEffect, useState } from "react";
import { IoMdContact } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useNavContext } from "../../context/NavContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { getCurrentUserInfo, Logout } from "../../apis/authapi"; // Make sure these APIs exist

const navLinks = [
  { name: "Dashboard", path: "/admin" },
  { name: "Product Management", path: "/manage_product" },
  { name: "Seller Management", path: "/manage_seller" },
  { name: "User Management", path: "/manage_user" },
  { name: "Coupons", path: "/coupons" },
];

type AdminData = {
  pic: string;
  name: string;
  email: string;
  role: string;
};

const AdminHeader = () => {
  const { adminNav, setadminNav } = useNavContext();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const res = await getCurrentUserInfo(); // Should return { admin: {...} }
        setAdminData(res.data.userdata);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchAdminInfo();
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

  return (
    <nav className="w-100dvw">
      <section className="flex w-full items-center justify-evenly py-3 border-b-1">
        <p className="sm:hidden block">
          <GiHamburgerMenu className="text-2xl" onClick={() => setadminNav(!adminNav)} />
        </p>

        <p className="header-logo flex items-center gap-2">
          FABRIQUE.CO <span className="text-xl rounded-full px-3 bg-black text-white">Admin</span>
        </p>

        <ul className="sm:flex gap-5 sm hidden">
          {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer text-gray-600 hover:text-black transition">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-4 items-center relative">
          {adminData ? (
            <div className="relative">
              <img
                src={adminData.pic}
                alt="Admin"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 top-10 bg-white shadow-md rounded-md w-60 p-4 z-10 border border-gray-200">
                  <p className="text-sm font-medium text-gray-800">{adminData.name}</p>
                  <p className="text-xs text-gray-500">{adminData.email}</p>
                  <p className="text-xs text-gray-400 mb-3">{adminData.role}</p>
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

export default AdminHeader;
