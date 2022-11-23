import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import DashBoard from "./pages/DashBoard";

//Pages
import UsersList from "./pages/UsersList";
import PhotosList from "./pages/PhotosList";
import TrelloListC from "./pages/TrelloListFirst";
import TrelloList2 from "./pages/TrelloListSecond";
import Webcam from "./pages/Webcam";
import VRImplementationObject from "./pages/VRImplementationObject";
import VRImplementationText from "./pages/VRImplementationText";
import VRImplementationEquiImg from "./pages/VRImplementationEquiImg";
import VRImplementationVideo from "./pages/VRImplementationVideo";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <NavBar />

          <SideBar />

          <div className="main-content" id="main-content">
            <Routes>
              <Route path="/" element={<DashBoard />} />

              <Route path="/UsersList" element={<UsersList />} />

              <Route path="/PhotosList" element={<PhotosList />} />

              <Route path="/TrelloList1" element={<TrelloListC />} />

              <Route path="/TrelloList2" element={<TrelloList2 />} />

              <Route path="/Webcam" element={<Webcam />} />

              <Route
                path="//VirtualRealityCubeMapImg/Object-Rotation-Helpers"
                element={<VRImplementationObject />}
              />

              <Route
                path="/VirtualRealityCubeMapImg/Plane-Text-Lights-Shadows-Model"
                element={<VRImplementationText />}
              />

              <Route
                path="/VirtualRealityEquirectangularImg-W-Text"
                element={<VRImplementationEquiImg />}
              />

              <Route
                path="/VirtualRealityVideo"
                element={<VRImplementationVideo />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
