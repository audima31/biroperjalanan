import React, { Component } from "react";
import Logo from "../../assets/images/Home/LogoDataCakra2.png";
import Swal from "sweetalert2";

class Navbar extends Component {
  handleLogout() {
    localStorage.removeItem("idUser");
    localStorage.removeItem("token");
  }

  render() {
    const sudahLogin = localStorage.getItem("token");

    return (
      <div>
        {/* >MD */}
        <div className="d-none d-md-block">
          <div
            style={{ position: "relative" }}
            className=" pt-4 d-flex align-items-center mb-5"
          >
            <a className="logoNavbar" href="/">
              <img src={Logo} alt="" />
            </a>
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
                {sudahLogin ? (
                  <li>
                    <a className="dropdown-item" href="/profileUser">
                      Profile
                    </a>
                  </li>
                ) : (
                  <></>
                )}
                <li>
                  <a
                    className="dropdown-item"
                    href="/login"
                    onClick={this.handleLogout}
                  >
                    {sudahLogin ? <>Logout</> : <>Login</>}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <SM */}
        <div className="d-block d-md-none mb-5">
          <nav class="navbar navbar-expand-lg ">
            <div class="container-fluid">
              <a className="logoNavbar" href="/">
                <img src={Logo} alt="" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="bi bi-list" style={{ color: "white" }}></i>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mt-2 mb-lg-0">
                  {sudahLogin ? (
                    <>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href="/profileUser"
                          style={{ color: "#308c88" }}
                        >
                          Profile
                        </a>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="/login"
                      onClick={this.handleLogout}
                      style={{ color: "#308c88" }}
                    >
                      {sudahLogin ? <>Logout</> : <>Login</>}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
