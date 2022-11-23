import { Link } from "react-router-dom";

const Side = () => {
  return (
    <div className="sidebar" id="sidebar">
      <ul>
        <div className="li-space">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
        </div>

        <div className="li-space">
          <li>
            <Link to="/UsersList">Get Users Page</Link>
          </li>
        </div>

        <div className="li-space">
          <li>
            <Link to="/PhotosList">Get Photos Page</Link>
          </li>
        </div>

        {/* <div className="li-space">
          <li>
            <Link to="/TrelloList1">
              Trello List Clone: Drag and dropping between one list
            </Link>
          </li>
        </div> */}

        <div className="li-space">
          <li>
            <Link to="/TrelloList2">
              Trello List Clone: Drag and dropping between two list
            </Link>
          </li>
        </div>

        <div className="li-space">
          <li>
            <Link to="/Webcam">Webcam Capture</Link>
          </li>
        </div>

        <div className="li-space">
          <li>
            <Link to="/VirtualRealityCubeMapImg/Object-Rotation-Helpers">
              Vr Implementation: Object with Orbit Controls, Lights, and Helpers
            </Link>
          </li>
        </div>

        <div className="li-space">
          <li>
            <Link to="/VirtualRealityCubeMapImg/Plane-Text-Lights-Shadows-Model">
              Vr Implementation: Adding Text with Shadows
            </Link>
          </li>
        </div>

        <div className="li-space">
          <li>
            <Link to="/VirtualRealityEquirectangularImg-W-Text">
              VR Implementation: 360 Image
            </Link>
          </li>
        </div>

        <div className="li-space">
          <li>
            <Link to="/VirtualRealityVideo">
              VR Implementation: Adding a Video
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Side;
