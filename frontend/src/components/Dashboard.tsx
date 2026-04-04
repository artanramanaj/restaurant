import { UserCard, ProductCard, OrderCard, CategoryCard } from "@/components";
import { useGetTotalUsersQuery } from "@/store/userApiSlice";
import { Spinner } from "@/components";
import { useGetTotalProductsQuery } from "@/store/productsApiSlice";
import { useGetTotalCategoriesQuery } from "@/store/categoriesApiSlice";
import { useGetTotalOrdersQuery } from "@/store/ordersApiSlice";

const Dashboard = () => {
  const { data, isLoading } = useGetTotalUsersQuery();
  const { data: products, isLoading: productLoading } =
    useGetTotalProductsQuery();
  const { data: categories, isLoading: categoryLoading } =
    useGetTotalCategoriesQuery();
  const { data: orders, isLoading: orderLoading } = useGetTotalOrdersQuery();

  if (isLoading || productLoading || categoryLoading || orderLoading)
    return <Spinner />;

  return (
    <div className="container py-8 grid grid-cols-2 gap-6">
      <UserCard count={data?.total ?? 0} />
      <ProductCard count={products?.total ?? 0} />
      <OrderCard count={orders?.total ?? 0} />
      <CategoryCard count={categories?.total ?? 0} />
    </div>
  );
};
export default Dashboard;
