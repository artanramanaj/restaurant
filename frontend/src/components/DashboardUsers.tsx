import { useNavigate } from "react-router-dom";
import { UserTable, Spinner, Paggination, CreateBtn } from "@/components";
import { useGetUsersQuery } from "@/store/userApiSlice";
import { useState } from "react";

const DashboardUsers = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isLoading } = useGetUsersQuery({ page, limit });
  const navigate = useNavigate();

  const users = data?.users || [];

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <Spinner />;

  const excludedFields = [
    "__v",
    "verificationCode",
    "verificationCodeExpires",
    "resetPasswordToken",
    "resetPasswordExpires",
  ];
  const head =
    users.length > 0
      ? Object.keys(users[0]).filter((key) => !excludedFields.includes(key))
      : [];

  const navigateBtn = () => {
    navigate("/admin/users/create");
  };

  return (
    <div className="container py-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3>Users</h3>
        <CreateBtn
          type="button"
          text="Create New User"
          btnAction={navigateBtn}
        />
      </div>
      <UserTable head={head} body={users} />
      <Paggination
        page={data?.pagination?.page}
        pages={data?.pagination?.pages}
        productLength={users.length}
        newPage={changePage}
        limit={limit}
      />
    </div>
  );
};

export default DashboardUsers;
