import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { SellerStatusForAdmin } from '../../apis/productapi';

interface SellerType {
  _id: string;
  sellerName: string;
  avgRating: string;
  totalProducts: number;
  totalOrders: number;
  shopName: string;
  location: string;
}

const Sellers: React.FC = () => {
  const [sellers, setSellers] = useState<SellerType[]>([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await SellerStatusForAdmin();
        console.log(res.data);
        
        setSellers(res.data.sellers);
      } catch (error) {
        console.error('Failed to fetch sellers', error);
      }
    };
    fetchSellers();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Sellers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Seller Name</th>
              <th className="border border-gray-300 px-4 py-2">Rating</th>
              <th className="border border-gray-300 px-4 py-2">Total Products</th>
              <th className="border border-gray-300 px-4 py-2">Total Orders</th>
              
              
              
              
            </tr>
          </thead>

          <tbody>
            {sellers.map((seller) => (
              <tr key={seller._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 align-top">
                  {seller.sellerName}
                </td>

                <td className="border border-gray-300 px-4 py-2 align-top">
                  <div className="flex items-center gap-1">
                    {seller.avgRating} <FaStar className="text-yellow-300 text-sm" />
                  </div>
                </td>

                <td className="border border-gray-300 px-4 py-2 align-top">
                  {seller.totalProducts}
                </td>

                <td className="border border-gray-300 px-4 py-2 align-top">
                  {seller.totalOrders}
                </td>

                

                

                
              </tr>
            ))}
          </tbody>
        </table>

        {sellers.length === 0 && (
          <div className="text-center py-4 text-gray-500">No sellers found.</div>
        )}
      </div>
    </div>
  );
};

export default Sellers;
