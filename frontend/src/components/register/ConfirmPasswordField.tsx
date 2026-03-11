import React from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
interface ConfirmPasswordProps {
  showConfirm: boolean;
  setShowConfirm: (value: boolean) => void;
}
const ConfirmPassword = ({
  showConfirm,
  setShowConfirm,
}: ConfirmPasswordProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Confirm Password
      </label>
      <div className="flex items-center bg-[#242424] border border-white/10 rounded-xl px-4 gap-3 focus-within:border-primary focus-within:shadow-[0_0_0_3px_#EB232720] transition-all">
        <FiLock className="text-gray-500 shrink-0" size={16} />
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Repeat your password"
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
    </div>
  );
};

export default ConfirmPassword;
