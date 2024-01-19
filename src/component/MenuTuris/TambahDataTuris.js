import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import { createTourist } from "../../store/actions/TouristAction";
import { connect } from "react-redux";
import Footer from "../Navbar/Footer";

class TambahDataTuris extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourist_email: "",
      tourist_location: "",
      tourist_name: "",
      token: "",
    };
  }

  componentDidMount() {
    const getToken = localStorage.getItem("token");
    this.setState({
      token: getToken,
    });
  }

  handleEmail(event) {
    this.setState({
      tourist_email: event.target.value,
    });
  }

  handleLocation(event) {
    this.setState({
      tourist_location: event.target.value,
    });
  }

  handleName(event) {
    this.setState({
      tourist_name: event.target.value,
    });
  }

  handleTambahDataTuris(event) {
    const { tourist_email, tourist_location, tourist_name, token } = this.state;
    event.preventDefault();

    const dataTourist = {
      tourist_email,
      tourist_location,
      tourist_name,
    };

    if (!tourist_email) {
      Swal.fire({
        icon: "error",
        text: "Masukan email terlebih dahulu!",
        background: "#2c2e3e",
        color: "white",
      });
    } else if (!tourist_location) {
      Swal.fire({
        icon: "error",
        text: "Masukan location terlebih dahulu!",
        background: "#2c2e3e",
        color: "white",
      });
    } else if (!tourist_name) {
      Swal.fire({
        icon: "error",
        text: "Masukan nama anda terlebih dahulu!",
        background: "#2c2e3e",
        color: "white",
      });
    } else {
      this.props.dispatch(createTourist(dataTourist, token));
    }
  }

  componentDidUpdate(prevProps) {
    const { createDataTouristResult } = this.props;

    if (
      createDataTouristResult &&
      prevProps.createDataTouristResult !== createDataTouristResult
    ) {
      Swal.fire({
        title: "Penambahan Data Turis Telah Berhasil!",
        icon: "success",
        background: "#2c2e3e",
        color: "white",
      });
      setTimeout(() => {
        window.location = "/";
      }, 1500);
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: "#1e1f26", height: "100vh" }}>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col-6">
              <div className="container-form p-3 mb-5 px-5 py-5">
                <a href="/" className="btn-kembali">
                  <span class="bi bi-arrow-left ">
                    <span className="ms-2 ">Kembali</span>
                  </span>
                </a>

                <p className="fs-4 text-start fw-bold my-4">
                  Tambah Data Turis Baru
                </p>

                <form onSubmit={(event) => this.handleTambahDataTuris(event)}>
                  <div className="mt-4 mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control py-3"
                      id="exampleFormControlInput1"
                      name="email"
                      onChange={(event) => this.handleEmail(event)}
                    ></input>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      className="form-control py-3"
                      id="exampleFormControlInput2"
                      name="name"
                      onChange={(event) => this.handleName(event)}
                    ></input>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Lokasi"
                      className="form-control py-3"
                      id="exampleFormControlInput2"
                      name="location"
                      onChange={(event) => this.handleLocation(event)}
                    ></input>
                  </div>

                  <button
                    type="submit"
                    className="btn fw-semibold button1 w-100 py-3 mb-4 mt-3"
                  >
                    Tambah Data
                  </button>
                </form>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  createDataTouristLoading: state.TouristReducer.createDataTouristLoading,
  createDataTouristResult: state.TouristReducer.createDataTouristResult,
  createDataTouristError: state.TouristReducer.createDataTouristError,
});

export default connect(mapStateToProps, null)(TambahDataTuris);
