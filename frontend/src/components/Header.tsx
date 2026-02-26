import React from "react";
import { Navigation } from "@/components/index";

const Header = () => {
  return (
    <div className="container grid grid-cols-[1fr_3fr] p-2">
      <h2>Logo</h2>
      <Navigation />
    </div>
  );
};

export default Header;
