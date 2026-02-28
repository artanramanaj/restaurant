import { useState } from "react";
import { useTranslation } from "react-i18next";

const CategoryFilter = () => {
  const { t } = useTranslation();
  const [categories] = useState<string[]>([
    "all",
    "pizza",
    "doner",
    "toast",
    "hotDog",
    "hamburger",
    "bread",
    "sandwich",
    "salad",
  ]);
  const [active, setActive] = useState<string>("all");

  return (
    <div className="flex gap-4 flex-wrap items-start justify-start">
      {categories.map((c, index) => (
        <button
          key={index}
          onClick={() => setActive(c)}
          className={`rounded-full px-4 mr-1 mb-1 py-2 font-medium border border-primary transition-colors uppercase
            ${
              active === c
                ? "bg-primary text-white"
                : "bg-white text-primary hover:bg-primary hover:text-white"
            }`}
        >
          {t(`categories.${c}`)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
