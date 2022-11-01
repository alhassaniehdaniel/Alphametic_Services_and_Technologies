import { GET_ALL_USERS_SUCCESS } from "../actions/userAction";

const initialState = [] as any;

const usersReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_USERS_SUCCESS:
      console.log("reducer");
      return payload;

    default:
      return state;
  }
};

export default usersReducer;
