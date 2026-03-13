import { ProductTable, Spinner, CreateBtn } from "@/components";
import { useGetProductsAdminQuery } from "@/store/productsApiSlice";
import { Paggination } from "@/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DashboardProducts = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isLoading } = useGetProductsAdminQuery({ page, limit });
  const products = data?.products || [];
  console.log("data", data);
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;

  const head = products.length > 0 ? Object.keys(products[0]) : [];
  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const navigateBtn = () => {
    navigate("/admin/products/create");
  };

  return (
    <div className="container py-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3>Products</h3>
        <CreateBtn
          type="button"
          text="Create New Product"
          btnAction={navigateBtn}
        />
      </div>
      <ProductTable head={head} body={products} />
      <Paggination
        page={data?.pagination?.page}
        pages={data?.pagination?.pages}
        productLength={data?.products.length}
        newPage={changePage}
        limit={limit}
      />
    </div>
  );
};

export default DashboardProducts;
