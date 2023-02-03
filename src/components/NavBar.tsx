import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/journeys">Journeys</Link>
        </li>
        <li>
          <Link to="/stations">Stations</Link>
        </li>
      </ul>
    </div>
  );
};
