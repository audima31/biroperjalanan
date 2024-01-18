import React, { Component } from "react";
import Content1 from "../MenuTuris/Content1";
import Navbar from "../Navbar/Navbar";

class MenuTuris extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#f4f7fe", height: "100vh" }}>
        <Navbar />
        <Content1 />
      </div>
    );
  }
}

export default MenuTuris;
