import pizzaHam from "@/assets/images/pizza-ham.webp";

const AddToCartModal = () => {
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl w-full max-w-2/3  overflow-hidden ">
        <div className="absolute -top-1 right-1/2 flex h-10 w-10 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-primary font-bold text-white hover:opacity-70 lg:top-2 lg:right-2 lg:translate-x-0">
          X
        </div>
        {/* Row 1 - Two Columns */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 border-b border-gray-200 ">
          <div className="p-6 ">
            <img src={pizzaHam} alt="product" />
          </div>
          <div className="w-full p-6 mr-5 flex flex-col items-start gap-4">
            <div className="flex flex-col items-start">
              <h2>Samun me suxhuk</h2>
              <h4 className="text-primary !font-bold">€3.00</h4>
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
          <p className="text-sm text-gray-500 mb-4">Quantity</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button className="px-4 py-2 !font-bold !text-xl    border-2 rounded-full border-primary text-primary">
                −
              </button>
              <h3 className="px-4  py-2 font-medium">1</h3>
              <button className="px-4 py-2 !font-bold !text-xl  border-2 rounded-full border-primary bg-primary text-white">
                +
              </button>
            </div>
            <button className="w-full rounded-full border-2 border-primary bg-primary py-2 text-center text-white hover:opacity-70  transition-all duration-300 ease-in">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
