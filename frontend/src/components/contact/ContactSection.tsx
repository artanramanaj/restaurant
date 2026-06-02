import contactImage from "@/assets/images/contactImage.png";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();

  const checkboxItems = [
    t("contact.checkboxItems.menu"),
    t("contact.checkboxItems.reservations"),
    t("contact.checkboxItems.feedback"),
    t("contact.checkboxItems.partnership"),
  ];

  return (
    <div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 place-items-center">
          <div className="col-span-1 flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold">{t("contact.title")}</h2>
              <p>{t("contact.description")}</p>
            </div>

            <div className="flex flex-col gap-3">
              {checkboxItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <img src={contactImage} alt="Contact Us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;