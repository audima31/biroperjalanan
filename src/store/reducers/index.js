import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import TouristReducer from "./TouristReducer";

const rootReducer = combineReducers({
  AuthReducer,
  TouristReducer,
});

export default rootReducer;
