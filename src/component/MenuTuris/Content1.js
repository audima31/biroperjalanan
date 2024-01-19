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
    };
  }

  componentDidMount() {
    const getToken = localStorage.getItem("token");
    this.props.dispatch(getAllDataTourist(getToken));
  }

  handlePageClick = (data) => {
    this.setState({ currentPage: data.selected });
  };

  handleDeleteTuris = (id, name) => {
    const getToken = localStorage.getItem("token");
    Swal.fire({
      title: `Apakah anda yakin?`,
      text: `menghapus data "${name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, hapus data!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `Data "${name}" berhasil dihapus.`, "success");
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
      <div
        className="container shadow p-3 mb-5 bg-white rounded-4 mt-5"
        style={{ backgroundColor: "#8d7f84" }}
      >
        <p className="text-center fs-1 fw-bold my-4 mb-5">
          Biro Perjalanan Datacakra
        </p>
        <a href="/createTourist" className="linkButtonTambahData">
          <button
            type="button"
            className="btn btn-tambahData px-4 mb-5 ms-5 fw-semibold "
          >
            Tambah Data Turis
          </button>
        </a>
        <div className="mx-5">
          <div className="row text-center fw-semibold">
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
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </a>
                  </div>
                </div>
              ))
          ) : getAllDataTouristLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="5">{getAllDataTouristError}</td>
            </tr>
          )}
        </div>
        <br />
        {/* Pagination */}
        {getAllDataTouristResult.data && (
          <ReactPaginate
            previousLabel={
              <span className="fw-semibold previousText">Previous</span>
            }
            nextLabel={<span className="fw-semibold previousText">Next</span>}
            breakClassName={"break-me"}
            pageCount={Math.ceil(getAllDataTouristResult.data.length / perPage)}
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
