import { UserCard, ProductCard, OrderCard } from "@/components";
const Dashboard = () => {
  return (
    <div className=" p-8 grid grid-cols-3 gap-6">
      {" "}
      <UserCard />
      <ProductCard />
      <OrderCard />
    </div>
  );
};

export default Dashboard;
