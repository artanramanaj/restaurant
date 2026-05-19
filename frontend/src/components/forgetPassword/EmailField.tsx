import { FiMail } from "react-icons/fi";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ForgetPasswordForm } from "@/validations/forgetPasswordSchema";

interface Props {
  register: UseFormRegister<ForgetPasswordForm>;
  errors: FieldErrors<ForgetPasswordForm>;
}

const EmailField = ({ register, errors }: Props) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
      Email Address
    </label>
    <div
      className={`flex items-center gap-3 rounded-xl border bg-[#242424] px-4 transition-all focus-within:shadow-[0_0_0_3px_#EB232720] ${errors.email ? "border-primary" : "border-white/10 focus-within:border-[#EB2327]"}`}
    >
      <FiMail className="shrink-0 text-gray-500" size={16} />
      <input
        {...register("email")}
        type="email"
        placeholder="john@example.com"
        className="flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-600"
      />
    </div>
    {errors.email && (
      <p className="text-xs text-primary">{errors.email.message}</p>
    )}
  </div>
);

export default EmailField;
