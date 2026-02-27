import { ProductSearch, CategoryFilter, ProductList } from "@/components/index";
const MenuPanel = () => {
  return (
    <section className="flex flex-col gap-8">
      <ProductSearch />
      <CategoryFilter />
      <ProductList />
    </section>
  );
};

export default MenuPanel;
