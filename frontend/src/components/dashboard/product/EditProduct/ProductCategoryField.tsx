import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ProductForm } from "@/validations/productSchema";
import { useGetCategoriesQuery } from "@/store/categoriesApiSlice";

interface Props {
  register: UseFormRegister<ProductForm>;
  errors: FieldErrors<ProductForm>;
  category: string;
}

const ProductCategoryField = ({ register, errors, category }: Props) => {
  console.log("category", category);
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Category
      </label>
      <div
        className={`flex items-center bg-lightblack border rounded-xl px-4 gap-3 focus-within:shadow-[0_0_0_3px_#EB232720] transition-all ${errors.category ? "border-red-500" : "border-white/10 focus-within:border-[#EB2327]"}`}
      >
        <select
          {...register("category")}
          className="flex-1 bg-transparent py-3 text-sm text-white outline-none cursor-pointer"
          defaultValue={category}
        >
          <option value="" disabled className="bg-lightblack">
            {isLoading ? "Loading..." : "Select a category"}
          </option>
          {categories?.map((cat: { _id: string; name: string }) => (
            <option key={cat._id} value={cat._id} className="bg-lightblack">
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {errors.category && (
        <p className="text-red-500 text-xs">{errors.category.message}</p>
      )}
    </div>
  );
};

export default ProductCategoryField;
