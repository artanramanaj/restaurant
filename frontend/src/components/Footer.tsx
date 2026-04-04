import { FaFacebook, FaInstagram } from "react-icons/fa";
import blacklogo from "@/assets/images/zhuriBlackLogo2.png";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <section className="bg-primary py-8 text-white">
      <div className="container grid grid-cols-[2fr_5fr_1fr] py-4 gap-4 items-center">
        <div className="flex flex-col items-start">
          <img
            className="w-full h-[128px] object-cover "
            src={blacklogo}
            alt="black logo"
          />
          <p>© {year} Restaurant. All rights reserved.</p>
        </div>

        <div className="flex justify-end gap-4 text-xl">
          <p>Follow us:</p>
          <div className="flex justify-end gap-4">
            <FaFacebook />
            <FaInstagram />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
