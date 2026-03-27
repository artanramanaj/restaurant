import { useNavigate } from "react-router-dom";
import { CreateBtn, CategoryTable, Spinner, Paggination } from "@/components";
import { useGetCategoriesQuery } from "@/store/categoriesApiSlice";
import { useState } from "react";
const DashboardCategories = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isLoading } = useGetCategoriesQuery({ page, limit });
  const categories = data?.categories || [];
  const changePage = (newPage: number) => {
    setPage(newPage);
  };
  const navigate = useNavigate();
  const navigateBtn = () => {
    navigate("/admin/categories/create");
  };

  if (isLoading) return <Spinner />;

  const head =
    categories.length > 0
      ? Object.keys(categories[0]).filter((key) => key !== "__v")
      : [];
  console.log("check categorties", categories);
  return (
    <div className="container py-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3>Categories</h3>
        <CreateBtn
          type="button"
          text="Create New Category"
          btnAction={navigateBtn}
        />
      </div>
      <CategoryTable head={head} body={categories} />

      <Paggination
        page={data?.pagination?.page}
        pages={data?.pagination?.pages}
        productLength={data?.categories.length}
        newPage={changePage}
        limit={limit}
      />
    </div>
  );
};

export default DashboardCategories;
