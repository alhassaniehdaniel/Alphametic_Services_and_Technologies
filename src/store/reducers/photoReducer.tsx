import { GET_ALL_PHOTOS_SUCCESS } from "../actions/photoAction";

const initialState = [] as any;

const photosReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PHOTOS_SUCCESS:
      console.log("reducer");
      return payload;

    default:
      return state;
  }
};

export default photosReducer;
