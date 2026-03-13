import { AddToCartModal } from "@/components/index";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import pizza from "@/assets/images/pizza.jpg";
import { API_URL } from "@/config/api";
type Category = {
  _id: string;
  name: string;
  description: string;
  __v: number;
  // add any other fields if present (e.g., image)
};
type ProductProps = {
  _id: number;
  image: string;
  name: string;
  price: number;
  category: Category;
};

const Product = ({ _id, image, name, price, category }: ProductProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  console.log("iamge from products", `${API_URL}${image}`);
  return (
    <div className="w-full">
      <img
        className="w-full aspect-square object-cover rounded"
        src={`${API_URL}/uploads/${image}`}
        alt={name}
      />
      <h5 className="mt-2 ml-3"> {t(`products.items.${_id}`)}</h5>
      <p className="mt-2 ml-3">{t(`categories.${category.name}`)}</p>
      <p className="text-primary !font-bold !text-[18px] ml-3 my-2">{price}€</p>
      <button
        className="bg-white text-primary hover:bg-primary hover:text-white rounded-full px-4 mr-1 mb-1 py-2 font-medium border border-primary transition-colors"
        onClick={() => setIsOpen(true)}
      >
        {t(`products.addToCart`)}
      </button>
      {isOpen && (
        <AddToCartModal
          hideModal={() => setIsOpen(false)}
          productImage={image}
          productName={name}
          productPrice={price}
          productCategory={category}
        />
      )}
    </div>
  );
};

export default Product;
