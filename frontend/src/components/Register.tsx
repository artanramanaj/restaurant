import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/validations/registerSchema";
import { useRegisterUserMutation } from "@/store/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Welcome,
  ConfirmPassword,
  Password,
  UserNameField,
  Email,
  LoginLink,
  Spinner,
} from "@/components";

type RegisterForm = z.infer<typeof registerSchema>;
const Register = () => {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await registerUser(data).unwrap();
      toast.success(res.message);
      navigate("/verify");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-8 font-sans">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Welcome />
          <UserNameField register={register} errors={errors} />

          <Email register={register} errors={errors} />

          {/* Password */}
          <Password register={register} errors={errors} />

          <ConfirmPassword
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            register={register}
            errors={errors}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 mt-1 tracking-wide"
          >
            {t("register.createAccount")}
          </button>


          <LoginLink />
        </form>
      </div>
    </div>
  );
};

export default Register;
