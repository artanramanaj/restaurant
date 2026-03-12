const Divider = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-xs text-gray-600">or continue with</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
};

export default Divider;
