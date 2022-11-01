import { httpCommon } from "./http-common";

const getAllPhotos = () => {
  return httpCommon.get("/photos/");
};

const getPhotoById = (id: number) => {
  return httpCommon.get(`/photos/${id}`);
};

const PhotoService = {
  getAllPhotos,
  getPhotoById,
};

export default PhotoService;
