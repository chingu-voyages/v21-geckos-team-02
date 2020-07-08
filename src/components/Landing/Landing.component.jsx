import withRoot from "../../modules/withRoot";
import React from "react";
import NavBar from "../Navbar/Navbar.component";
import ProductHero from "../ProductHero";

function Landing() {
  return (
    <React.Fragment>
      <NavBar />
      <ProductHero />
    </React.Fragment>
  );
}

export default withRoot(Landing);
