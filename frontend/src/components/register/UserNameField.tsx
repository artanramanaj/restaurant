import { FiUser } from "react-icons/fi";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { RegisterForm } from "@/validations/registerSchema";
interface Props {
  register: UseFormRegister<RegisterForm>;
  errors: FieldErrors<RegisterForm>;
}
const UserNameField = ({ register }: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Username
      </label>
      <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
        <FiUser className="text-gray-500 shrink-0" size={16} />
        <input
          {...register("username")}
          type="text"
          placeholder="johndoe"
          className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
        />
      </div>
    </div>
  );
};

export default UserNameField;
