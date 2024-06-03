import React from "react";
import BannerSlider from "./subComponents/bannerSlider";
import ProductSection from "./subComponents/ProductSection";

function HomePage() {
  return (
  <div className="home-page">
    <BannerSlider/>
    <ProductSection/>

  </div>);
}

export default HomePage;
