import { Outlet } from 'react-router-dom'
import SellerHeader from './SellerHeader'
import NavSellerMobile from './NavSellerMobile'

const LayoutSeller = () => {
  return (
    <>
      <SellerHeader />
      <NavSellerMobile />
      <main>
        <Outlet />
      </main>
      
    </>
  )
}

export default LayoutSeller
