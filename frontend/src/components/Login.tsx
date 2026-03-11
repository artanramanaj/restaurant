import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuthUserMutation } from "@/store/userApiSlice";
import { Spinner, Variant } from "@/components";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authUser, { isLoading, isSuccess, error: isError }] =
    useAuthUserMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await authUser(formData).unwrap();
      console.log(res);
      dispatch(setCredentials(res.user));
      navigate("/");
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-8 font-sans">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#EB2327] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-4xl mb-3">🍕</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Email Address
            </label>
            <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-[#EB2327] focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
              <FiMail className="text-gray-500 shrink-0" size={16} />
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Password
              </label>
              <span className="text-xs text-[#EB2327] hover:underline cursor-pointer font-medium">
                Forgot password?
              </span>
            </div>
            <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-[#EB2327] focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
              <FiLock className="text-gray-500 shrink-0" size={16} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#EB2327] hover:bg-[#c91e21] active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 mt-1 tracking-wide"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 border border-white/10 hover:border-[#EB2327]/50 bg-transparent text-gray-300 font-medium py-3 rounded-xl text-sm transition-all duration-200">
            <FcGoogle size={18} />
            Sign in with Google
          </button>

          {/* Register link */}
          <p className="text-center text-xs text-gray-600 mt-1">
            Don't have an account?{" "}
            <span className="text-[#EB2327] hover:underline cursor-pointer font-medium">
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
