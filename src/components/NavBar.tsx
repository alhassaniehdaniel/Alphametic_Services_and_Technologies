import { ReactComponent as NotificationBell } from "../assets/bell.svg";
import { ReactComponent as ChatMessages } from "../assets/chat-left-text.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import AiImage from "../assets/ai-image.png";
//MUI
import Button from "@mui/material/Button";

//CSS
import "../index.css";

const Nav = () => {
  const name = "Daniel Al Hassanieh";
  const handleClick = (e: any) => {
    e.preventDefault();
    // e.SideBar.classList.toggle("min-sidebar");
    // e.DashBoard.classList.toggle("min-dashboard");
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.toggle("min-sidebar");
    const dashboard = document.getElementById("main-content");
    dashboard?.classList.toggle("min-main-content");
  };
  const ast = () => {};
  return (
    <nav className="navbar">
      <ul>
        <li className="nav-logo">
          <a href="https://ast-lb.com/">
            <Button variant="contained">
              Alphametic Services & Technologies
            </Button>
          </a>
        </li>
        <li>
          <a href="" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </a>
        </li>
        <li>
          <div className="Search-Input">
            <input type="text" placeholder="Search" />
            <SearchIcon className="Search-Icon"></SearchIcon>
          </div>
        </li>
      </ul>

      <ul>
        <li>
          <div className="div-tooltip">
            <NotificationBell className="Notification-Bell"></NotificationBell>
            <div className="focus-tooltip">
              <p className="tooltip-blue"> 4</p>
            </div>
          </div>
        </li>

        <li>
          <div className="div-tooltip">
            <ChatMessages className="Chat-Messages"></ChatMessages>
            <div className="focus-tooltip">
              <p className="tooltip-green"> 3</p>
            </div>
          </div>
        </li>

        <li className="main-img-container">
          <div className="img-container">
            <img className="img-profile" src={AiImage} alt="Logo" />
          </div>
        </li>
        <li className="profile-container">
          <span className="align-text">{name}</span>
          <select name="" id=""></select>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
