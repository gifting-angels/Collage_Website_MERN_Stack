import React from "react";
import Navbar from "../../Nav/Navbar";
import SideBar from "../SideBar";
export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div>
          Dashboard
        </div>
      </div>
    </div>
  );
}
