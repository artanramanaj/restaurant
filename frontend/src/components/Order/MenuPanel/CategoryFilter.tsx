import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "@/store/categoriesApiSlice";
import { Variant, Spinner } from "@/components";
type Props = {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
};
const CategoryFilter = ({ activeCategory, setActiveCategory }: Props) => {
  const { t } = useTranslation();
  const {
    data,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetCategoriesQuery({});
  const categories = data?.categories;
  if (categoryLoading) return <Spinner />;
  if (categoryError || !categories) return <p>Something went wrong!</p>;
  const allCategories = [{ _id: "all", name: "all" }, ...(categories || [])];
  return (
    <div className="flex gap-4 flex-wrap items-start justify-start">
      {allCategories.map((c, index) => (
        <button
          key={c._id}
          onClick={() => setActiveCategory(c._id)}
          className={`rounded-full px-4 mr-1 mb-1 py-2 font-medium border border-primary transition-colors uppercase
            ${
              activeCategory === c._id
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
