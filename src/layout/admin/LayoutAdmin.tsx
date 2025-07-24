import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import NavAdminMobile from './NavAdminMobile'

const LayoutAdmin = () => {
  return (
    <>
      <AdminHeader />
      <NavAdminMobile />
      <main>
        <Outlet />
      </main>
      

    </>
  )
}

export default LayoutAdmin
