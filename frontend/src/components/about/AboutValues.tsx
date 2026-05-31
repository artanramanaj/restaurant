import { useTranslation } from "react-i18next";

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#ffeced]">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const AboutValues = () => {
  const { t } = useTranslation();

  return (
    <section className="container px-6 py-12 md:px-16 md:py-16 flex flex-col gap-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center">{t("about.values.title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <ValueCard
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          }
          title={t("about.values.sustainability.title")}
          description={t("about.values.sustainability.description")}
        />
        <ValueCard
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
          title={t("about.values.quality.title")}
          description={t("about.values.quality.description")}
        />
        <ValueCard
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          title={t("about.values.community.title")}
          description={t("about.values.community.description")}
        />
      </div>
    </section>
  );
};

export default AboutValues;