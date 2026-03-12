import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { VerifyForm } from "@/validations/verifySchema";

interface Props {
  register: UseFormRegister<VerifyForm>;
  errors: FieldErrors<VerifyForm>;
}

const CodeField = ({ register, errors }: Props) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
      Verification Code
    </label>
    <div
      className={`flex items-center bg-[#242424] border rounded-xl px-4 gap-3 focus-within:shadow-[0_0_0_3px_#EB232720] transition-all ${errors.code ? "border-red-500" : "border-white/10 focus-within:border-[#EB2327]"}`}
    >
      <input
        {...register("code")}
        type="number"
        placeholder="Enter 6 digit code"
        className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
      />
    </div>
    {errors.code && (
      <p className="text-red-500 text-xs">{errors.code.message}</p>
    )}
  </div>
);

export default CodeField;
