import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//screens
import Login from "./Screens/Login";
import BacgroundVerification from "./Screens/BackgroundVerification";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify",
      element: <BacgroundVerification />
    }
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
