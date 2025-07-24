import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import CustomerReview from "../../components/user/CustomerReview";
import ReviewCard from "../../components/ReviewCard";
import TopSelling from "../../components/user/TopSelling";
import NewArrivels from "../../components/user/NewArrivels";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSingleProduct } from "../../apis/productapi";
import ProductViewLoading from "../../components/Loading/ProductViewLoading";
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { AddToCart } from "../../apis/cartapi";
import { useNavContext } from "../../context/NavContext";
interface Product {
    _id: string;
    name: string;
    price: number;
    oldprice: number;
    description: string;
    images: string[];
    colors: string[];
    sizes: string[];
}

function ProductView() {
    const { fetchUserInfo } = useNavContext();
    const [product, setproduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [productcount, setproductcount] = useState<number>(1)
    const [color, setcolor] = useState<string>("")
    const [size, setsize] = useState<string>('')
    const [search, setsearch] = useState<string>("")
    const [activeimg, setactiveimg] = useState("")

    const navigate = useNavigate()
    const { product_id } = useParams<{ product_id: string }>();
    const maxorder = 5

    const successmsg = (msg: string) => {
        toast.success(msg, {
            icon: "👏",
            style: { backgroundColor: "black", color: "white" },
        })
    }

    const errmsg = (msg: string) => {
        toast.error(msg, {
            icon: "🔥",
            style: { backgroundColor: "#d00000", color: "white" },
        })
    }


    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await GetSingleProduct(product_id!);
                setproduct(data.data.product);
                setactiveimg(data.data.product.images[0])
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [product_id]);

    const handleAddtoCart = async () => {

        if (!product) return;
        if (!size) errmsg("Please add size")
        if (!color) errmsg("Please add color")
        const payload = {
            product_id: product._id,
            size,
            color,
            count: productcount,
            amount: product.price,
        };
        try {
            const data = await AddToCart(payload)
            console.log(data.data);
            if(data.data.success){
                await fetchUserInfo()
                successmsg(data.data.message)
                navigate('/cart')

            }
            else{
                errmsg("Try Again Later")
            }

        } catch (error) {
            
                console.log("addtocarterror",error);
                
        }


    }

    if (loading || !product) return <ProductViewLoading />;

    return (
        <div className="w-full min-h-screen bg-white">
            <section className="w-full max-w-7xl mx-auto px-2 sm:px-12 py-6 flex flex-col sm:flex-row gap-4">
                {/* Image Section */}
                <aside className="sm:w-2/5 w-full h-[540px]   overflow-hidden flex flex-col justify-between">
                    <div className="w-full h-[80%] border rounded-sm border-gray-200">
                        <img
                            src={activeimg}
                            alt={product.name}
                            className="w-full h-full object-cover p-2"
                        />
                    </div>
                    <div className="w-full h-[20%] grid grid-cols-4 gap-1 p-1">
                        {product.images.slice(0, 4).map((img, i) => (
                            <div key={i} className="w-full h-full border rounded-sm border-gray-200 p-1 overflow-hidden">
                                <img src={img} onClick={()=>setactiveimg(img)} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                                
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Product Details */}
                <aside className="sm:w-3/5 w-full h-[540px] border  rounded-sm border-gray-200 p-4 flex flex-col justify-between bg-white overflow-hidden">
                    <div>
                        <p className="text-2xl sm:text-3xl font-semibold">{product.name}</p>
                        <div className="flex items-center py-2 text-lg sm:text-xl text-yellow-400">
                            {[1, 2, 3, 4].map((star) => (
                                <FaStar key={star} />
                            ))}
                            <FaStarHalfAlt />
                            <p className="ml-2 text-gray-600 text-sm">4.5</p>
                        </div>

                        <p className="text-xl sm:text-3xl flex items-center flex-wrap gap-2">
                            <span className="text-black font-bold">₹{product.price}</span>
                            <span className="text-gray-400 line-through">₹{product.oldprice}</span>
                            <span className="text-sm text-red-600 border px-2 py-1 rounded-xl bg-red-200">
                                {Math.round(((product.oldprice - product.price) / product.oldprice) * 100)}% off
                            </span>
                        </p>

                        <p className="mt-3 text-sm text-gray-700 line-clamp-4">{product.description}</p>

                        <hr className="my-3 text-gray-200" />

                        <p className="font-medium">Select Color</p>
                        <div className="flex gap-3 py-2">
                            {product.colors.map((c, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 border rounded-full cursor-pointer ${color === c ? "border-3  border-gray-700 scale-105" : "border"}`}
                                    style={{ backgroundColor: c, opacity: 0.5 }}
                                    title={c}
                                    onClick={() => setcolor(c)}

                                />
                            ))}
                        </div>

                        <hr className="my-3 text-gray-200" />

                        <p className="font-medium">Select Size</p>
                        <div className="flex gap-3 py-2">
                            {product.sizes.map((s) => (
                                <p key={s} onClick={() => setsize(s)} className={`px-4 py-2 border rounded-sm uppercase cursor-pointer ${size === s ? "border-3  border-gray-700 scale-105" : "border"}`}>
                                    {s}

                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Quantity + Add to Cart */}
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 mt-4">
                        <div className="flex w-full sm:w-1/3">
                            <button onClick={() => setproductcount(prev => Math.max(1, prev - 1))} className="bg-gray-300 px-4 py-2 rounded-l-xl w-1/3">-</button>
                            <p className="bg-gray-300 px-4 py-2 text-center w-1/3">{productcount}</p>
                            <button onClick={() => setproductcount(prev => Math.max(1, prev + 1))} disabled={productcount >= maxorder} className="bg-gray-300 px-4 py-2 rounded-r-xl w-1/3">+</button>
                        </div>
                        <button onClick={() => handleAddtoCart()} className="w-full sm:w-2/3 px-4 py-2 bg-black text-white rounded-xl">
                            Add to Cart
                        </button>
                    </div>
                </aside>
            </section>


            {/* Reviews */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {/* <ReviewCard /> */}
                </div>
            </section>

            {/* Related Sections */}
            <NewArrivels />
            <TopSelling />
        </div>
    );
}

export default ProductView;
