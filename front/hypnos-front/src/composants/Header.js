import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({}) => {
  return (
    <header>
      <img src={logo} width="200px" height="80px" alt="hypnos" />
      <nav>
        <ul>
          <Link to={""}>etablissement</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
