import pizza from "@/assets/images/pizza.jpg";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative min-h-[32rem] flex items-center justify-center text-white">
      <img
        src={pizza}
        alt="Food background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h2 className="text-4xl font-bold mb-4">{t("banner.heading")}</h2>
        <p>{t("banner.description")}</p>
      </div>
    </div>
  );
};

export default Banner;
