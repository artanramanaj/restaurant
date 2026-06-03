import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterLink = () => {
  const { t } = useTranslation();

  return (
    <p className="text-center text-xs text-gray-600 mt-1">
      {t("login.noAccount")}{" "}
      <Link
        to="/register"
        className="text-primary text-xs hover:underline font-medium"
      >
        {t("login.createOne")}
      </Link>
    </p>
  );
};

export default RegisterLink;