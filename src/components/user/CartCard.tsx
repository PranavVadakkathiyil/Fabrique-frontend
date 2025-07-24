import { RiDeleteBinFill } from 'react-icons/ri';
import { deleteitemcart } from '../../apis/cartapi';

interface CartCardProps {
  _id: string;
  productname: string;
  image: string;
  amount: number;
  color: string;
  size: string;
  productcount: number;
  refreshCart: () => void;
}

const CartCard: React.FC<CartCardProps> = ({
  _id,
  productname,
  image,
  amount,
  color,
  size,
  productcount,
  refreshCart,
}) => {
  const DeleteCartItem = async (_id: string) => {
    try {
      const res = await deleteitemcart(_id);
      //console.log(res.data);
      refreshCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-gray-200 rounded-2xl p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 w-full h-auto sm:h-[180px]">
      {/* Product Image */}
      <img
        src={image}
        alt={productname}
        className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl bg-gray-100 border border-gray-200"
      />

      {/* Product Info */}
      <div className="flex flex-col justify-between w-full h-full">
        {/* Title & Delete */}
        <div className="flex justify-between items-start w-full">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{productname}</h2>
            <p className="text-sm text-gray-500">
              Size: <span className="text-gray-700 font-medium">{size.toUpperCase()}</span>
            </p>
            <p className="text-sm text-gray-500">
              Color: <span className="text-gray-700 font-medium capitalize">{color}</span>
            </p>
          </div>

          <button
            onClick={() => DeleteCartItem(_id)}
            className="p-2 rounded-full hover:bg-red-100 transition"
          >
            <RiDeleteBinFill className="text-xl text-red-500 hover:text-red-600" />
          </button>
        </div>

        {/* Price & Quantity */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-gray-900">₹ {amount}</p>

          <div className="bg-gray-100 border border-gray-300 px-4 py-1 rounded-full text-sm font-medium text-gray-700">
            Qty: {productcount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
