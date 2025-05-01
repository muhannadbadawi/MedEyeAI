import { useState } from "react";
import { LogedoutScreensEnum } from "../../enum/layout-screens";
import Layout from "../../old-components/layout/layout";
import LandingPage from "../../old-components/landing-page/landing-page";
import Login from "../../old-components/login/Login";
import Register from "../../old-components/register/Register";
import About from "../../old-components/about/about";
import ContactUs from "../../old-components/contact/contact-us";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState(
    LogedoutScreensEnum.LANDINGPAGE
  );

  const onChangeActiveScreen = (screen: LogedoutScreensEnum) => {
    setActiveScreen(screen);
  };

  const handelActiveScreen = () => {
    if (activeScreen === LogedoutScreensEnum.LANDINGPAGE) {
      return <LandingPage />;
    } else if (activeScreen === LogedoutScreensEnum.LOGIN) {
      return <Login />;
    } else if (activeScreen === LogedoutScreensEnum.REGISTER) {
      return <Register />;
    } else if (activeScreen === LogedoutScreensEnum.ABOUT) {
      return <About />;
    } else if (activeScreen === LogedoutScreensEnum.CONTACT) {
      return <ContactUs />;
    } else {
      return <LandingPage />;
    }
  };
  return (
    <Layout onChangeActiveScreen={onChangeActiveScreen}>
      {handelActiveScreen()}
    </Layout>
  );
};
export default Index;
