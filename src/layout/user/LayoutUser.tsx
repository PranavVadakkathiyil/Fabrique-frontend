import { Outlet } from 'react-router-dom'
import UserNav from './UserNav'
import NavBarMobile from './NavUserMobile'
import Footer from '../Footer'

const LayoutUser = () => {
  return (
    <>
      <UserNav />
      <NavBarMobile />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default LayoutUser
