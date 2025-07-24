import axios from "./axios";
const AddProducts = async (formData: FormData) => {
  return axios.post("/product/addproduct", formData);
};
const GetAllProduct = async (limit: number, page: number) => {
  return axios.get("/product/allproducts", {
    params: { limit, page },
  });
};
const GetSellerProduct = async () => {
  return axios.get("/product/sellerproduct");
};
const GetSingleProduct = async (product_id: string) => {
  return axios.get("/product/singleproduct", {
    params: { id: product_id },
  });
};
const TopSellingProduct = async () => {
  return axios.get("/product/topselling");
};
const NewArrivelsProduct = async () => {
  return axios.get("/product/newarrivel");
};
const GetAccessories = async () => {
  return axios.get("/product/accessories");
};

const SearchProducts = async (search: string) => {
  return axios.get("/product/search", {
    params: { q: search },
  });
};

const FilterProduct = async ({
  category,
  minPrice,
  maxPrice,
  rating,
  selling,
}: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  selling?: string;
}) => {
  return axios.get("/product/filter", {
    params: {
      category,
      minPrice,
      maxPrice,
      rating,
      selling,
    },
  });
};
const CategoryCount = async () => {
  return axios.get("/product/categorycount");
};

const StatusForAdmin = async () => {
  return axios.get("/product/getstatsadmin");
};

const SellerStatusForAdmin = async () => {
  return axios.get("/product/sellerinfoadmin");
};

const ProductInfoAdmin = async () => {
  return axios.get("/product/productinfoadmin");
};

const UserInfoAdmin = async () => {
  return axios.get("/product/getalluserinfoadmin");
};



export {
  AddProducts,
  GetAllProduct,
  GetSellerProduct,
  TopSellingProduct,
  NewArrivelsProduct,
  GetAccessories,
  GetSingleProduct,
  SearchProducts,
  FilterProduct,
  CategoryCount,
  StatusForAdmin,
  SellerStatusForAdmin,
  ProductInfoAdmin,
  UserInfoAdmin,
};
