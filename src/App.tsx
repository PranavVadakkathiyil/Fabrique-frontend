import { Route, Routes } from 'react-router-dom'
import UserHome from './pages/user/UserHome'
import AllProducts from './pages/user/AllProducts'
import ProductView from './pages/user/ProductView'
import Cart from './pages/user/Cart'
import CheckOut from './pages/user/CheckOut'
import OrdersList from './pages/user/Order'
import StoreHome from './pages/seller/StoreHome'
import ProductManage from './pages/seller/ProductManage'
import Order from './pages/seller/Orders'
import Reviews from './pages/seller/Reviews'
import Chats from './pages/seller/Chats'
import AdminHome from './pages/admin/AdminHome'
import Products from './pages/admin/Products'
import Users from './pages/admin/Users'
import Sellers from './pages/admin/Sellers'
import AllReviews from './pages/admin/AllReviews'
import LayoutUser from './layout/user/LayoutUser'
import LayoutSeller from './layout/seller/LayoutSeller'
import LayoutAdmin from './layout/admin/LayoutAdmin'
import NotFound from './pages/NotFound'
import { Auth } from './pages/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import {Toaster} from 'react-hot-toast'
import PublicRoute from './components/PublicRoute'
import AddProduct from './components/seller/AddProduct'
import ScrollToTop from './components/ScrollerTop'
import Coupon from './pages/admin/Coupon'
import Invoice from './components/user/Invoice'
const App = () => {
  return (
    <>
      <Toaster/>
      <ScrollToTop/>
      <Routes >
        <Route element={<PublicRoute/>}>
          <Route path="/auth" element={<Auth/>} />
        </Route>
        
        {/* USER ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route element={<LayoutUser />}>
          <Route path="/" element={<UserHome />} />
          <Route path="/products/:category" element={<AllProducts />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:product_id" element={<ProductView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order" element={<OrdersList />} />
          <Route path="/invoice" element={<Invoice />} />
        </Route>
        </Route>

        {/* SELLER ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
        <Route element={<LayoutSeller />}>
          <Route path="/store" element={<StoreHome />} />
          <Route path="/manageproduct" element={<ProductManage />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/addproduct" element={<AddProduct />} />
          
           


        </Route>
        </Route>
        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<LayoutAdmin />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/manage_product" element={<Products />} />
          <Route path="/manage_user" element={<Users />} />
          <Route path="/manage_seller" element={<Sellers />} />
          <Route path="/reviews/:_id" element={<AllReviews />} />
          <Route path="/coupons" element={<Coupon/>} />
        </Route>
        </Route>
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </>

  )
}

export default App