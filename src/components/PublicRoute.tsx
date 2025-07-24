import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateUser } from '../apis/authapi';

const PublicRoute = () => {
  const [roles, setRoles] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const ValidateUser = async () => {
      try {
        const res = await validateUser();
        const role = res.data.user?.role;
        const token = res.data.accesstoken
        console.log(role);
        console.log(token);
        
        localStorage.setItem("role",role)
        localStorage.setItem("token",token)
        setRoles(role)

        
        console.log("Validation success:", res.data.success);
      } catch (error) {
        localStorage.clear();
        console.log(error);
        setRoles("")
        
      }
      finally {
        setLoading(false); 
      }
    };

    ValidateUser();
  }, []);
  if (loading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}


  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role) {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'seller') return <Navigate to="/store" replace />;
    if (role === 'user') return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
