import { useTranslation } from "react-i18next";
type searchProps = {
  search: string;
  setSearch: (value: string) => void;
};
const ProductSearch = ({ search, setSearch }: searchProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={t(`productSearch.search`)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-4 border border-gray-300 rounded-3xl
                   focus:outline-none focus:ring-1 focus:ring-secondary"
      />
    </div>
  );
};

export default ProductSearch;
