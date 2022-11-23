import "../index.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PhotoService from "../services/photoService";

// Thunks
import { getAllPhotosRequest } from "../store/thunks/photoThunk";

// Selectors
import { getAllPhotosSelector } from "../store/selectors/photoSelector";

//MUI
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import { styled } from "@mui/material/styles";
// import { render } from "@testing-library/react";

// Images
import Image1 from "../assets/NewImages/92c952.png";

type UserType = {
  id: number;
  title: string;
  url: any;
};

function PhotosList() {
  const dispatch = useDispatch<any>();

  // redux states
  const photosList = useSelector((state: any) => getAllPhotosSelector(state));
  console.log("photosList", photosList);

  // the Local State

  const [isLoading, setLoading] = useState(false);

  const getAllPhotos = () => {
    photosList.length === 0 && dispatch(getAllPhotosRequest());

    // });
  };

  let count = 0;
  useEffect(() => {
    count === 0 && getAllPhotos();
  }, []);

  return (
    <>
      <div className="photos-list-container">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <>
            {/* list of users */}
            <h2>Photos List</h2>
            <p>
              Here I used Axios to call api and get and show photos with title
              from a link
            </p>
            {photosList &&
              photosList.slice(0, 5).map((photo: UserType) => (
                <div className="photo-preview" key={photo.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      className="img-size"
                      component="img"
                      height="194"
                      image={Image1}
                    />
                    <img src="" alt="" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {photo.title}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* <img src={photo.url} alt="" /> */}
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}
export default PhotosList;
