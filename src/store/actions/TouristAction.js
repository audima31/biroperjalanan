import Swal from "sweetalert2";
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from "../../utils/dispatch";
import axios from "axios";

const API_URL = "https://biroperjalanan.datacakra.com";
export const GET_TOURIST = "GET_TOURIST";
export const GET_DETAIL_TOURIST = "GET_DETAIL_TOURIST";
export const CREATE_TOURIST = "CREATE_TOURIST";
export const UPDATE_TOURIST = "UPDATE_TOURIST";
export const DELETE_TOURIST = "DELETE_TOURIST";

export const getAllDataTourist = (getToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_TOURIST);

    axios
      .get(API_URL + "/api/Tourist?page=205", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        const dataAPI = response.data;
        if (dataAPI) {
          console.log("Data :", dataAPI);
          dispatchSuccess(dispatch, GET_TOURIST, dataAPI);
        }
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        dispatchError(dispatch, GET_TOURIST, error);
      });
  };
};

export const getTouristById = (idTuris, token) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_TOURIST);

    axios
      .get(API_URL + `/api/Tourist/${idTuris}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const dataAPI = response.data;
        if (dataAPI) {
          dispatchSuccess(dispatch, GET_DETAIL_TOURIST, dataAPI);
        }
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        dispatchError(dispatch, GET_DETAIL_TOURIST, error);
      });
  };
};

export const createTourist = (dataTourist, token) => {
  return (dispatch) => {
    dispatchLoading(dispatch, CREATE_TOURIST);
    axios
      .post(API_URL + `/api/Tourist`, dataTourist, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response Create Tourist : ", response.data);
        dispatchSuccess(dispatch, CREATE_TOURIST, response.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "Penambahan Data Turis Gagal!",
          icon: "error",
        });
        dispatchError(dispatch, CREATE_TOURIST, "Error");
      });
  };
};

export const updateTourist = (dataTourist, token) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_TOURIST);

    axios
      .put(API_URL + `/api/Tourist/${dataTourist.id}`, dataTourist, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatchSuccess(dispatch, UPDATE_TOURIST, response.data);
        Swal.fire({
          title: "Penambahan Data Turis Telah Berhasil!",
          icon: "success",
        });
        setTimeout(() => {
          window.location = "/";
        }, 1500);
      })
      .catch((error) => {
        Swal.fire({
          title: "Perubahan Data Turis Gagal!",
          icon: "error",
        });
        dispatchError(dispatch, UPDATE_TOURIST, "Error");
      });
  };
};

export const deleteTourist = (id, token) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_TOURIST);

    axios
      .delete(API_URL + `/api/Tourist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatchSuccess(dispatch, DELETE_TOURIST, response.data);
      })
      .catch((error) => {
        Swal.alert({
          title: "Gagal hapus data turis!",
          text: "Mohon maaf, terjadi kesalahan dalam server",
          icon: "error",
        });
        console.log("Error delete turis : ", error);
        dispatchError(dispatch, DELETE_TOURIST, error);
      });
  };
};
