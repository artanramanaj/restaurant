type Props = {
  totalPrice: number;
};

const TotalPrice = ({ totalPrice }: Props) => {
  return (
    <div className="w-full flex items-center justify-between border-t border-primary/20 pt-4 mt-2">
      <h3 className="text-lightblack font-semibold text-sm uppercase tracking-wide">
        Total
      </h3>
      <h3 className="text-primary font-bold text-xl">{totalPrice}€</h3>
    </div>
  );
};

export default TotalPrice;
