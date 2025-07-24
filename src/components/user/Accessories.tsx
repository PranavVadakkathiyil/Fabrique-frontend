import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { GetAccessories } from '../../apis/productapi'
import ProductCardLoading from '../Loading/ProductCardLoading'
interface Product {
  _id: string;
  name: string;
  price: number;
  oldprice: number;
  description: string;
  images: string[];
}
const Accessories = () => {
  const [products, setproducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProduct = async()=>{
      try {
        const data = await GetAccessories()
      //console.log(data);
      setproducts(data.data.products)
      } catch (error) {
        console.log(error);
        
      }
      finally {
        setLoading(false)
      }
      

    }
    getProduct()
  }, [])
  return (
    <section className="text-center px-4 sm:px-12 py-8 space-y-8">
  <p className="font-text text-3xl sm:text-4xl font-semibold tracking-wide">ACCESSORIES</p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    {loading
          ? Array(4).fill(null).map((_, i) => <ProductCardLoading key={i} />)
          : products.map(product => (
              <ProductCard
                key={product._id}
                _id={product._id}
                name={product.name}
                price={product.price}
                oldprice={product.oldprice}
                image={product.images[0]}
              />
            ))}
            
  </div>

  <div className="pt-6">
    <button className="border border-gray-300 px-14 py-3 text-base sm:text-lg font-semibold font-text rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out">
      View All
    </button>
  </div>

  <hr className="h-px mx-auto w-3/4 bg-gray-200 border-0" />
</section>

  )
}

export default Accessories