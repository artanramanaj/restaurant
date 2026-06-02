import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { useTranslation } from "react-i18next";
const Details = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">

      {/* The Details */}
      <div className="bg-light-red rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="text-xl font-bold text-gray-900">{t("contact.details.title")}</h2>

        {/* Location */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <FiMapPin className="text-primary" size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{t("contact.details.locationTitle")}</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t("contact.details.locationAddress")}
              Peje, Kosovo
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <FiPhone className="text-primary" size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{t("contact.details.phoneTitle")}</p>
            <p className="text-xs text-gray-500">{t("contact.details.phoneNumber")}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <FiMail className="text-primary" size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{t("contact.details.emailTitle")}</p>
            <p className="text-xs text-gray-500">{t("contact.details.emailAddress")}</p>
          </div>
        </div>
      </div>

      {/* Service Hours */}
      <div className="bg-primary rounded-2xl p-6 flex flex-col gap-4">
        <h3 className=" font-bold text-white">{t("contact.hours.title")}</h3>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-white/20 pb-3">
            <span className="text-sm text-white/80">{t("contact.hours.mondayThursday")}</span>
            <span className="text-sm font-semibold text-white">{t("contact.hours.mondayThursdayHours")}</span>
          </div>
         
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80">Sunday</span>
            <span className="text-sm font-semibold text-white">{t("contact.hours.sundayHours")}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Details;