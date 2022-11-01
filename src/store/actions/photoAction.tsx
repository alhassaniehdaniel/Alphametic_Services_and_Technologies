export const GET_ALL_PHOTOS_SUCCESS = "GET_ALL_PHOTOS_SUCCESS";
export const getAllPhotosSuccess = (photos: any) => ({
  type: GET_ALL_PHOTOS_SUCCESS,
  payload: photos,
});
