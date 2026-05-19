import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Welcome from "./forgetPassword/Welcome";
import EmailField from "./forgetPassword/EmailField";
import LoginLink from "./forgetPassword/LoginLink";
import {
  forgetPasswordSchema,
  type ForgetPasswordForm,
} from "@/validations/forgetPasswordSchema";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordForm>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (_data: ForgetPasswordForm) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success(
      "If an account exists for this email, you will receive reset instructions shortly.",
    );
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] p-8 font-sans">
      <div className="pointer-events-none absolute top-0 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full bg-primary opacity-10 blur-[120px]" />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-lightblack p-8 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Welcome />
          <EmailField register={register} errors={errors} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-[#c91e21] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
          <LoginLink />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
