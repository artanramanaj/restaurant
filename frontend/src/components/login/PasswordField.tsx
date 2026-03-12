import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { LoginForm } from "@/validations/loginSchema";

interface Props {
  register: UseFormRegister<LoginForm>;
  errors: FieldErrors<LoginForm>;
}

const PasswordField = ({ register, errors }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Password
        </label>
        <span className="text-xs text-[#EB2327] hover:underline cursor-pointer font-medium">
          Forgot password?
        </span>
      </div>
      <div
        className={`flex items-center bg-[#242424] border rounded-xl px-4 gap-3 focus-within:shadow-[0_0_0_3px_#EB232720] transition-all ${errors.password ? "border" : "border-white/10 focus-within:border-[#EB2327]"}`}
      >
        <FiLock className="text-gray-500 shrink-0" size={16} />
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Your password"
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
      {errors.password && (
        <p className="text-primary text-xs">{errors.password.message}</p>
      )}
    </div>
  );
};

export default PasswordField;
