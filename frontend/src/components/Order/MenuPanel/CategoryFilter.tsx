import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "@/store/categoriesApiSlice";
import { useGetProductsQuery } from "@/store/productsApiSlice";
const CategoryFilter = () => {
  const [active, setActive] = useState<string>("all");

  const {
    data: categories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetCategoriesQuery();

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery({
    category: active,
    page: 1,
    limit: 3,
  });

  const { t } = useTranslation();

  const getProductsByCategory = (categoryId: string) => {
    setActive(categoryId);
  };
  if (categoryLoading) return <p>Loading...</p>;
  if (categoryError || !categories) return <p>Something went wrong!</p>;
  console.log("Active category:", active);
  console.log("Products::::", products);

  console.log("check the data", categories);

  return (
    <div className="flex gap-4 flex-wrap items-start justify-start">
      {categories.map((c, index) => (
        <button
          key={index}
          onClick={() => getProductsByCategory(c._id)}
          className={`rounded-full px-4 mr-1 mb-1 py-2 font-medium border border-primary transition-colors uppercase
            ${
              active === c._id
                ? "bg-primary text-white"
                : "bg-white text-primary hover:bg-primary hover:text-white"
            }`}
        >
          {t(`categories.${[c.name]}`)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
