import { useTranslation } from "react-i18next";

const WelcomeBack = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-8 text-center">
      <div className="text-4xl mb-3">🍕</div>

      <h2 className="text-3xl font-bold text-white tracking-tight">
        {t("login.welcomeBack")}
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        {t("login.signInToAccount")}
      </p>
    </div>
  );
};

export default WelcomeBack;