import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <section className="bg-primary py-8 text-white">
      <div className="container grid grid-cols-[2fr_1fr] py-4 gap-4 items-center">
        <div>
          <h3>Restaurant</h3>
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
