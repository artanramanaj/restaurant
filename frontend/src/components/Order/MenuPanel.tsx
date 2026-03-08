import { ProductSearch, CategoryFilter, ProductList } from "@/components/index";
import { useState } from "react";
const MenuPanel = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  return (
    <section className="flex flex-col gap-8">
      <ProductSearch search={search} setSearch={setSearch} />
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ProductList search={search} activeCategory={activeCategory} />
    </section>
  );
};

export default MenuPanel;
