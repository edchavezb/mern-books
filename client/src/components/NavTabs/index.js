import React from "react";
import { Link } from "react-router-dom";

function NavTabs(props) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={props.path === "/" ? "nav-link active" : "nav-link"}>
          Search
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/saved"
          className={props.path === "/saved" ? "nav-link active" : "nav-link"}
        >
          Saved
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
