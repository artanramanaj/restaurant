import { FiMail } from "react-icons/fi";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { LoginForm } from "@/validations/loginSchema";
import { useTranslation } from "react-i18next";

interface Props {
  register: UseFormRegister<LoginForm>;
  errors: FieldErrors<LoginForm>;
}

const EmailField = ({ register, errors }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        {t("login.emailAddress")}
      </label>

      <div
        className={`flex items-center bg-[#242424] border rounded-xl px-4 gap-3 focus-within:shadow-[0_0_0_3px_#EB232720] transition-all ${
          errors.email
            ? "border-primary"
            : "border-white/10 focus-within:border-[#EB2327]"
        }`}
      >
        <FiMail className="text-gray-500 shrink-0" size={16} />

        <input
          {...register("email")}
          type="email"
          placeholder={t("login.emailPlaceholder")}
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