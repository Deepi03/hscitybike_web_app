import React from "react";

import { NavBar } from "../components/NavBar";
import "../styles/pages/home.scss";

export const Home = () => {
  return (
    <div>
      <h1 className="heading">Helsinki City Bike</h1>
      <div className="nav">
        <NavBar />
      </div>
    </div>
  );
};
