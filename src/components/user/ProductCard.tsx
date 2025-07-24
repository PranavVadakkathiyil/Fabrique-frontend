import { Link } from 'react-router-dom';
import discount from '../../constents/Offer'
interface ProductCardProps {
  _id:string,
  name: string;
  price: number;
  oldprice: number;
  image: string;
}
const ProductCard: React.FC<ProductCardProps> = ({ _id,name, price, oldprice, image }) => {
  const Discount =  discount(price,oldprice)
  return (
    <>
      <Link to={`/product/${_id}`}>
      <section className='col-span-1 border border-gray-100 flex flex-col '>

        <img src={image} alt="img" className=' w-full  bg-gray-100 rounded-xl p-1 ' />

        <div className='w-full font-text  text-center p-3'>
          <p className='text-xl '>{name}</p>
          
          <p className=''><span className='mr-3'> $ {price}</span><span className='mr-3 line-through'>$ {oldprice}</span><span
          className={`text-[12px] border ${
            Discount > 20
              ? 'text-green-600 border-green-200 bg-green-100'
              : 'text-red-600 border-red-200 bg-red-100'                                 
          } px-2 py-1 rounded`}
        >
          {Discount}% off
        </span> </p>
        </div>
        
      </section>
      </Link>

    </>
  )
}

export default ProductCard