import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const logoutHandeler = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <div className="header_container">
        <div className="header_title">
          <h2>{props.name} - Notes</h2>
        </div>
        <div className="header_options">
          <b onClick={() => navigate("/home")}>Home</b>
          <b onClick={() => navigate("/create")}>Create Note</b>
          <b onClick={logoutHandeler}>Logout</b>
        </div>
      </div>
    </>
  );
};

export default Header;
