import { ProductSearch, CategoryFilter, ProductList } from "@/components/index";
import { useState } from "react";
const MenuPanel = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const handleSearch = (value: string) => {
    setSearch(value);
    setIsTyping(true);
  };
  return (
    <section className="flex flex-col gap-8">
      <ProductSearch search={search} setSearch={handleSearch} />
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ProductList
        search={search}
        activeCategory={activeCategory}
        isTyping={isTyping}
        setIsTyping={setIsTyping}
      />
    </section>
  );
};

export default MenuPanel;
