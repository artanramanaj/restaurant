import { useTranslation } from "react-i18next";
import aboutBackground from "@/assets/images/about-background-image.png";
import { AboutFeatures } from "@/components/index";
const AboutContent = () => {
  const { t } = useTranslation();

  return (
    <section className="container flex flex-col md:flex-row gap-8 px-6 py-12 md:px-16 md:py-16 items-center">
      {/* Left - Image */}
      <div className="w-full md:w-1/2">
        <img
          src={aboutBackground}
          alt={t("about.imageAlt")}
          className="w-full h-[20rem] md:h-[28rem] object-cover rounded-2xl"
        />
      </div>

      {/* Right - Text content */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold">{t("about.content.title")}</h2>
        <p className="text-gray-600 leading-relaxed">{t("about.content.description")}</p>
        <AboutFeatures />
        <p className="text-gray-600 leading-relaxed">{t("about.content.closing")}</p>
      </div>
    </section>
  );
};

export default AboutContent;