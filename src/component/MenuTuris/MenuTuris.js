import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer";
import ListDataTuris from "./ListDataTuris";

class MenuTuris extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#1e1f26", minHeight: "100vh" }}>
        <Navbar />
        <ListDataTuris />
        <Footer />
      </div>
    );
  }
}

export default MenuTuris;
