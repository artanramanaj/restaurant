import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => (
  <>
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-xs text-gray-600">or continue with</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-white/10 hover:border-[#EB2327]/50 bg-transparent text-gray-300 font-medium py-3 rounded-xl text-sm transition-all duration-200"
    >
      <FcGoogle size={18} />
      Sign in with Google
    </button>
  </>
);

export default GoogleButton;
