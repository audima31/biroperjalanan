import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTouristById } from "../../store/actions/TouristAction";
import Navbar from "../Navbar/Navbar";

function DetailTuris() {
  const { id } = useParams();
  const { getTouristByIdLoading, getTouristByIdResult, getTouristByIdError } =
    useSelector((state) => state.TouristReducer);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTouristById(id, token));
  }, [id, token, dispatch]);

  return (
    <div style={{ backgroundColor: "#1e1f26", height: "100vh" }}>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-12 col-sm-10 col-lg-8 col-xl-7">
            <div className="container-form p-3 mb-5 mt-5">
              <div className="row ">
                <div className="col-12 col-sm-6 col-md-5 col-lg-5 col-xl-4">
                  <a className=" btn-kembali" onClick={() => navigate(-1)}>
                    <span className="bi bi-arrow-left ">
                      <span className="ms-2">Kembali</span>
                    </span>
                  </a>
                  <img
                    className="mt-4"
                    src={getTouristByIdResult.tourist_profilepicture}
                    alt="foto profile"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                    }}
                  />
                </div>
                {/* >SM */}
                <div className="col d-none d-sm-block">
                  <div className="d-flex flex-row-reverse">
                    <a
                      href={`/update/${getTouristByIdResult.id}`}
                      className="fw-bold linkButtonEdit "
                    >
                      <button type="button" className="btn btn-edit me-3">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                    </a>
                  </div>
                  <div className="mt-4 detailTurisCaption">
                    <label style={{ color: "#818181" }}>Email :</label>
                    <br />
                    <label className="fs-5">
                      {getTouristByIdResult.tourist_email}
                    </label>
                    <br />
                    <label className="mt-2" style={{ color: "#818181" }}>
                      Nama :
                    </label>
                    <br />
                    <label className="fs-5">
                      {getTouristByIdResult.tourist_name}
                    </label>
                    <br />
                    <label className="mt-2" style={{ color: "#818181" }}>
                      Lokasi :
                    </label>
                    <br />
                    <label className="fs-5">
                      {getTouristByIdResult.tourist_location}
                    </label>
                  </div>
                </div>

                {/* Xs */}
                <div className="col d-block d-sm-none">
                  <div className="mt-4 detailTurisCaption">
                    <div className="d-flex justify-content-between">
                      <label style={{ color: "#818181" }}>Email :</label>
                      <a
                        href={`/update/${getTouristByIdResult.id}`}
                        className="fw-bold linkButtonEdit "
                      >
                        <button type="button" className="btn btn-edit me-3">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </a>
                    </div>
                    <label>{getTouristByIdResult.tourist_email}</label>
                    <br />
                    <label style={{ color: "#818181" }}>Nama :</label>
                    <br />
                    <label className="fs-5">
                      {getTouristByIdResult.tourist_name}
                    </label>
                    <br />
                    <label style={{ color: "#818181" }}>Lokasi :</label>
                    <br />
                    <label className="fs-5">
                      {getTouristByIdResult.tourist_location}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default DetailTuris;
