type Variant = "success" | "danger" | "warning" | "info";

const variants = {
  success: "border-green-500 bg-green-50 text-green-700",
  danger: "border-primary bg-red-50 text-red-700",
  warning: "border-yellow-500 bg-yellow-50 text-yellow-700",
  info: "border-blue-500 bg-blue-50 text-blue-700",
};

type VariantMessageProps = {
  message: string;
  variant?: Variant;
};

export default function VariantMessage({
  message,
  variant = "info",
}: VariantMessageProps) {
  return (
    <div className={`p-4 border-l-4 rounded-md ${variants[variant]}`}>
      {message}
    </div>
  );
}
