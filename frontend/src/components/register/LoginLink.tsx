import { Link } from "react-router-dom";
const LoginLink = () => {
  return (
    <p className="text-center text-xs text-gray-600 mt-1">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-primary text-xs hover:underline font-medium"
      >
        Sign In
      </Link>
    </p>
  );
};

export default LoginLink;
