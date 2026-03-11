import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { RegisterForm } from "@/validations/registerSchema";
interface Props {
  register: UseFormRegister<RegisterForm>;
  errors: FieldErrors<RegisterForm>;
}
const Password = ({ register, errors }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Password
      </label>
      <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-[#EB2327] focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
        <FiLock className="text-gray-500 shrink-0" size={16} />
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Min. 8 characters"
          className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Password;
