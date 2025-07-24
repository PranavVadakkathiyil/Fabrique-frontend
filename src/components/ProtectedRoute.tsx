import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  allowedRoles: string[]; 
}


const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
   
  
  const token = localStorage.getItem('token') 
  const userRole = localStorage.getItem('role') 

  
  if (!token) {
    return <Navigate to="/auth" replace />
  }

 
  if (!allowedRoles.includes(userRole || '')) {
    return <Navigate to="/auth" replace />
  }
   
  
  return <Outlet />
}

export default ProtectedRoute
