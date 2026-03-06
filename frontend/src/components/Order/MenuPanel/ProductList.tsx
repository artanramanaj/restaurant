import { Product } from "@/components/index";
import { useGetProductsQuery } from "@/store/productsApiSlice";

const ProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery({
    category: "all",
    page: 1,
    limit: 6,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong!</p>;

  console.log("products", data.products);

  return (
    <div className="grid grid-cols-2 gap-y-5 md:gap-y-10 gap-x-10 md:gap-x-20 md:grid-cols-3">
      {data.products.map((product: any) => (
        <Product key={product._id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
