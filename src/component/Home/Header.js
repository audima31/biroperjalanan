/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import GambarBackground from "../../assets/images/Home/BgFoto1.png";
import Logo from "../../assets/images/Home/LogoDatacakra.png";
import Swal from "sweetalert2";

class Header extends Component {
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
          style={{
            backgroundImage: `url(${GambarBackground})`,
            color: "#FFFFFF",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // Atur backgroundSize ke "cover"
            backgroundPosition: "center", // Atur backgroundPosition ke "center"
            height: "80vh",
          }}
        >
          {/* Medium - Large */}
          <nav className="navbar navbar-expand-lg d-none d-md-block ">
            <div className="container-fluid d-flex align-items-center">
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
            {/* Content1 */}
            <div className="container-Caption">
              <p className="captionUtama">
                Datacakra <br />
                Travell Service
              </p>
              <p className="captionUtama2 ">
                Penyedia Layanan Liburan Favorit dan Biro Perjalanan Wisata di
                Indonesia
              </p>
            </div>
          </nav>

          {/* Small */}
          <nav className="navbar navbar-expand-lg d-block d-md-none ">
            <div className="container-fluid d-flex align-items-center">
              <a
                className="navbar-brand"
                href="#/"
                style={{ color: "#FFFFFF" }}
              >
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
            {/* Content1 */}
            <div className="container-Caption">
              <div className="text-center">
                <p className="captionUtama d-flex flex-column ">
                  <label>View Our</label>
                  <label>New Menu</label>
                </p>
                <label className="captionUtama2">
                  The freshest ingredients for you every day
                </label>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
