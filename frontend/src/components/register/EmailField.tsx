import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { RegisterForm } from "@/validations/registerSchema";
import { FiMail } from "react-icons/fi";
interface Props {
  register: UseFormRegister<RegisterForm>;
  errors: FieldErrors<RegisterForm>;
}

const EmailField = ({ register, errors }: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Email Address
      </label>
      <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
        <FiMail className="text-gray-500 shrink-0" size={16} />
        <input
          {...register("email")}
          type="email"
          placeholder="john@example.com"
          className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
        />
      </div>
      {errors.email && (
        <p className="text-primary text-xs">{errors.email.message}</p>
      )}
    </div>
  );
};

export default EmailField;
