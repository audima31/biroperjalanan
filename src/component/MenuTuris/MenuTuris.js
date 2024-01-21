import React, { Component } from "react";
import Content1 from "../MenuTuris/Content1";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer";

class MenuTuris extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#1e1f26", minHeight: "100vh" }}>
        <Navbar />
        <Content1 />
        <Footer />
      </div>
    );
  }
}

export default MenuTuris;
