import React, { Component } from "react";
import {
  deleteTourist,
  getAllDataTourist,
} from "../../store/actions/TouristAction";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class ListDataTuris extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      page: 1,
      perPage: 10,
    };
  }

  componentDidMount() {
    const getToken = localStorage.getItem("token");
    const { page } = this.state;
    if (getToken) {
      this.setState(
        {
          login: true,
        },
        () => {
          this.props.dispatch(getAllDataTourist(getToken, page));
        }
      );
    }
  }

  handlePreviousPage = () => {
    const { page } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      this.setState({ page: newPage }, () => {
        const getToken = localStorage.getItem("token");
        this.props.dispatch(getAllDataTourist(getToken, newPage));
      });
    }
  };

  handleNextPage = () => {
    const { page } = this.state;

    if (page) {
      const newPage = page + 1;
      this.setState({ page: newPage }, () => {
        const getToken = localStorage.getItem("token");
        this.props.dispatch(getAllDataTourist(getToken, newPage));
      });
    }
  };

  handleTambahData = () => {
    const { login } = this.state;
    if (login === false) {
      Swal.fire({
        title: "Wajib login terlebih dahulu!",
        text: "Anda akan diarahkan ke halaman login",
        icon: "error",
        background: "#2c2e3e",
        color: "white",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location = "/login";
      }, 2500);
    } else {
      window.location = "/createTourist";
    }
  };

  handleDeleteTuris = (id, name) => {
    const getToken = localStorage.getItem("token");
    Swal.fire({
      title: `Apakah anda yakin?`,
      text: `menghapus data "${name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#308c88",
      cancelButtonColor: "#fe6e6f",
      confirmButtonText: "Iya, hapus data!",
      background: "#2c2e3e",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `Data "${name}" berhasil dihapus.`,
          icon: "success",
          background: "#2c2e3e",
          color: "white",
          showConfirmButton: false,
        });
        this.props.dispatch(deleteTourist(id, getToken));
      }
    });
  };

  componentDidUpdate(prevProps) {
    const { deleteDataTouristResult } = this.props;
    if (
      deleteDataTouristResult &&
      prevProps.deleteDataTouristResult !== deleteDataTouristResult
    ) {
      const getToken = localStorage.getItem("token");
      this.props.dispatch(getAllDataTourist(getToken, this.state.page));
    }
  }

  render() {
    const {
      getAllDataTouristResult,
      getAllDataTouristError,
      getAllDataTouristLoading,
    } = this.props;

    return (
      <div>
        {/* Layar >LG */}
        <div className="container">
          <div className="container-form p-3 mb-5 mt-5 d-none d-lg-block">
            <div className="d-flex justify-content-between my-4 px-5">
              <div>
                <p className="text-center fs-3 fw-bold  ">
                  Biro Perjalanan Datacakra
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-tambahData fw-semibold"
                  onClick={() => this.handleTambahData()}
                >
                  + Tambah Data Turis
                </button>
              </div>
            </div>

            <div className="mx-5 container-dataTuris">
              <div
                className="row text-center fw-semibold"
                style={{ color: "#818181" }}
              >
                <div className="col-1">
                  <p>No</p>
                </div>
                <div className="col">
                  <p>Nama</p>
                </div>
                <div className="col">
                  <p>Email</p>
                </div>
                <div className="col">
                  <p>Lokasi</p>
                </div>
                <div className="col">
                  <p>Aksi</p>
                </div>
              </div>
              {getAllDataTouristResult.data ? (
                getAllDataTouristResult.data.map((tourist, index) => (
                  <div
                    className="row text-center listDataTuris mb-3 "
                    key={index + 1}
                  >
                    <div className="col-1 pt-3">
                      <p>
                        {(this.state.page - 1) * this.state.perPage +
                          index +
                          1 +
                          "."}
                      </p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_name}</p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_email}</p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_location}</p>
                    </div>
                    <div className="col pt-2 ">
                      <a
                        href={`/detail/${tourist.id}`}
                        className="fw-semibold linkButtonDetail"
                      >
                        <button type="button" className="btn btn-detail  me-3">
                          <i class="bi bi-eye-fill"></i>
                        </button>
                      </a>
                      <a
                        href={`/update/${tourist.id}`}
                        className="fw-bold linkButtonEdit "
                      >
                        <button type="button" className="btn btn-edit me-3">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </a>

                      <a className="linkButtonDelete">
                        <button
                          className="btn btn-delete fw-semibold"
                          onClick={() =>
                            this.handleDeleteTuris(
                              tourist.id,
                              tourist.tourist_name
                            )
                          }
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                ))
              ) : getAllDataTouristLoading ? (
                <p className="text-center my-5">Loading . . .</p>
              ) : getAllDataTouristError ? (
                <p className="text-center my-5">{getAllDataTouristError}</p>
              ) : (
                <p className="text-center my-5">
                  Data tidak ditemukan, silahkan login terlebih dahulu!
                </p>
              )}
            </div>
            <br />

            <div className="d-flex justify-content-center align-items-center">
              <div>
                <button
                  className="buttonPagination"
                  onClick={() => this.handlePreviousPage()}
                >
                  Previous
                </button>
              </div>
              <div className="mx-3">
                <p className="fw-semibold captionPagination">
                  {this.state.page}
                </p>
              </div>
              <div>
                <button
                  className="buttonPagination"
                  onClick={() => this.handleNextPage()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layar >MD && <LG */}
        <div className="mx-5">
          <div className="container-form p-3 mb-5 mt-5 d-none d-md-block d-lg-none">
            <div className="d-flex justify-content-between my-4 ">
              <div>
                <p className="fs-5 ms-3 fw-bold">Biro Perjalanan Datacakra</p>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-tambahData fw-semibold"
                  onClick={() => this.handleTambahData()}
                >
                  + Tambah Data Turis
                </button>
              </div>
            </div>

            <div className="mx-3 container-dataTuris">
              <div
                className="row text-center fw-semibold"
                style={{ color: "#818181" }}
              >
                <div className="col-1">
                  <p>No</p>
                </div>
                <div className="col">
                  <p>Nama</p>
                </div>
                <div className="col">
                  <p>Email</p>
                </div>
                <div className="col">
                  <p>Lokasi</p>
                </div>
                <div className="col">
                  <p>Aksi</p>
                </div>
              </div>
              {getAllDataTouristResult.data ? (
                getAllDataTouristResult.data.map((tourist, index) => (
                  <div
                    className="row text-center listDataTuris mb-3 "
                    key={index + 1}
                  >
                    <div className="col-1 pt-3">
                      <p>{index + 1 + index + "."}</p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_name}</p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_email}</p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_location}</p>
                    </div>
                    <div className="col pt-2 ">
                      <a
                        href={`/detail/${tourist.id}`}
                        className="fw-semibold linkButtonDetail"
                      >
                        <button type="button" className="btn btn-detail  me-2">
                          <i class="bi bi-eye-fill"></i>
                        </button>
                      </a>
                      <a
                        href={`/update/${tourist.id}`}
                        className="fw-bold linkButtonEdit "
                      >
                        <button type="button" className="btn btn-edit me-2">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </a>

                      <a className="linkButtonDelete">
                        <button
                          className="btn btn-delete fw-semibold"
                          onClick={() =>
                            this.handleDeleteTuris(
                              tourist.id,
                              tourist.tourist_name
                            )
                          }
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                ))
              ) : getAllDataTouristLoading ? (
                <p className="text-center my-5">Loading . . .</p>
              ) : getAllDataTouristError ? (
                <p className="text-center my-5">{getAllDataTouristError}</p>
              ) : (
                <p className="text-center my-5">
                  Data tidak ditemukan, silahkan login terlebih dahulu!
                </p>
              )}
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <button
                  className="buttonPagination"
                  onClick={() => this.handlePreviousPage()}
                >
                  Previous
                </button>
              </div>
              <div className="mx-3">
                <p className="fw-semibold captionPagination">
                  {this.state.page}
                </p>
              </div>
              <div>
                <button
                  className="buttonPagination"
                  onClick={() => this.handleNextPage()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SM */}
        <div className="mx-5">
          <div className="container-form p-3 mb-5 mt-5 d-none d-sm-block d-md-none ">
            <div className="d-flex justify-content-between my-4 ">
              <div>
                <p className="fs-6  ms-3 fw-bold">Biro Perjalanan Datacakra</p>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-tambahData fw-semibold"
                  onClick={() => this.handleTambahData()}
                >
                  + Tambah Data Turis
                </button>
              </div>
            </div>
            {/*  */}

            <div className="">
              <div
                className="row text-center fw-semibold"
                style={{ color: "#818181" }}
              >
                <div className="col-1">
                  <p>No</p>
                </div>
                <div className="col">
                  <p>Nama</p>
                </div>
                <div className="col">
                  <p>Email</p>
                </div>
                <div className="col">
                  <p>Lokasi</p>
                </div>
                <div className="col-4 ">
                  <p>Aksi</p>
                </div>
              </div>
              {getAllDataTouristResult.data ? (
                getAllDataTouristResult.data.map((tourist, index) => (
                  <div
                    className="row text-center listDataTuris mb-3 "
                    key={index + 1}
                  >
                    <div className="col-1 pt-3">
                      <p>{index + 1 + index + "."}</p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_name}</p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_email}</p>
                    </div>
                    <div className="col pt-3">
                      <p>{tourist.tourist_location}</p>
                    </div>
                    <div className="col-4  pt-2 ">
                      <a
                        href={`/detail/${tourist.id}`}
                        className="fw-semibold linkButtonDetail"
                      >
                        <button type="button" className="btn btn-detail me-1">
                          <i class="bi bi-eye-fill"></i>
                        </button>
                      </a>
                      <a
                        href={`/update/${tourist.id}`}
                        className="fw-bold linkButtonEdit "
                      >
                        <button type="button" className="btn btn-edit me-1">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </a>

                      <a className="linkButtonDelete">
                        <button
                          className="btn btn-delete fw-semibold"
                          onClick={() =>
                            this.handleDeleteTuris(
                              tourist.id,
                              tourist.tourist_name
                            )
                          }
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                ))
              ) : getAllDataTouristLoading ? (
                <p className="text-center my-5">Loading . . .</p>
              ) : getAllDataTouristError ? (
                <p className="text-center my-5">{getAllDataTouristError}</p>
              ) : (
                <p className="text-center my-5">
                  Data tidak ditemukan, silahkan login terlebih dahulu!
                </p>
              )}
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <button
                  className="buttonPagination"
                  onClick={() => this.handlePreviousPage()}
                >
                  Previous
                </button>
              </div>
              <div className="mx-3">
                <p className="fw-semibold captionPagination">
                  {this.state.page}
                </p>
              </div>
              <div>
                <button
                  className="buttonPagination"
                  onClick={() => this.handleNextPage()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* XS */}
        <div className="d-block d-sm-none">
          <div className="d-flex justify-content-between align-items-center my-4 mx-3 ">
            <div>
              <p className="fs-5 fw-bold textCaptionUtama">
                Biro Perjalanan <br /> Datacakra
              </p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-tambahData fw-semibold"
                onClick={() => this.handleTambahData()}
              >
                +
              </button>
            </div>
          </div>

          <div
            className="row text-center fw-semibold"
            style={{ color: "#818181" }}
          >
            <div className="col-4">
              <p>Nama</p>
            </div>
            <div className="col-4">
              <p>Email</p>
            </div>
            <div className="col-4">
              <p>Lokasi</p>
            </div>
          </div>
          <div className="mx-1">
            {getAllDataTouristResult.data ? (
              getAllDataTouristResult.data.map((tourist, index) => (
                <div
                  className=" text-center listDataTuris mb-3 "
                  key={index + 1}
                >
                  <div className="row">
                    <div className="col-4 pt-3">
                      <p style={{ fontSize: "0.55em" }}>
                        {tourist.tourist_name}
                      </p>
                    </div>
                    <div className="col-4 pt-3">
                      <p style={{ fontSize: "0.55em" }}>
                        {tourist.tourist_email}
                      </p>
                    </div>
                    <div className="col-4 pt-3">
                      <p style={{ fontSize: "0.55em" }}>
                        {tourist.tourist_location}
                      </p>
                    </div>
                    <div className="col-12 pb-3">
                      <a
                        href={`/detail/${tourist.id}`}
                        className="fw-semibold linkButtonDetail"
                      >
                        <button type="button" className="btn btn-detail me-3">
                          <i class="bi bi-eye-fill"></i>
                        </button>
                      </a>
                      <a
                        href={`/update/${tourist.id}`}
                        className="fw-bold linkButtonEdit "
                      >
                        <button type="button" className="btn btn-edit me-3">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </a>

                      <a className="linkButtonDelete">
                        <button
                          className="btn btn-delete fw-semibold"
                          onClick={() =>
                            this.handleDeleteTuris(
                              tourist.id,
                              tourist.tourist_name
                            )
                          }
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : getAllDataTouristLoading ? (
              <p className="text-center my-5" style={{ color: "#fff" }}>
                Loading . . .
              </p>
            ) : getAllDataTouristError ? (
              <p className="text-center my-5" style={{ color: "#fff" }}>
                {getAllDataTouristError}
              </p>
            ) : (
              <p className="text-center my-5" style={{ color: "#fff" }}>
                Data tidak ditemukan, silahkan login terlebih dahulu!
              </p>
            )}
          </div>
          <br />
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <button
                className="buttonPagination"
                onClick={() => this.handlePreviousPage()}
              >
                Previous
              </button>
            </div>
            <div className="mx-3">
              <p className="fw-semibold captionPagination">{this.state.page}</p>
            </div>
            <div>
              <button
                className="buttonPagination"
                onClick={() => this.handleNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getAllDataTouristLoading: state.TouristReducer.getAllDataTouristLoading,
  getAllDataTouristResult: state.TouristReducer.getAllDataTouristResult,
  getAllDataTouristError: state.TouristReducer.getAllDataTouristError,

  deleteDataTouristLoading: state.TouristReducer.deleteDataTouristLoading,
  deleteDataTouristResult: state.TouristReducer.deleteDataTouristResult,
  deleteDataTouristError: state.TouristReducer.deleteDataTouristError,
});

export default connect(mapStateToProps, null)(ListDataTuris);
