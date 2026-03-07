type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-32 h-32",
};

export default function Spinner({ size = "lg" }: SpinnerProps) {
  return (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-300 border-t-primary`}
    />
  );
}
