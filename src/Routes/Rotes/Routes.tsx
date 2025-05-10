import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../../pages/landing-page/landing-page";
import Home from "../../pages/home/home";
import LogedinLayout from "../layout/logedin-layout";
import History from "../../pages/history/history";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: (
      <LogedinLayout>
        <Home />
      </LogedinLayout>
    ),
  },
  {
    path: "/history",
    element: (
      <LogedinLayout>
        <History />
      </LogedinLayout>
    ),
  },
]);
