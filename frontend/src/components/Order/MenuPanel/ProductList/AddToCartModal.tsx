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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 md:items-center md:p-4">
      <div className="relative flex max-h-[100dvh] w-[90%] flex-col overflow-hidden rounded-t-2xl bg-light-red shadow-2xl md:max-h-[90vh] md:max-w-2/3 md:rounded-2xl">
        <button
          type="button"
          onClick={hideModal}
          aria-label={t("addToCartModal.close")}
          className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white transition-opacity hover:opacity-75"
        >
          X
        </button>

        <div className="custom-scrollbar flex-1 overflow-y-auto pr-1">
          <div className="flex flex-col md:grid md:grid-cols-2">
            <div className="w-full shrink-0">
              <img
                src={productImage}
                alt={translatedName}
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-start gap-4 p-4 pb-6 md:p-6 md:pl-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-bold leading-tight text-gray-900">
                    {translatedName}
                  </h2>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">
                  {t(`categories.${productCategory.name}`, {
                    defaultValue: productCategory.name,
                  })}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-800">
                  {t("addToCartModal.extraRequest")}
                </span>
                <textarea
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-600 outline-none transition-colors placeholder:text-gray-300 focus:border-primary"
                  rows={4}
                  placeholder={t("addToCartModal.extraRequestPlaceholder")}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap text-base font-semibold text-gray-900">
                    {t("addToCartModal.quantity")}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <button
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((p) => p - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary text-lg font-bold text-primary transition-opacity hover:opacity-75 disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-lg font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((p) => p + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-lg font-bold text-white transition-opacity hover:opacity-75"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-semibold text-white transition-all hover:opacity-85"
                  onClick={addToCartFunc}
                >
                  {t("products.addToCart")}
                </button>
                <h2 className="whitespace-nowrap text-primary">
                  {productPrice * quantity}€
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
