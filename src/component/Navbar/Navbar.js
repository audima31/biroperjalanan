import React, { Component } from "react";
import Logo from "../../assets/images/Home/LogoDataCakra2.png";
import Swal from "sweetalert2";

class Navbar extends Component {
  handleLogout() {
    localStorage.removeItem("idUser");
    localStorage.removeItem("token");
    Swal.fire({
      title: "Logout telah berhasil",
      icon: "success",
      background: "#2c2e3e",
      color: "white",
    });
  }

  render() {
    return (
      <div>
        {/* >MD */}
        <div className="d-none d-md-block">
          <div
            style={{ position: "relative" }}
            className=" pt-4 d-flex align-items-center mb-5"
          >
            <img src={Logo} alt="" className="logoNavbar" />
            <div className="dropdown">
              <button
                className="btn "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-fill" style={{ color: "#fff" }}></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="/login"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SM */}
        <div className="d-block d-sm-none">
          <div className="pt-3 mx-5 d-flex align-items-center justify-content-between mb-5">
            <img src={Logo} alt="" className="logoNavbar" />
            <div className="dropdown">
              <button
                className="btn "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="bi bi-person-fill fs-5"
                  style={{ color: "#fff" }}
                ></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="/login"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="d-none d-sm-block d-md-none">
          <div className="pt-3 mx-5 d-flex align-items-center justify-content-between mb-5">
            <img src={Logo} alt="" className="logoNavbar" />
            <div className="dropdown">
              <button
                className="btn "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="bi bi-person-fill fs-5"
                  style={{ color: "#fff" }}
                ></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="/login"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
