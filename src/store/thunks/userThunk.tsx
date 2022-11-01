// services
import UserService from "../../services/userService";

// actions
import { getAllUsersSuccess } from "../actions/userAction";

export const getAllUsersRequest = () => (dispatch: any) => {
  try {
    //   show loading
    UserService.getAllUsers().then((response: any) => {
      // console.log("response.data", response.data);
      console.log("Thunk success");
      // remove loading
      // success
      dispatch(getAllUsersSuccess(response.data));
    });
  } catch (error) {
    //   remove loading
    //   failed
    console.log("error", error);
  }
};
