import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <footer className="App-Footer ">
      &copy; {new Date().getFullYear()} VehiclePro. All rights reserved.
    </footer>
  );
};

export default Footer;
