import React, { useEffect, useState } from 'react';
import { ProductInfoAdmin } from '../../apis/productapi';

interface ProductType {
  _id: string;
  name: string;
  images: string;
  colors: string[];
  sizes: string[];
  totalStock: number;
  avgRating: string;
  reviewCount: number;
  seller: any;
  orderCount: number;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductInfoAdmin();
        setProducts(res.data.products);
        console.log(res.data);

      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Colors</th>
              <th className="border border-gray-300 px-4 py-2">Sizes</th>
              <th className="border border-gray-300 px-4 py-2">Total Stock</th>
              
              <th className="border border-gray-300 px-4 py-2">Seller</th>
              
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded bg-gray-200 p-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">
                  {product.colors.join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top">
                  {product.sizes.join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top">{product.totalStock}</td>
                
                <td className="border border-gray-300 px-4 py-2 align-top">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.seller.pic}
                      alt={product.seller.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div className="text-sm leading-tight">
                      <div className="font-semibold text-gray-800">{product.seller.name}</div>
                      <div className="text-gray-500 text-xs truncate max-w-[120px]">{product.seller.email}</div>
                    </div>
                  </div>
                </td>

                
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
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

export default ProductPage;
