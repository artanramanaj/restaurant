import { Product } from "@/components/index";
import { useGetProductsQuery } from "@/store/productsApiSlice";
import { Variant, Spinner } from "@/components";
import { Paggination } from "@/components/index";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

type Props = {
  activeCategory: string;
  search: string;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
};
const ProductList = ({
  activeCategory,
  search,
  isTyping,
  setIsTyping,
}: Props) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const debouncedSearch = useDebounce(search, 800);
  const { data, isLoading, isError } = useGetProductsQuery({
    search: debouncedSearch,
    category: activeCategory,
    page,
    limit,
  });

  useEffect(() => {
    setIsTyping(false);
  }, [debouncedSearch]);

  const changePage = (newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    setPage(1);
  }, [activeCategory, debouncedSearch]);

  if (isLoading || isTyping) return <Spinner />;
  if (isError || !data || data.products.length === 0)
    return <Variant message="No Products" variant="danger" />;

  console.log("products", data.products);

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
