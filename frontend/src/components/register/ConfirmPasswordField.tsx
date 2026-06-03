import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { RegisterForm } from "@/validations/registerSchema";
import { useTranslation } from "react-i18next";
interface ConfirmPasswordProps {
  showConfirm: boolean;
  setShowConfirm: (value: boolean) => void;
  register: UseFormRegister<RegisterForm>;
  errors: FieldErrors<RegisterForm>;
}
const ConfirmPassword = ({
  register,
  errors,
  showConfirm,
  setShowConfirm,
}: ConfirmPasswordProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
      {t("register.confirmPassword")}
      </label>
      <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
        <FiLock className="text-gray-500 shrink-0" size={16} />
        <input
          type={showConfirm ? "text" : "password"}
          placeholder={t("register.confirmPasswordPlaceholder")}
          {...register("confirmPassword")}
          className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
      )}
    </div>
  );
};

export default ConfirmPassword;
