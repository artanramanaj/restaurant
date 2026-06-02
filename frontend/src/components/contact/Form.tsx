import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const Form = () => {
    const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full w-full  mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-md p-6 rounded-2xl border border-gray-200 bg-white">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-bold">{t("contact.form.title")}</h3>
          <label className="text-xs font-bold uppercase tracking-widest text-gray-600">
            {t("contact.form.fullname")}
          </label>
          <input
            name="fullname"
            type="text"
            placeholder={t("contact.form.fullnamePlaceholder")}
            value={formData.fullname}
            onChange={handleChange}
            className="bg-light-red border border-primary/20 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-600">
            {t("contact.form.mobile")}
          </label>
          <input
            name="mobile"
            type="tel"
            placeholder={t("contact.form.mobilePlaceholder")}
            value={formData.mobile}
            onChange={handleChange}
            className="bg-light-red border border-primary/20 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-600">
            {t("contact.form.message")}
          </label>
          <textarea
            name="message"
            placeholder={t("contact.form.messagePlaceholder")}
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="bg-light-red border border-primary/20 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary hover:opacity-90 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl text-sm tracking-widest uppercase transition-all duration-200 mt-1"
        >
          {t("contact.form.submit")}
        </button>
      </form>
    </div>
  );
};

export default Form;