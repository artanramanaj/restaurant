import { useState } from "react";
import { useTranslation } from "react-i18next";
const ProductSearch = () => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={t(`productSearch.search`)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-4 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-1 focus:ring-secondary"
      />
    </div>
  );
};

export default ProductSearch;
