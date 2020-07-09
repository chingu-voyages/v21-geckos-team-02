import withRoot from "../../modules/withRoot";
import React from "react";
import NavBar from "../Navbar/Navbar.component";
import ProductHero from "../ProductHero";
import ProductValues from "../ProductValues";

function Landing() {
  return (
    <React.Fragment>
      <NavBar />
      <ProductHero />
      <ProductValues />
    </React.Fragment>
  );
}

export default withRoot(Landing);
