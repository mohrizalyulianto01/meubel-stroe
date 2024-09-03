import { useState, useEffect} from "react";
import "../../styles/Dashboard.css";
import PropTypes from "prop-types";
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Header = ({ OpenSidebar }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  const [userName, setUserName] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
   const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/auth/getuser", userName);
        setUserName(response.data.user.name);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  },[userName])

  return (
    <header className="header d-block p-3 shadow text-bg-dark z-3 w-100">
      <div className="container d-flex align-items-center justify-content-between">
        <button className="d-lg-none border-0 bg-transparent p-0 text-white">
          <i className="ri-menu-line" onClick={OpenSidebar}></i>
        </button>

        <div className="header-right d-flex ms-auto align-items-center">
          <button
            onClick={toggleFullScreen}
            className="border-0 btn btn-sm btn-secondary d-flex justify-content-center rounded px-3 me-2 me-md-3 text-white"
            style={{ width: "25px" }}
          >
            <i
              className={
                isFullScreen ? "ri-fullscreen-exit-fill" : "ri-fullscreen-fill"
              }
            ></i>
          </button>
          <button className="btn text-white d-flex p-0" onClick={() => navigate("/admin/users")}>
            <p>Hello, {userName}</p>
            <i className="ri-user-line icon mx-2"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default Header;
