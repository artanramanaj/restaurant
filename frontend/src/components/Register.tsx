import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 font-sans">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-4xl mb-3">🍕</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Start your culinary journey today
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Username
            </label>
            <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
              <FiUser className="text-gray-500 shrink-0" size={16} />
              <input
                name="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
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
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Password
            </label>
            <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-[#EB2327] focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
              <FiLock className="text-gray-500 shrink-0" size={16} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
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

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Confirm Password
            </label>
            <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
              <FiLock className="text-gray-500 shrink-0" size={16} />
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="flex-1 bg-transparent py-3 text-sm text-white placeholder-gray-600 outline-none"
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

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
            onClick={handleSubmit}
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
        </div>
      </div>
    </div>
  );
};

export default Register;
