import { RouterProvider } from "react-router-dom"; // Adjust the import path if it's a custom component
import { router } from "./Routes/Rotes/Routes";
import { App as AntdApp } from "antd";
import React from "react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <React.StrictMode>
      <AntdApp>
        <RouterProvider router={router} />
        <Toaster />
      </AntdApp>
    </React.StrictMode>
  );
}

export default App;
