import { Product } from "@/components/index";
import { useGetProductsQuery } from "@/store/productsApiSlice";
import { Variant, Spinner } from "@/components";
import { Paggination } from "@/components/index";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

type Props = {
  activeCategory: string;
  search: string;
};
const ProductList = ({ activeCategory, search }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const { data, isLoading, isError } = useGetProductsQuery({
    search,
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

  const debouncedSearch = useDebounce(search, 1500); // 500ms delay

  useEffect(() => {
    if (!debouncedSearch) return;

    console.log("Search API call with:", debouncedSearch);
  }, [debouncedSearch]);
  if (isLoading) return <Spinner />;
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
