// services
import PhotoService from "../../services/photoService";

// actions
import { getAllPhotosSuccess } from "../actions/photoAction";

export const getAllPhotosRequest = () => (dispatch: any) => {
  try {
    //   show loading
    PhotoService.getAllPhotos().then((response: any) => {
      // console.log("response.data", response.data);
      console.log("Thunk success");
      // remove loading
      // success
      dispatch(getAllPhotosSuccess(response.data));
    });
  } catch (error) {
    //   remove loading
    //   failed
    console.log("error", error);
  }
};
