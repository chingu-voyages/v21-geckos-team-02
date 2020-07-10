import withRoot from "../../modules/withRoot";
import React from "react";
import NavBar from "../Navbar/Navbar.component";
import ProductHero from "../ProductHero";
import ProductValues from "../ProductValues";
import ProductExamplar from "../ProductExamplar";
import ProductHowItWorks from "../ProductHowItWorks";

function Landing() {
  return (
    <React.Fragment>
      <NavBar />
      <ProductHero />
      <ProductValues />
      <ProductExamplar />
      <ProductHowItWorks />
    </React.Fragment>
  );
}

export default withRoot(Landing);
