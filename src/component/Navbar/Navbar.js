import React, { Component } from "react";
import Logo from "../../assets/images/Home/LogoDatacakra.png";
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

    setTimeout(() => {
      window.location = "/login";
    }, 1500);
  }

  render() {
    return (
      <div>
        <div
          style={{ position: "relative" }}
          className="mt-3 d-flex align-items-center"
        >
          <img src={Logo} alt="" className="logoNavbar" />
          <div className="dropdown">
            <button
              className="btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-fill fs-4"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/login">
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
