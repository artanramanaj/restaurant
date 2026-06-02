import { useTranslation } from "react-i18next";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "dark";
};

const FeatureCard = ({ icon, title, description, variant = "default" }: FeatureCardProps) => {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl ${
        variant === "dark" ? "bg-light-red text-black" : "bg-white border border-gray-100 shadow-sm"
      }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
          variant === "dark" ? "bg-primary" : "bg-primary/10"
        }`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h3
          className={`font-semibold text-sm ${
            variant === "dark" ? "text-black" : "text-primary"
          }`}
        >
          {title}
        </h3>
        <p className={`text-xs leading-relaxed ${variant === "dark" ? "text-gray-500" : "text-gray-500"}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

const AboutFeatures = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col  gap-4">
      <FeatureCard
        variant="default"
        icon={
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title={t("about.features.dop.title")}
        description={t("about.features.dop.description")}
      />
      <FeatureCard
        variant="dark"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title={t("about.features.hours.title")}
        description={t("about.features.hours.description")}
      />
    </div>
  );
};

export default AboutFeatures;