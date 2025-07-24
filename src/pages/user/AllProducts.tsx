import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ProductCard from "../../components/user/ProductCard";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavContext } from "../../context/NavContext";
import { FilterProduct, GetAllProduct, SearchProducts } from "../../apis/productapi";
import ProductCardLoading from "../../components/Loading/ProductCardLoading";
import toast from "react-hot-toast";

interface Product {
    _id: string;
    name: string;
    price: number;
    oldprice: number;
    description: string;
    images: string[];
}

const categories = [
    { data: "T-Shirts" },
    { data: "Shirts" },
    { data: "Jeans" },
    { data: "Trousers" },
    { data: "Innerwear" },
    { data: "Footwear" },
    { data: "Accessories" },
];

const selling = [
    { data: "TopSelling" },
    { data: "NewArrivals" },
];

const AllProducts = () => {
    const [price, setPrice] = useState<string>("200");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSelling, setSelectedSelling] = useState<string>("");
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [count, setcount] = useState(0)
    const [limit, setlimit] = useState(12)
    const [page, setpage] = useState(0)
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);


    const product = useParams();
    const { filter, setfilter } = useNavContext();
    const navigate = useNavigate()

    // Fetch all products initially
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await GetAllProduct(limit,page);
                setProducts(res.data.products);
                console.log(res.data);
                console.log(limit,page);
                setpage(res.data.page)
                const totalProducts = res.data.counts;

                const totalPages = Math.ceil(totalProducts / limit);
                setcount(totalPages)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [page]);

    // Fetch searched products by route param (if any)
    useEffect(() => {
        const fetchSearchedProducts = async () => {
            try {
                setLoading(true);
                const { category } = product;
                if (category) {
                    const res = await SearchProducts(category);
                    setProducts(res.data.products);
                } else {
                    const res = await GetAllProduct(limit,page);
                    setProducts(res.data.products);
                }
            } catch (error) {
                console.log("Error fetching search results", error);
                localStorage.clear()
                navigate('/auth')
            } finally {
                setLoading(false);
            }
        };
        fetchSearchedProducts();
    }, [product]);


    const handleFilterClick = async () => {
        try {
            setLoading(true);
            const minPrice = 200;
            const maxPrice = Number(price);

            const res = await FilterProduct({
                category: selectedCategory,
                minPrice,
                maxPrice,
                rating: selectedRating ?? undefined,
                selling: selectedSelling,
            });

            if (res.data.products.length === 0) {
                toast.error("No products found with selected filters.");
                const all = await GetAllProduct(limit,page);
                setProducts(all.data.products);
            } else {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.error("Error filtering products", error);
            toast.error("Something went wrong while filtering.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className="min-h-screen">
                <section>
                    <button
                        onClick={() => setfilter(!filter)}
                        className={`${filter ? "hidden" : ""
                            } sm:hidden m-1 px-4 py-2 rounded bg-black text-white flex items-center gap-4`}
                    >
                        <GiHamburgerMenu />
                        Filter
                    </button>
                </section>

                <section className="w-screen sm:flex mt-1">
                    {/* FILTER SIDEBAR */}
                    <aside
                        className={`sm:w-1/5 w-full sm:block ${filter ? "" : "hidden"
                            } px-3 my-2 flex-col`}
                    >
                        <div className="flex w-full gap-2 justify-evenly items-center">
                            <button
                                className="px-6 py-2 rounded-md bg-black text-white"
                                onClick={async () => {
                                    setLoading(true);
                                    setSelectedCategory("");
                                    setSelectedSelling("");
                                    setSelectedRating(null);
                                    setPrice("200");
                                    try {
                                        const res = await GetAllProduct(limit,page);
                                        setProducts(res.data.products);
                                    } catch (error) {
                                        console.error("Error fetching all products", error);
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >
                                Clear
                            </button>

                            <button
                                onClick={handleFilterClick}
                                className="px-6 py-2 rounded-md bg-black text-white"
                            >
                                Filter
                            </button>
                            <p className="sm:hidden block text-3xl">
                                <IoClose onClick={() => setfilter(!filter)} />
                            </p>
                        </div>

                        {/* RATING */}
                        <div className="w-full mt-1 text-center">
                            <p>Rating</p>
                            {[5, 4].map((star) => (
                                <div
                                    key={star}
                                    className="flex items-center p-1 border border-gray-300 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSelectedRating(star)}
                                >
                                    {[...Array(star)].map((_, idx) => (
                                        <FaStar key={idx} className="text-yellow-300" />
                                    ))}
                                    <p className="ml-1">{star}</p>
                                </div>
                            ))}
                        </div>

                        {/* CATEGORY */}
                        <div className="w-full mt-1">
                            <p className="text-center">Categories</p>
                            <div className="p-1 border border-gray-300">
                                {categories.map((info, index) => (
                                    <div key={index} className="flex gap-1">
                                        <input
                                            type="radio"
                                            value={info.data}
                                            id={`cat-${info.data}`}
                                            name="categories"
                                            className="accent-black"
                                            checked={selectedCategory === info.data}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        />
                                        <label htmlFor={`cat-${info.data}`}>{info.data}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className="w-full mt-1">
                            <p className="text-center">Price Range</p>
                            <div className="flex justify-evenly p-2 gap-3 border border-gray-300">
                                <input
                                    className="accent-black w-full"
                                    type="range"
                                    name="price"
                                    id="price"
                                    min={200}
                                    max={2000}
                                    step={100}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <p>{price}</p>
                            </div>
                        </div>

                        {/* SELLING */}
                        <div className="w-full mt-1 p-1 border border-gray-300">
                            {selling.map((info, index) => (
                                <div key={index} className="flex gap-1">
                                    <input
                                        type="radio"
                                        value={info.data}
                                        id={`sell-${info.data}`}
                                        name="selling"
                                        className="accent-black"
                                        checked={selectedSelling === info.data}
                                        onChange={(e) => setSelectedSelling(e.target.value)}
                                    />
                                    <label htmlFor={`sell-${info.data}`}>{info.data}</label>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* PRODUCT GRID */}
                    <aside className="sm:w-4/5 w-full h-100dvh my-5">
                        <div className="grid sm:grid-cols-4 grid-cols-1 gap-3">
                            {
                                loading ? (
                                    Array(4).fill(null).map((_, i) => <ProductCardLoading key={i} />)
                                ) : products.length === 0 ? (
                                    <div className="w-full text-center py-10 text-gray-500">No Products Found</div>
                                ) : (
                                    products.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            _id={product._id}
                                            name={product.name}
                                            price={product.price}
                                            oldprice={product.oldprice}
                                            image={product.images[0]}
                                        />
                                    ))
                                )
                            }

                        </div>
                    </aside>
                </section>
                <section className="w-screen">
                    <div className="flex items-center justify-center mb-1 gap-1">
                        {Array.from({ length: count }).map((_, i) => (
                            <div key={i} onClick={()=>{setpage(i); window.scrollTo({ top: 0, behavior: "smooth" });}} className={`border ${page === i ? "bg-blue-200":""}  cursor-pointer border-gray-300 text-gray-700 flex items-center justify-center  w-5 h-5 rounded-full`}>{i + 1}</div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default AllProducts;
