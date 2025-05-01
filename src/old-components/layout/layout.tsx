import { Box } from "@mui/material";
import CustomAppBar from "./app-bar/custom-app-bar";
import { ContactSupport, Info, Login, PersonAdd } from "@mui/icons-material";
import img3 from "../../assets/img3.jpg";
import { LogedoutScreensEnum } from "../../enum/layout-screens";
import { JSX } from "react";

interface ILayoutProps {
  children: JSX.Element;
  onChangeActiveScreen: (screen: LogedoutScreensEnum) => void;
}

const Layout = ({ children, onChangeActiveScreen }: ILayoutProps) => {
  const navigateTo = (screen: LogedoutScreensEnum) => {
    onChangeActiveScreen(screen);
  };

  const logedout = [
    { title: LogedoutScreensEnum.LOGIN, icon: <Login /> },
    { title: LogedoutScreensEnum.REGISTER, icon: <PersonAdd /> },
    { title: LogedoutScreensEnum.ABOUT, icon: <Info /> },
    { title: LogedoutScreensEnum.CONTACT, icon: <ContactSupport /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CustomAppBar navItems={logedout} onNavigate={navigateTo} />

      <Box sx={{ position: "relative", flex: 1, minHeight: "calc(100vh - [APPBAR_HEIGHT])" , backgroundColor:"red"}}>
        {/* Background Image Layer */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${img3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
