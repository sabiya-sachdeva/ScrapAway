import React from "react";
import WasteType from "./WasteType/WasteType";
import WebHero from "./WebHero/WebHero";
import HowItWorks from "./HowItWorks/HowItWorks";
import FirstNavbar from "./Navbars/FirstNavbar";
import SecondNavbar from "./Navbars/SecondNavbar";
import Footer from "./Footer/Footer";

function Home() {
  return (
    <div>
      <FirstNavbar />
      <SecondNavbar />
      <WebHero />
      <WasteType />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default Home;
