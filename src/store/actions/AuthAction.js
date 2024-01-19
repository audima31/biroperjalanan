import Swal from "sweetalert2";
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from "../../utils/dispatch";
import axios from "axios";

const API_URL = "https://biroperjalanan.datacakra.com";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";

export const loginUser = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_USER);

    // Ambil API
    axios
      .post(API_URL + "/api/authaccount/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        // Jika login berhasil dan mendapatkan token
        if (response.data.data.Token) {
          const token = response.data.data.Token;
          const idUser = response.data.data.Id;

          localStorage.setItem("token", token);
          localStorage.setItem("idUser", idUser);

          dispatchSuccess(dispatch, LOGIN_USER, response.data.data);
        }
      })
      .catch((error) => {
        // Bila terjadi error
        console.log("ERROR: ", error);
        Swal.fire({
          title: "Akun tidak terdaftar",
          icon: "error",
          background: "#2c2e3e",
          color: "white",
        });

        dispatchError(dispatch, LOGIN_USER, error);
      });
  };
};

export const registerUser = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, REGISTER_USER);

    // Ambil API
    axios
      .post(API_URL + "/api/authaccount/registration", {
        email: data.email,
        password: data.password,
        name: data.name,
      })
      .then((response) => {
        // Jika login berhasil dan mendapatkan token
        if (response.data) {
          console.log("Data :", data);
          dispatchSuccess(dispatch, REGISTER_USER, response.data.data);
        }
      })
      .catch((error) => {
        // Bila terjadi error
        if (error.response.data.statusCode === 409) {
          Swal.fire({
            title: "Data email telah terdaftar",
            icon: "error",
            background: "#2c2e3e",
            color: "white",
          });
        } else if (error.response.data.statusCode === 400) {
          Swal.fire({
            title: "Data email tidak sesuai!",
            icon: "error",
            background: "#2c2e3e",
            color: "white",
          });
        }

        dispatchError(dispatch, REGISTER_USER, error);
      });
  };
};
