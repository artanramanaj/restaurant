import { useState } from "react";
import { useTranslation } from "react-i18next";
type AddToCartModalProps = {
  hideModal: () => void;
  productImage: string;
  productName: string;
  productPrice: number;
  productCategory: string;
};
const AddToCartModal = ({
  hideModal,
  productImage,
  productName,
  productPrice,
  productCategory,
}: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { t } = useTranslation();
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrementQuantity = () => {
    setQuantity((prev) => prev - 1);
  };
  console.log("check the productName", productName);
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl w-full max-w-2/3  overflow-hidden ">
        <div
          className="absolute -top-1 right-1/2 flex h-10 w-10 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-primary font-bold text-white hover:opacity-70 lg:top-2 lg:right-2 lg:translate-x-0"
          onClick={hideModal}
        >
          X
        </div>
        {/* Row 1 - Two Columns */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 border-b border-gray-200 ">
          <div className="p-6 ">
            <img src={productImage} alt="product" />
          </div>
          <div className="w-full p-6 mr-5 flex flex-col items-start gap-4">
            <div className="flex flex-col items-start">
              <h2>{productName}</h2>
              <h4 className="text-primary !font-bold">{productPrice}</h4>
            </div>

            <div className="w-full flex flex-col items-start">
              <h4 className="text-primary !font-bold">Madhesia</h4>
              <p className=" !font-bold ">E vogel E mesme</p>
            </div>

            <div className="w-full flex flex-col items-start ">
              <h4 className="text-primary !font-bold">Kerkesa shtese </h4>
              <textarea
                className="w-full mb-3 h-20  rounded-md border border-black bg-gray-50 p-2 outline-0"
                name="extra"
                id="extra"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Row 2 - Single Column */}
        <div className="p-6">
          <p
            className="
          !text-3xl  mb-4"
          >
            Sasia
          </p>
          <div className="grid grid-cols-[1fr_5fr] items-center gap-4">
            <div className=" flex items-center rounded-lg ">
              <button
                disabled={quantity <= 1}
                className="px-4 py-2 !font-bold !text-xl    border-2 rounded-full border-primary text-primary"
                onClick={decrementQuantity}
              >
                −
              </button>
              <h3 className="px-4  py-2 font-medium">{quantity}</h3>
              <button
                className="px-4 py-2 !font-bold !text-xl  border-2 rounded-full border-primary bg-primary text-white"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <button className="w-full rounded-full border-2 border-primary bg-primary py-3 text-center text-white hover:opacity-70  transition-all duration-300 ease-in">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
