//CSS
import "./Webcam.css";

//MUI
import { Button } from "@mui/material";

//React-Webcam
import Webcam from "react-webcam";

//Hooks
import { useCallback, useRef, useState } from "react";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};
const Capture = () => {
  const webcamRef = useRef<any>(null);

  const [url, setUrl] = useState(null);
  //Using Callback Hook to capture photo, useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. In this case the webcamRef
  const capturePhoto = useCallback(async () => {
    if (webcamRef.current != null) {
      //insuring that webcamRef.current isn't null
      const imageSrc = webcamRef.current.getScreenshot();
      //we set the url to the imageSrc we got from the above call
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <h1>Webcam Capture</h1>
      <div className="flex">
        {/* To view webcam we simply use it as a component */}
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/webp"
          videoConstraints={videoConstraints}
          screenshotQuality={1}
          mirrored={true}
        />
        {/* if url is defined display image */}
        {url && (
          <div className="captured-photo">
            <img src={url} alt="Captured Picture" />
          </div>
        )}
        <br />
      </div>
      {/*Button onClick to call fn to capture photo */}
      <Button onClick={capturePhoto} variant="contained">
        Capture
      </Button>
      {/*Button onClick to call fn to reset photo url */}
      <Button
        sx={{ mx: "5px", my: "5px" }}
        onClick={() => setUrl(null)}
        variant="contained"
      >
        Reset
      </Button>
    </>
  );
};

export default Capture;
