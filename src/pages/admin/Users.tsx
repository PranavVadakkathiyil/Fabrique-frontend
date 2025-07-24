import React, { useEffect, useState } from 'react';
import { UserInfoAdmin } from '../../apis/productapi'; // Adjust path if needed
import { changeRole } from '../../apis/authapi';
import toast from 'react-hot-toast';

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [rolechange, setrolechange] = useState(false)
  const handleRoleChange = async(id:string,role:string)=>{
    console.log(id,role);
    try {
      const res = await changeRole(id,role)
      console.log(res.data);

      if(res.data.success){
        toast.success("✅ Role changed")
        setrolechange(prev=>!prev)
      }
      else{
         toast.error("❌ Error on role change")
      }
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const fetchUsers = async () => {
      try {
        const res = await UserInfoAdmin();
        setUsers(res.data.users); 
        console.log(res.data.users);
        
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
  useEffect(() => {
    
    fetchUsers();
  }, [rolechange]);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 align-top">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="px-2 py-1 border rounded bg-white text-sm"
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top">{user.status}</td>
                
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
