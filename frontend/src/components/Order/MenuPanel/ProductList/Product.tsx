import { AddToCartModal } from "@/components/index";
import { useState } from "react";
import { useTranslation } from "react-i18next";
type ProductProps = {
  id: number;
  productImage: string;
  productName: string;
  productPrice: number;
  productCategory: string;
};

const Product = ({
  id,
  productImage,
  productName,
  productPrice,
  productCategory,
}: ProductProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <div>
      <img src={productImage} alt={productName} />
      <h5 className="mt-2 ml-3">{t(`products.${id}.productName`)}</h5>
      <p className="mt-2 ml-3">{t(`categories.${productCategory}`)}</p>
      <p className="text-primary !font-bold !text-[18px] ml-3 my-2">
        ${productPrice}
      </p>
      <button
        className="bg-white text-primary hover:bg-primary hover:text-white rounded-full px-4 mr-1 mb-1 py-2 font-medium border border-primary transition-colors"
        onClick={() => setIsOpen(true)}
      >
        {t(`products.addToCart`)}
      </button>
      {isOpen && (
        <AddToCartModal
          hideModal={() => setIsOpen(false)}
          productImage={productImage}
          productName={productName}
          productPrice={productPrice}
          productCategory={productCategory}
        />
      )}
    </div>
  );
};

export default Product;
