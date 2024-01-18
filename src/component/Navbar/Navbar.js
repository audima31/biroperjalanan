import React, { Component } from "react";
import Logo from "../../assets/images/Home/LogoDatacakra.png";

class Navbar extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#365486" }}>
        {/* Medium - Large */}
        <nav className="navbar navbar-expand-lg d-none d-md-block ">
          <div className="container-fluid d-flex align-items-center py-2">
            <a className="navbar-brand" href="/" style={{ color: "#FFFFFF" }}>
              <img src={Logo} alt="" style={{ width: "40%" }} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list" style={{ color: "white" }}></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active ms-md-2"
                    aria-current="page"
                    href="/"
                    style={{ color: "#FFFFFF" }}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item ms-md-2">
                  <a
                    className="nav-link"
                    href="/dataTuris"
                    style={{ color: "#FFFFFF" }}
                  >
                    Data Tourist
                  </a>
                </li>
                <li className="nav-item ms-md-2">
                  <a
                    className="nav-link"
                    style={{ color: "#FFFFFF" }}
                    onClick={this.handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Small */}
        <nav className="navbar navbar-expand-lg d-block d-md-none ">
          <div className="container-fluid d-flex align-items-center">
            <a className="navbar-brand" href="#/" style={{ color: "#FFFFFF" }}>
              {/* <img src={Logo} alt="" style={{ width: "30%" }} /> */}
              <label className="fw-bold fs-4">Mayastik.</label>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list" style={{ color: "white" }}></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active ms-md-2"
                    aria-current="page"
                    href="/"
                    style={{ color: "#FFFFFF" }}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item ms-md-2">
                  <a
                    className="nav-link"
                    href="/menu"
                    style={{ color: "#FFFFFF" }}
                  >
                    Menus
                  </a>
                </li>
                <li className="nav-item ms-md-2">
                  <a
                    className="nav-link"
                    href="/reservations"
                    style={{ color: "#FFFFFF" }}
                  >
                    Reservations
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
