import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ProductForm } from "@/validations/productSchema";

interface Props {
  register: UseFormRegister<ProductForm>;
  errors: FieldErrors<ProductForm>;
}

const ProductImageField = ({ register, errors }: Props) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
      Image
    </label>
    <div
      className={`flex items-center bg-[#242424] border rounded-xl px-4 gap-3 focus-within:shadow-[0_0_0_3px_#EB232720] transition-all ${errors.image ? "border-red-500" : "border-white/10 focus-within:border-[#EB2327]"}`}
    >
      <input
        {...register("image")}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        className="flex-1 bg-transparent py-3 text-sm text-white outline-none file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#EB2327] file:text-white file:text-xs file:cursor-pointer"
      />
    </div>
    {errors.image && (
      <p className="text-red-500 text-xs">{errors.image.message}</p>
    )}
  </div>
);

export default ProductImageField;
