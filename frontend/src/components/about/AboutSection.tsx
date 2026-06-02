import aboutBackground from "@/assets/images/about-background-image.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const storyButtonClassName =
  "self-center px-4 py-2 bg-primary rounded-lg text-white text-sm font-medium";

type AboutSectionProps = {
  linkStoryButton?: boolean;
};

const AboutSection = ({ linkStoryButton = true }: AboutSectionProps) => {
  const { t } = useTranslation();

  return (
    <section
      className="relative min-h-[20rem] md:min-h-[28rem] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${aboutBackground})` }}
      role="img"
      aria-label={t("about.imageAlt")}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 py-10 md:px-12 md:py-16 text-center">
        {linkStoryButton ? (
          <Link
            to="/about"
            className={`${storyButtonClassName} hover:opacity-90 transition-opacity`}
          >
            {t("about.storyButton")}
          </Link>
        ) : (
          <span className={storyButtonClassName}>{t("about.storyButton")}</span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-white">{t("about.title")}</h2>
        <p className="text-white/80 leading-relaxed max-w-xl">{t("about.description")}</p>
      </div>
    </section>
  );
};

export default AboutSection;