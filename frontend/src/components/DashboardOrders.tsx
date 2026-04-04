import { OrderTable, Spinner, Paggination } from "@/components";
import { useGetOrdersQuery } from "@/store/ordersApiSlice";
import { useState } from "react";

const DashboardUsers = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isLoading } = useGetOrdersQuery({ page, limit });
  console.log("Data", data);

  const orders = data?.orders || [];

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container py-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3>Orders</h3>
      </div>
      <OrderTable body={orders} />
      <Paggination
        page={data?.pagination?.page}
        pages={data?.pagination?.pages}
        productLength={orders.length}
        newPage={changePage}
        limit={limit}
      />
    </div>
  );
};

export default DashboardUsers;
