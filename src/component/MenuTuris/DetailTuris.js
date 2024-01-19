import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTouristById } from "../../store/actions/TouristAction";
import Navbar from "../Navbar/Navbar";

function DetailTuris() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [location, setLocation] = useState("");

  const { id } = useParams();
  const { getTouristByIdLoading, getTouristByIdResult, getTouristByIdError } =
    useSelector((state) => state.TouristReducer);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getTouristById(id, token));
  }, [id, token, dispatch]);

  return (
    <div style={{ backgroundColor: "#1e1f26", height: "100vh" }}>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-9">
            <div className="container-form  ms-3 p-3 mb-5 mt-5">
              <div className="row ">
                <div className="col-4">
                  <a href="/">
                    <span class="bi bi-arrow-left ">
                      <span className="ms-2 mb-4">Kembali</span>
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
                <div className="col">
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
                    <p style={{ color: "#818181" }}>Email :</p>
                    <p className="fs-5">{getTouristByIdResult.tourist_email}</p>
                    <p style={{ color: "#818181" }}>Nama : </p>
                    <p className="fs-5">{getTouristByIdResult.tourist_name}</p>
                    <p style={{ color: "#818181" }}>Lokasi : </p>
                    <p className="fs-5">
                      {getTouristByIdResult.tourist_location}
                    </p>
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
