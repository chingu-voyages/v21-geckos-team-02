import withRoot from "../../modules/withRoot";
import React from "react";
import NavBar from "./components/Navbar/Navbar.component";
import ProductHero from "./components/ProductHero";
import ProductValues from "./components/ProductValues";
import ProductExamplar from "./components/ProductExamplar";
import ProductHowItWorks from "./components/ProductHowItWorks";
import Footer from "./components/Footer";

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
