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
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-3 shadow p-3 mb-5 bg-white rounded-4 mt-5 text-center">
            <img
              src={getTouristByIdResult.tourist_profilepicture}
              alt=""
              style={{ width: "50%" }}
            />
          </div>
          <div className="col ms-3 shadow p-3 mb-5 bg-white rounded-4 mt-5">
            <p>Test</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailTuris;
