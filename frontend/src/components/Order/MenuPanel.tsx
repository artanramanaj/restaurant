import { ProductSearch, CategoryFilter, ProductList } from "@/components/index";
import { useGetProductsQuery } from "@/store/productsApiSlice";
import { useState } from "react";
const MenuPanel = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <section className="flex flex-col gap-8">
      <ProductSearch />
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ProductList activeCategory={activeCategory} />
    </section>
  );
};

export default MenuPanel;
