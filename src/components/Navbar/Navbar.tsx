import React, { useEffect } from "react";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { IconButton } from "@mui/material";

import "./Navbar.scss";
import useUser from "../../hooks/useUser";
import { useLocation, useNavigate } from "react-router";

interface NavbarProps {
  locationUrl: string;
  setLocationUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({ locationUrl, setLocationUrl }: NavbarProps) => {
  const { logOut } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setLocationUrl(location.pathname);
  }, []);

  const setLocation = (location: string) => {
    setLocationUrl(location);
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div
          className={`navbar__button ${
            locationUrl === "/" ? "navbar__button--selected" : ""
          }`}
          onClick={() => {
            navigate("/");
            setLocation("/");
          }}
        >
          <IconButton
            color="inherit"
            sx={{ padding: "0.2rem ", fontSize: "2.3rem" }}
          >
            <HomeWorkOutlinedIcon fontSize="inherit" />
          </IconButton>
          <p>Home</p>
        </div>
        <div
          className="navbar__button navbar__button--add"
          onClick={() => {
            navigate("/blocked-calendar");
            setLocation("/blocked-calendar");
          }}
        >
          <IconButton
            size="large"
            sx={{
              fontSize: "2.3rem",
              background:
                locationUrl === "/blocked-calendar" ? "#8acac0" : "#fdce84",
              ":hover": { background: "#8acac0" },
            }}
          >
            <AddBoxOutlinedIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div
          className="navbar__button"
          onClick={() => {
            logOut();
            setLocation("/login");
            navigate("/login");
          }}
        >
          <IconButton
            color="inherit"
            sx={{ padding: "0.2rem", fontSize: "2.3rem" }}
          >
            <MeetingRoomOutlinedIcon fontSize="inherit" />
          </IconButton>
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
