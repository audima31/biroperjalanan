import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getTouristById,
  updateTourist,
} from "../../store/actions/TouristAction";
import Swal from "sweetalert2";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer";

export default function UpdateDataTuris() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [location, setLocation] = useState("");

  const { id } = useParams();
  const {
    updateDataTouristLoading,
    updateDataTouristResult,
    updateDataTouristError,
    getTouristByIdLoading,
    getTouristByIdResult,
    getTouristByIdError,
  } = useSelector((state) => state.TouristReducer);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  //Jalanin action
  useEffect(() => {
    dispatch(getTouristById(id, token));
  }, [id, token, dispatch]);

  // Mengisi data sebelumnya
  useEffect(() => {
    if (getTouristByIdResult) {
      if (getTouristByIdResult.tourist_name !== null) {
        setName(getTouristByIdResult.tourist_name);
      }
      if (getTouristByIdResult.tourist_email !== null) {
        setEmail(getTouristByIdResult.tourist_email);
      }
      if (getTouristByIdResult.tourist_location !== null) {
        setLocation(getTouristByIdResult.tourist_location);
      }
      if (getTouristByIdResult.tourist_profilepicture !== null) {
        setProfilePicture(getTouristByIdResult.tourist_profilepicture);
      }
    }
  }, [getTouristByIdResult]);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const dataTourist = {
      id: id,
      tourist_name: name,
      tourist_location: location,
      tourist_email: email,
      tourist_profilepicture: profilePicture,
    };

    dispatch(updateTourist(dataTourist, token));
  };

  useEffect(() => {
    if (getTouristByIdResult) {
      if (getTouristByIdResult.tourist_name !== null) {
        setName(getTouristByIdResult.tourist_name);
      }
      if (getTouristByIdResult.tourist_email !== null) {
        setEmail(getTouristByIdResult.tourist_email);
      }
      if (getTouristByIdResult.tourist_location !== null) {
        setLocation(getTouristByIdResult.tourist_location);
      }
      if (getTouristByIdResult.tourist_profilepicture !== null) {
        setProfilePicture(getTouristByIdResult.tourist_profilepicture);
      }
    }
  }, [getTouristByIdResult]);

  return (
    <div style={{ backgroundColor: "#1e1f26", height: "100vh" }}>
      <Navbar />
      <div className="container ">
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <div className="container-form p-3 mb-5 px-5 py-5">
              <a href="/">
                <span className="bi bi-arrow-left ">
                  <span className="ms-2">Kembali</span>
                </span>
              </a>

              <p className="fs-4 text-start fw-bold my-4">
                Update Data Turis Baru
              </p>

              <form onSubmit={(event) => handleUpdate(event)}>
                <div className="mt-4 mb-4">
                  <input
                    type="email"
                    className="form-control py-3"
                    id="exampleFormControlInput1"
                    name="email"
                    value={email}
                    onChange={(event) => handleEmail(event)}
                  ></input>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    className="form-control py-3"
                    id="exampleFormControlInput2"
                    name="name"
                    onChange={(event) => handleName(event)}
                  ></input>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="exampleFormControlInput2"
                    name="location"
                    value={location}
                    onChange={(event) => handleLocation(event)}
                  ></input>
                </div>

                <button
                  type="submit"
                  className="btn fw-semibold button1 w-100 py-3 mb-4 mt-3"
                >
                  Update Data
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
