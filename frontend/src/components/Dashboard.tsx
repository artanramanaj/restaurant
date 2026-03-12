import { UserCard, ProductCard, OrderCard, CategoryCard } from "@/components";
import { useGetTotalUsersQuery } from "@/store/userApiSlice";
import { Spinner } from "@/components";
import { useGetTotalProductsQuery } from "@/store/productsApiSlice";
const Dashboard = () => {
  const { data, isLoading } = useGetTotalUsersQuery();
  const { data: products, isLoading: productLoading } =
    useGetTotalProductsQuery();

  if (isLoading) return <Spinner />;

  return (
    <div className="container py-8 grid grid-cols-2 gap-6">
      <UserCard count={data?.total ?? 0} />
      <ProductCard count={products?.total ?? 0} />
      <OrderCard />
      <CategoryCard />
    </div>
  );
};
export default Dashboard;
