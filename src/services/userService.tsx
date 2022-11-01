import { httpCommon } from "./http-common";

const getAllUsers = () => {
  return httpCommon.get("/users/");
};

const getUserById = (id: number) => {
  return httpCommon.get(`/users/${id}`);
};

const UserService = {
  getAllUsers,
  getUserById,
};

export default UserService;
