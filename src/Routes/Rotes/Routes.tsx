import { createBrowserRouter } from "react-router-dom";
import Index from "../../old-screens/index/Index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);
