import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { getDataUser } from "../../store/actions/AuthAction";

export default function Profile() {
  const { getDataUserResult, getDataUserError, getDataUserLoading } =
    useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("idUser");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDataUser(idUser, token));
  }, [idUser, token, dispatch]);

  return (
    <div style={{ backgroundColor: "#1e1f26", minHeight: "100vh" }}>
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
                    src={getDataUserResult.avatar}
                    alt="foto profile"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                    }}
                  />
                </div>
                {/* >SM */}
                <div className="col d-none d-sm-block">
                  <div className="mt-4 detailTurisCaption">
                    <label style={{ color: "#818181" }}>Email :</label>
                    <br />
                    <label className="fs-5">{getDataUserResult.email}</label>
                    <br />
                    <label className="mt-2" style={{ color: "#818181" }}>
                      Nama :
                    </label>
                    <br />
                    <label className="fs-5">{getDataUserResult.name}</label>
                    <br />
                  </div>
                </div>

                {/* Xs */}
                <div className="col d-block d-sm-none">
                  <div className="mt-4 detailTurisCaption text-center">
                    <label className="fs-5">{getDataUserResult.name}</label>
                    <br />
                    <label style={{ color: "#818181" }}>
                      {getDataUserResult.email}
                    </label>
                    <br />
                    <br />
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
