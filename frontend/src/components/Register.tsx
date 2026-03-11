import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/validations/registerSchema";
import { useRegisterUserMutation } from "@/store/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Welcome, ConfirmPassword, Password } from "@/components";

type RegisterForm = z.infer<typeof registerSchema>;
const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
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

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-8 font-sans">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Welcome />
          {/* Username */}
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

          {/* Email */}
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
          </div>

          {/* Password */}
          <Password register={register} errors={errors} />

          <ConfirmPassword
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
          />

          {/* Terms */}
          <div className="flex items-start gap-3 mt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-0.5 accent-primary w-4 h-4 cursor-pointer shrink-0"
            />
            <label
              htmlFor="terms"
              className="text-xs text-gray-500 leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <span className="text-primary hover:underline cursor-pointer font-medium">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primary hover:underline cursor-pointer font-medium">
                Privacy Policy
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 mt-1 tracking-wide"
          >
            Create My Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 border border-white/10 hover:border-primary/50 bg-transparent text-gray-300 font-medium py-3 rounded-xl text-sm transition-all duration-200">
            <FcGoogle size={18} />
            Sign up with Google
          </button>

          {/* Login link */}
          <p className="text-center text-xs text-gray-600 mt-1">
            Already have an account?{" "}
            <span className="text-primary hover:underline cursor-pointer font-medium">
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
