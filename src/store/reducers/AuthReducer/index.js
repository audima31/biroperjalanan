import {
  LOGIN_USER,
  REGISTER_USER,
  GET_DATA_USER,
} from "../../actions/AuthAction";

const initialState = {
  loginUserLoading: false,
  loginUserResult: false,
  loginUserError: false,

  registerUserLoading: false,
  registerUserResult: false,
  registerUserError: false,

  getDataUserLoading: false,
  getDataUserResult: false,
  getDataUserError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginUserLoading: action.payload.loading,
        loginUserResult: action.payload.data,
        loginUserError: action.payload.errorMessage,
      };

    case REGISTER_USER:
      return {
        ...state,
        registerUserLoading: action.payload.loading,
        registerUserResult: action.payload.data,
        registerUserError: action.payload.errorMessage,
      };

    case GET_DATA_USER:
      return {
        ...state,
        getDataUserLoading: action.payload.loading,
        getDataUserResult: action.payload.data,
        getDataUserError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
