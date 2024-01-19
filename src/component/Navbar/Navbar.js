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
      timer: 1000,
    });
  }

  render() {
    return (
      <div>
        <div
          style={{ position: "relative" }}
          className=" pt-3 d-flex align-items-center mb-5"
        >
          <img src={Logo} alt="" className="logoNavbar" />
          <div className="dropdown">
            <button
              className="btn "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="bi bi-person-fill fs-3"
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
    );
  }
}

export default Navbar;
