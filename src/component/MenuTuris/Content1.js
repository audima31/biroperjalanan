import React, { Component } from "react";
import {
  deleteTourist,
  getAllDataTourist,
} from "../../store/actions/TouristAction";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Content1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      perPage: 5,
      login: false,
    };
  }

  componentDidMount() {
    const getToken = localStorage.getItem("token");
    console.log("login sebelum:", this.state.login);

    if (getToken) {
      this.setState(
        {
          login: true,
        },
        () => {
          console.log("login setelah:", this.state.login);
          this.props.dispatch(getAllDataTourist(getToken));
        }
      );
    } else {
      this.setState({
        login: false,
      });
    }
  }

  handlePageClick = (data) => {
    this.setState({ currentPage: data.selected });
  };

  handleTambahData = () => {
    const { login } = this.state;
    if (login === false) {
      Swal.fire({
        title: "Wajib login terlebih dahulu!",
        text: "Anda akan diarahkan ke halaman login",
        icon: "error",
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
      this.props.dispatch(getAllDataTourist(getToken));
    }
  }

  render() {
    const {
      getAllDataTouristResult,
      getAllDataTouristError,
      getAllDataTouristLoading,
    } = this.props;

    const { currentPage, perPage } = this.state;
    const offset = currentPage * perPage;

    return (
      <div style={{ height: "100vh" }}>
        <div className="container">
          <div className="container-form p-3 mb-5 mt-5">
            <div className="d-flex justify-content-between my-4 px-5">
              <p className="text-center fs-3 fw-bold  ">
                Biro Perjalanan Datacakra
              </p>
              <button
                type="button"
                className="btn btn-tambahData fw-semibold"
                onClick={() => this.handleTambahData()}
              >
                + Tambah Data Turis
              </button>
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
                getAllDataTouristResult.data
                  .slice(offset, offset + perPage)
                  .map((tourist, index) => (
                    <div
                      className="row text-center listDataTuris mb-3 "
                      key={index + 1}
                    >
                      <div className="col-1 pt-3">
                        <p>{index + 1 + offset + "."}</p>
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
                          <button
                            type="button"
                            className="btn btn-detail  me-3"
                          >
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
            {/* Pagination */}
            {getAllDataTouristResult.data && (
              <ReactPaginate
                previousLabel={
                  <span className="fw-semibold previousText">Previous</span>
                }
                nextLabel={
                  <span className="fw-semibold previousText">Next</span>
                }
                breakClassName={"break-me"}
                pageCount={Math.ceil(
                  getAllDataTouristResult.data.length / perPage
                )}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"activePagination"}
                previousClassName={"previousClass"}
                nextClassName={"nextClass"}
              />
            )}
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

export default connect(mapStateToProps, null)(Content1);
