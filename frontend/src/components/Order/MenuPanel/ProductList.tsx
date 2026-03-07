import { Product } from "@/components/index";
import { useGetProductsQuery } from "@/store/productsApiSlice";
import { Variant, Spinner } from "@/components";
import { Paggination } from "@/components/index";
import { useEffect, useState } from "react";
type Props = {
  activeCategory: string;
};
const ProductList = ({ activeCategory }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const { data, isLoading, isError } = useGetProductsQuery({
    category: activeCategory,
    page,
    limit,
  });

  const changePage = (newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);
  if (isLoading) return <Spinner />;
  if (isError || !data || data.products.length === 0)
    return <Variant message="No Products" variant="danger" />;

  console.log("products", data);

  return (
    <>
      <div className="grid grid-cols-2 gap-y-5 md:gap-y-10 gap-x-10 md:gap-x-20 md:grid-cols-3">
        {data.products.map((product: any) => (
          <Product key={product._id} {...product} />
        ))}
      </div>
      <Paggination
        page={page}
        limit={limit}
        pages={data.pagination.pages}
        newPage={changePage}
        productLength={data.products.length}
      />
    </>
  );
};

export default ProductList;
