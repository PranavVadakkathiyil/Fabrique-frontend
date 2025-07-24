import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { GetSellerProduct } from '../../apis/productapi';
interface Product {
  _id: string;
  name: string;
  images: string[];
  colors: string[];
  sizes: string[];
  totalStock: number;
}
const ProductManage: React.FC = () => {
  const navigate = useNavigate()
  const [products, setproducts] = useState<Product[]>([])
  useEffect(() => {
    const loadproduct = async()=>{
      try {
        const data = await GetSellerProduct()
      console.log(data.data);
      const Products = data.data.products
      setproducts(Products)
      } catch (err) {
        console.log(err);
        
      }
      
    }
    loadproduct()
    
    
  }, [])
  

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
    <div>
        <button onClick={()=>navigate('/addproduct')} className='flex gap-3 px-6 py-1 m-1 bg-black text-white rounded-sm'>Add Product<IoMdAdd className='text-2xl '/></button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Images</th>
            <th className="border border-gray-300 px-4 py-2">Colors</th>
            <th className="border border-gray-300 px-4 py-2">Sizes</th>
            <th className="border border-gray-300 px-4 py-2">Total Stock</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>

          {products.map((product) => (
              <tr className="hover:bg-gray-50" key={product._id}>
                <td className="border border-gray-300 px-4 py-2 align-top">{product.name}</td>
                <td className="border  border-gray-300 px-4 py-2 flex flex-wrap gap-2">
                  {product.images.map((img, idx) => (
                    
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name} image ${idx + 1}`}
                      className="w-12 h-12 object-cover rounded bg-gray-200 p-1"
                    />
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top uppercase">{product.colors.join(', ')}</td>
                <td className="border border-gray-300 px-4 py-2 align-top uppercase">{product.sizes.join(', ')}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">{product.totalStock}</td>
                <td className="border border-gray-300 px-4 py-2  space-x-2 ">
                  <button
                    className="bg-black m-1 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => alert(`Edit ${product.name}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-black m-1 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => alert(`Delete ${product.name}`)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
      </table>
    </div>
    </div>
  );
};

export default ProductManage;
