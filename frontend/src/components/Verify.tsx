import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { verifySchema, type VerifyForm } from "@/validations/verifySchema";
import { EmailVerify, CodeVerify } from "@/components";
import { useVerifyUserMutation } from "@/store/userApiSlice";
import { toast } from "react-toastify";
import { Spinner } from "@/components";
import { useNavigate } from "react-router-dom";
type RegisterForm = z.infer<typeof verifySchema>;

const Verify = () => {
  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyForm) => {
    try {
      const res = await verifyUser(data).unwrap();
      toast.success(res.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-8 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label className="text-3xl font-bold text-white tracking-tight">
            Verify Your Account
          </label>
          <EmailVerify register={register} errors={errors} />
          <CodeVerify register={register} errors={errors} />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 mt-1 tracking-wide"
          >
            Verify My Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
