import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ProductForm } from "@/validations/productSchema";

interface Props {
  register: UseFormRegister<ProductForm>;
  errors: FieldErrors<ProductForm>;
}

const ProductPriceField = ({ register, errors }: Props) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
      Price
    </label>
    <div
      className={`flex items-center bg-lightblack border rounded-xl px-4 gap-3 focus-within:shadow-[0_0_0_3px_#EB232720] transition-all ${errors.price ? "border-red-500" : "border-white/10 focus-within:border-[#EB2327]"}`}
    >
      <span className="text-gray-500 text-sm">$</span>
      <input
        {...register("price")}
        type="number"
        step="0.01"
        placeholder="0.00"
        className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
      />
    </div>
    {errors.price && (
      <p className="text-red-500 text-xs">{errors.price.message}</p>
    )}
  </div>
);

export default ProductPriceField;
