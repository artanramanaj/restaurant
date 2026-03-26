import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CategoryForm } from "@/validations/categorySchema";

interface Props {
  register: UseFormRegister<CategoryForm>;
  errors: FieldErrors<CategoryForm>;
}

const CategoryNameField = ({ register, errors }: Props) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
      Category Name
    </label>
    <div
      className={`flex items-center bg-lightblack border rounded-xl px-4 gap-3 focus-within:shadow-[0_0_0_3px_#EB232720] transition-all ${errors.name ? "border-red-500" : "border-white/10 focus-within:border-[#EB2327]"}`}
    >
      <input
        {...register("name")}
        type="text"
        placeholder="e.g. Pizza"
        className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
      />
    </div>
    {errors.name && (
      <p className="text-red-500 text-xs">{errors.name.message}</p>
    )}
  </div>
);

export default CategoryNameField;
