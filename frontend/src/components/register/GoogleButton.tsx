import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <button className="w-full flex items-center justify-center gap-3 border border-white/10 hover:border-primary/50 bg-transparent text-gray-300 font-medium py-3 rounded-xl text-sm transition-all duration-200">
      <FcGoogle size={18} />
      Sign up with Google
    </button>
  );
};

export default GoogleButton;
