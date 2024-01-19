import React, { Component } from "react";
import Logo from "../../assets/images/Authentication/Logo2.png";
import Animasi from "../../assets/images/Authentication/Animasi.png";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/AuthAction";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  checkLogin() {
    const cekLogin = localStorage.getItem("token");

    if (cekLogin !== null) {
      Swal.fire({
        title: "Berhasil login",
        icon: "success",
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

  handleLogin(event) {
    const { email, password } = this.state;
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        text: "Masukan email terlebih dahulu!",
      });
    } else if (!password) {
      Swal.fire({
        icon: "error",
        text: "Masukan password terlebih dahulu!",
      });
    } else {
      this.props.dispatch(loginUser(data));
    }
  }

  componentDidUpdate(prevProps) {
    const { loginUserResult } = this.props;

    if (loginUserResult && prevProps.loginUserResult !== loginUserResult) {
      Swal.fire({
        title: "Berhasil login",
        icon: "success",
      });
      setTimeout(() => {
        window.location = "/";
      }, 1500);
    }
  }

  render() {
    const { loginUserLoading, loginUserResult, loginUserError } = this.props;
    return (
      <div className="authenticationPage">
        <div className="row">
          <div className="col-6 sideKiriAuthenticationPage">
            <div className="container ">
              <div className="content1">
                <img src={Logo} alt="" style={{ width: "18%" }} />
                <p className="fw-semibold mt-3 fs-2">
                  Log in untuk nikmati semua <br /> keuntungannya!
                </p>
                <p className="caption2AuthenticationPage">
                  Sangat mudah berwisata bersama Datacakra.
                </p>
              </div>

              <img className="animasiImage" src={Animasi} alt="" />
            </div>
          </div>
          <div className="col ">
            <div className="formAuthentication shadow-lg p-3 d-flex align-items-center justify-content-center">
              <div className="d-none d-md-block w-100 mb-5 containerFormAuthentication">
                <p className="fw-bold fs-5">Log in</p>
                <form onSubmit={(event) => this.handleLogin(event)}>
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
                  {loginUserLoading ? (
                    <button
                      type="submit"
                      className="btn fw-semibold button1 w-100 py-2"
                    >
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn fw-semibold button1 w-100 py-2"
                    >
                      Log In
                    </button>
                  )}
                </form>

                <div className="text-center mt-3">
                  <label>
                    Belum punya akun?{" "}
                    <a href="/register" style={{ color: "#308C88" }}>
                      <label className="fw-semibold">Daftar yuk!</label>
                    </a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUserLoading: state.AuthReducer.loginUserLoading,
  loginUserResult: state.AuthReducer.loginUserResult,
  loginUserError: state.AuthReducer.loginUserError,
});

export default connect(mapStateToProps, null)(Login);
