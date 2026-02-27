import { Navigation } from "@/components/index";

const Header = () => {
  return (
    <div className="container grid grid-cols-[1fr_6fr] py-4">
      <h2>Logo</h2>
      <Navigation />
    </div>
  );
};

export default Header;
