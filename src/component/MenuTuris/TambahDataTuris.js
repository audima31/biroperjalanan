import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import { createTourist } from "../../store/actions/TouristAction";
import { connect } from "react-redux";

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
      });
    } else if (!tourist_location) {
      Swal.fire({
        icon: "error",
        text: "Masukan location terlebih dahulu!",
      });
    } else if (!tourist_name) {
      Swal.fire({
        icon: "error",
        text: "Masukan nama anda terlebih dahulu!",
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
      });
      // setTimeout(() => {
      //   window.location = "/dataTuris";
      // }, 1500);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <div className="shadow  p-3 mb-5 bg-white rounded-4 px-5 py-5">
            <a href="/dataTuris" className="fs-5">
              <span class="bi bi-arrow-left ">
                <span className="ms-2 ">Kembali</span>
              </span>
            </a>

            <p
              className="fs-4 text-start fw-bold my-4"
              style={{ color: "#303135" }}
            >
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