import { RouterProvider } from "react-router-dom"; // Adjust the import path if it's a custom component
import { router } from "./Routes/Rotes/Routes";
import { App as AntdApp } from "antd";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <StrictMode>
      <AntdApp>
        <RouterProvider router={router} />
        <Toaster />
      </AntdApp>
    </StrictMode>
  );
}

export default App;
