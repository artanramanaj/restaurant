import { UserCard, ProductCard, OrderCard, CategoryCard } from "@/components";
import { useGetTotalUsersQuery } from "@/store/userApiSlice";
import { Spinner } from "@/components";
const Dashboard = () => {
  const { data, isLoading } = useGetTotalUsersQuery();

  if (isLoading) return <Spinner />;

  return (
    <div className="container py-8 grid grid-cols-2 gap-6">
      <UserCard count={data?.total ?? 0} />
      <ProductCard />
      <OrderCard />
      <CategoryCard />
    </div>
  );
};
export default Dashboard;
