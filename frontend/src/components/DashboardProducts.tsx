import { GeneralTable, Spinner } from "@/components";
import { useGetProductsAdminQuery } from "@/store/productsApiSlice";

const DashboardProducts = () => {
  const { data, isLoading } = useGetProductsAdminQuery();

  const products = data?.products || [];

  if (isLoading) return <Spinner />;

  const head = products.length > 0 ? Object.keys(products[0]) : [];

  return (
    <div className="container py-8">
      <GeneralTable head={head} body={products} />
    </div>
  );
};

export default DashboardProducts;
