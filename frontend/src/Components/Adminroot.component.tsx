import React from "react";
import Sidenav from "./Sidenav.component";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex">
      <div style={{ width: "10vw" }}>
        <Sidenav />
      </div>
      <div style={{ width: "90vw" }}>
        <Outlet />
      </div>
    </div>
  );
}
