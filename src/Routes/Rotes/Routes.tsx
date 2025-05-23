import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../../pages/landing-page/landing-page";
import Home from "../../pages/client/home/home";
import LogedinLayout from "../layout/logedin-layout";
import History from "../../pages/client/history/history";
import Contact from "../../pages/client/contact/contact";
import { UserRole } from "../../enums/userRole";
import AdminHome from "../../pages/admin/home/admin-home";
import Profile from "../../pages/profile/profile";
import UserManagement from "../../pages/admin/users/users-management";
import NotFoundPage from "../../pages/not-found/not-found";
import UserDetails from "../../pages/admin/users/user-details/user-details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/client",
    element: <LogedinLayout role={UserRole.Client} />,
    children: [
      { path: "home", element: <Home /> },
      { path: "history", element: <History /> },
      { path: "profile", element: <Profile /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin",
    element: <LogedinLayout role={UserRole.Admin} />,
    children: [
      { path: "home", element: <AdminHome /> },
      { path: "users", element: <UserManagement /> },
      { path: "profile", element: <Profile /> },
      { path: "user-details/:userId", element: <UserDetails /> }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
