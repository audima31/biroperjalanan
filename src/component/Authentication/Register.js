import React, { Component } from "react";
import Logo from "../../assets/images/Authentication/Logo2.png";
import Animasi2 from "../../assets/images/Authentication/Animasi2.png";
import Swal from "sweetalert2";
import { registerUser } from "../../store/actions/AuthAction";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  checkLogin() {
    const cekLogin = localStorage.getItem("token");

    if (cekLogin !== null) {
      Swal.fire({
        title: "Berhasil login",
        icon: "success",
        background: "#2c2e3e",
        color: "white",
      });

      setTimeout(() => {
        window.location = "/";
      }, 1500);
    } else {
      // User login biasa
    }
  }

  componentDidMount() {
    this.checkLogin();
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleRegister(event) {
    const { email, password, name } = this.state;
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      name: name,
    };

    if (!email) {
      Swal.fire({
        icon: "error",
        text: "Masukan email terlebih dahulu!",
        background: "#2c2e3e",
        color: "white",
      });
    } else if (!password) {
      Swal.fire({
        icon: "error",
        text: "Masukan password terlebih dahulu!",
        background: "#2c2e3e",
        color: "white",
      });
    } else if (!name) {
      Swal.fire({
        icon: "error",
        text: "Masukan nama anda terlebih dahulu!",
        background: "#2c2e3e",
        color: "white",
      });
    } else {
      this.props.dispatch(registerUser(data));
    }
  }

  componentDidUpdate(prevProps) {
    const { registerUserResult } = this.props;

    if (
      registerUserResult &&
      prevProps.registerUserResult !== registerUserResult
    ) {
      Swal.fire({
        title: "Pendaftaran akun telah berhasil!",
        icon: "success",
        background: "#2c2e3e",
        color: "white",
      });
      setTimeout(() => {
        window.location = "/login";
      }, 1500);
    }
  }

  render() {
    return (
      <div className="authenticationPage">
        {/* >MD */}
        <div className="d-none d-md-block">
          <div className="row">
            <div className="col-md-5 col-md-6  sideKiriAuthenticationPage">
              <div className="container ">
                <div className="content1">
                  <img src={Logo} alt="" style={{ width: "18%" }} />
                  <p className="fw-semibold mt-3 fs-2">
                    Liburan santai & aman <br /> bersama{" "}
                    <label style={{ color: "#33abe2" }}>Datacakra!</label>
                  </p>
                  <p className="caption2AuthenticationPage">
                    Sangat mudah berwisata bersama Datacakra.
                  </p>
                </div>

                <img className="animasiImage pb-3" src={Animasi2} alt="" />
              </div>
            </div>
            <div className="col ">
              <div className="formAuthentication shadow-lg p-3 d-flex align-items-center justify-content-center">
                <div className="d-none d-md-block w-100 mb-5 containerFormAuthentication">
                  <p className="fw-bold fs-5">Buat Akun</p>
                  <form onSubmit={(event) => this.handleRegister(event)}>
                    <div className="mt-4 mb-3">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control py-2"
                        id="exampleFormControlInput1"
                        name="email"
                        onChange={(event) => this.handleEmail(event)}
                      ></input>
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control py-2"
                        id="exampleFormControlInput2"
                        name="password"
                        onChange={(event) => this.handlePassword(event)}
                      ></input>
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="form-control py-2"
                        id="exampleFormControlInput2"
                        name="name"
                        onChange={(event) => this.handleName(event)}
                      ></input>
                    </div>

                    <button
                      type="submit"
                      className="btn fw-semibold button1 w-100 py-2"
                    >
                      Buat Akun
                    </button>
                  </form>

                  <div className="text-center mt-3">
                    <label>
                      Udah punya akun?
                      <a href="/login" style={{ color: "#308C88" }}>
                        {" "}
                        <label className="fw-semibold">Log In disini!</label>
                      </a>
                    </label>
                  </div>
                </div>

                {/*  */}
                <div className="d-block d-md-none">
                  <form>
                    <div className="mt-4 mb-3">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        id="exampleFormControlInput1"
                      ></input>
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        id="exampleFormControlInput2"
                      ></input>
                    </div>

                    <button
                      type="submit"
                      className="btn fw-semibold button1 w-100"
                      style={{ borderRadius: "5px" }}
                    >
                      LOG IN
                    </button>
                  </form>

                  <div className="text-center mt-3">
                    <label>
                      Udah punya akun?
                      <a href="/login">
                        <label>Login disini!</label>
                      </a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* XS */}
        <div className="d-block d-md-none">
          <div className="sideKiriAuthenticationPage">
            <div className="container ">
              <div className="content1">
                <img src={Logo} alt="" style={{ width: "18%" }} />
                <p className="fw-semibold mt-3 fs-2">
                  Liburan santai & aman <br /> bersama{" "}
                  <label style={{ color: "#33abe2" }}>Datacakra!</label>
                </p>
                <p className="caption2AuthenticationPage">
                  Sangat mudah berwisata bersama Datacakra.
                </p>
              </div>

              <div className="mb-5">
                <form onSubmit={(event) => this.handleRegister(event)}>
                  <div className="mt-4 mb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control py-2"
                      id="exampleFormControlInput1"
                      name="email"
                      onChange={(event) => this.handleEmail(event)}
                    ></input>
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control py-2"
                      id="exampleFormControlInput2"
                      name="password"
                      onChange={(event) => this.handlePassword(event)}
                    ></input>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      className="form-control py-2"
                      id="exampleFormControlInput2"
                      name="name"
                      onChange={(event) => this.handleName(event)}
                    ></input>
                  </div>

                  <button
                    type="submit"
                    className="btn fw-semibold button1 w-100 py-2"
                  >
                    Buat Akun
                  </button>
                </form>

                <div className="text-center mt-3">
                  <label>
                    Udah punya akun?
                    <a href="/login" style={{ color: "#308C88" }}>
                      {" "}
                      <label className="fw-semibold">Log In disini!</label>
                    </a>
                  </label>
                </div>
              </div>

              <img className="animasiImage pb-3" src={Animasi2} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  registerUserLoading: state.AuthReducer.registerUserLoading,
  registerUserResult: state.AuthReducer.registerUserResult,
  registerUserError: state.AuthReducer.registerUserError,
});

export default connect(mapStateToProps, null)(Register);
