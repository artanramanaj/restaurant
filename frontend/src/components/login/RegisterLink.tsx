import { Link } from "react-router-dom";

const RegisterLink = () => (
  <p className="text-center text-xs text-gray-600 mt-1">
    Don't have an account?{" "}
    <Link
      to="/register"
      className="text-primary text-xs hover:underline font-medium"
    >
      Create one
    </Link>
  </p>
);

export default RegisterLink;
