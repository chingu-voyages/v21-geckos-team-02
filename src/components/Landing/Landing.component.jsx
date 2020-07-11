import withRoot from "../../modules/withRoot";
import React from "react";
import NavBar from "../Navbar/Navbar.component";
import ProductHero from "../ProductHero";
import ProductValues from "../ProductValues";
import ProductExamplar from "../ProductExamplar";
import ProductHowItWorks from "../ProductHowItWorks";
import Footer from "../Footer";

function Landing() {
  return (
    <React.Fragment>
      <NavBar />
      <ProductHero />
      <ProductValues />
      <ProductExamplar />
      <ProductHowItWorks />
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(Landing);
