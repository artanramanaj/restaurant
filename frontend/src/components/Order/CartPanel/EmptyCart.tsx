import { useTranslation } from "react-i18next";
import box from "@/assets/images/box.png";
const EmptyCart = () => {
  const { t } = useTranslation();
  return (
    <div className="my-20 flex flex-col items-center gap-4">
      <img src={box} alt="empty" />
      <p>{t(`cart.noProducts`)}</p>
      <h5>{t(`cart.minimum`)} </h5>
    </div>
  );
};

export default EmptyCart;
