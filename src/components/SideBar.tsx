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
            <Link to="/UsersList">Users Page</Link>
          </li>
        </div>
        <div className="li-space">
          <li>
            <Link to="/PhotosList">Photos Page</Link>
          </li>
        </div>
        <div className="li-space">
          <li>
            <Link to="/TrelloList1">TrelloList 1 list</Link>
          </li>
        </div>
        <div className="li-space">
          <li>
            <Link to="/TrelloList2">TrelloList 2 lists</Link>
          </li>
        </div>
        <div className="li-space">
          <li>
            <Link to="/Webcam">Webcam</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Side;
