import {
  GET_TOURIST,
  CREATE_TOURIST,
  GET_DETAIL_TOURIST,
  UPDATE_TOURIST,
  DELETE_TOURIST,
} from "../../actions/TouristAction";

const initialState = {
  getAllDataTouristLoading: false,
  getAllDataTouristResult: false,
  getAllDataTouristError: false,

  createDataTouristLoading: false,
  createDataTouristResult: false,
  createDataTouristError: false,

  getTouristByIdLoading: false,
  getTouristByIdResult: false,
  getTouristByIdError: false,

  updateDataTouristLoading: false,
  updateDataTouristResult: false,
  updateDataTouristError: false,

  deleteDataTouristLoading: false,
  deleteDataTouristResult: false,
  deleteDataTouristError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOURIST:
      return {
        ...state,
        getAllDataTouristLoading: action.payload.loading,
        getAllDataTouristResult: action.payload.data,
        getAllDataTouristError: action.payload.errorMessage,
      };

    case CREATE_TOURIST:
      return {
        ...state,
        createDataTouristLoading: action.payload.loading,
        createDataTouristResult: action.payload.data,
        createDataTouristError: action.payload.errorMessage,
      };

    case GET_DETAIL_TOURIST:
      return {
        ...state,
        getTouristByIdLoading: action.payload.loading,
        getTouristByIdResult: action.payload.data,
        getTouristByIdError: action.payload.errorMessage,
      };

    case UPDATE_TOURIST:
      return {
        ...state,
        updateDataTouristLoading: action.payload.loading,
        updateDataTouristResult: action.payload.data,
        updateDataTouristError: action.payload.errorMessage,
      };

    case DELETE_TOURIST:
      return {
        ...state,
        deleteDataTouristLoading: action.payload.loading,
        deleteDataTouristResult: action.payload.data,
        deleteDataTouristError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
