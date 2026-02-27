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
  return (
    <div>
      <img src={productImage} alt={productName} />
      <h5 className="mt-3 ml-3">{productName}</h5>
      <p className="mt-3 ml-3">{productCategory}</p>
      <p className="text-primary !font-bold !text-[18px] ml-3 mb-3 mt-3">
        ${productPrice}
      </p>
      <button className="bg-white text-primary hover:bg-primary hover:text-white rounded-full px-4 mr-1 mb-1 py-2 font-medium border border-primary transition-colors">
        Shto ne shporte
      </button>
    </div>
  );
};

export default Product;
