import { combineReducers } from "redux";
import userReducer from "./userReducer";
import photoReducer from "./photoReducer";

export default combineReducers({
  userReducer,
  photoReducer,
});

export type RootState = ReturnType<typeof combineReducers>;
