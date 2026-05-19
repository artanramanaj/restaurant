import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addToCart } from "@/store/cartSlice";

type AddToCartModalProps = {
  hideModal: () => void;
  productImage: string;
  productName: string;
  productPrice: number;
  productId: string;
  productCategory: { name: string };
};

const AddToCartModal = ({
  hideModal,
  productImage,
  productName,
  productPrice,
  productId,
  productCategory,
}: AddToCartModalProps) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const translatedName = t(`products.items.${productId}`, {
    defaultValue: productName,
  });

  const addToCartFunc = () => {
    dispatch(
      addToCart({
        _id: productId,
        name: translatedName,
        image: productImage,
        price: productPrice,
        quantity: quantity,
      }),
    );
    hideModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-light-red rounded-2xl w-full max-w-2/3 overflow-hidden shadow-2xl">
        <button
          type="button"
          onClick={hideModal}
          aria-label={t("addToCartModal.close")}
          className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-bold text-sm hover:opacity-75 transition-opacity"
        >
          X
        </button>

        <div className="grid grid-cols-2 border-b border-gray-100">
          <div>
            <img
              src={productImage}
              alt={translatedName}
              className="w-full h-full aspect-square object-cover"
            />
          </div>

          <div className="p-6 pl-4 flex flex-col justify-start gap-4">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {translatedName}
                </h2>
              </div>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                {t(`categories.${productCategory.name}`, {
                  defaultValue: productCategory.name,
                })}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold tracking-widest uppercase text-gray-800">
                {t("addToCartModal.extraRequest")}
              </span>
              <textarea
                className="w-full border border-gray-200 rounded-xl bg-gray-50 p-2.5 text-sm text-gray-600 placeholder:text-gray-300 outline-none focus:border-primary resize-none transition-colors"
                rows={4}
                placeholder={t("addToCartModal.extraRequestPlaceholder")}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 px-6 py-5">
                <span className="text-base font-semibold text-gray-900 whitespace-nowrap">
                  {t("addToCartModal.quantity")}
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((p) => p - 1)}
                    className="w-8 h-8 rounded-full border-2 border-primary text-primary font-bold text-lg flex items-center justify-center disabled:opacity-30 hover:opacity-75 transition-opacity"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((p) => p + 1)}
                    className="w-8 h-8 rounded-full border-2 border-primary bg-primary text-white font-bold text-lg flex items-center justify-center hover:opacity-75 transition-opacity"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white rounded-full py-4 font-semibold text-sm hover:opacity-85 transition-all"
                onClick={addToCartFunc}
              >
                {t("products.addToCart")}
              </button>
              <h2 className="text-primary whitespace-nowrap px-6 py-5">
                {productPrice * quantity}€
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
