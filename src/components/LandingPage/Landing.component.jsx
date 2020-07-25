import React from "react";
import withRoot from "../../modules/withRoot";
import ProductHero from "./components/ProductHero";
import ProductValues from "./components/ProductValues";
import ProductExamplar from "./components/ProductExamplar";
import ProductHowItWorks from "./components/ProductHowItWorks";

function Landing() {
  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <ProductExamplar />
      <ProductHowItWorks />
    </React.Fragment>
  );
}

export default withRoot(Landing);
