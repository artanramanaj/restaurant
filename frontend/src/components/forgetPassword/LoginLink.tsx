import { Link } from "react-router-dom";

const LoginLink = () => (
  <p className="mt-1 text-center text-xs text-gray-600">
    Remember your password?{" "}
    <Link
      to="/login"
      className="text-xs font-medium text-primary hover:underline"
    >
      Sign In
    </Link>
  </p>
);

export default LoginLink;
