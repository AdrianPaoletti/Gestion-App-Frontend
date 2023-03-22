import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "./HomePage.scss";
import useUser from "../../hooks/useUser";

const HomePage = () => {
  const { logOut } = useUser();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "dateFrom",
      headerName: "Date from",
      width: 100,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "dateTo",
      headerName: "Date to",
      width: 100,
      sortable: true,
      disableColumnMenu: true,
    },
    {
      field: "hours",
      headerName: "Hours",
      width: 100,
      sortable: true,
      disableColumnMenu: true,
    },
  ];

  const rows = [
    {
      id: 1,
      dateFrom: "12/06/2022",
      dateTo: "14/06/2022",
      hours: "12:00, 15:00",
    },
    {
      id: 2,
      dateFrom: "12/06/2022",
      dateTo: "14/06/2022",
      hours: "12:00, 15:00",
    },
    {
      id: 3,
      dateFrom: "12/06/2022",
      dateTo: "14/06/2022",
      hours: "12:00, 15:00",
    },
  ];

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <section className="home">
      <div className="home__header">
        <div className="home__half-circle"></div>
        <IconButton
          onClick={handleLogOut}
          sx={{ fontSize: "3.2rem" }}
          color="inherit"
        >
          <LogoutIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div className="home__titles">
        <h2 className="home__title">Blocked</h2>
        <h3 className="home__sub-title">days and hours</h3>
      </div>
      <div className="home__table">
        <DataGrid
          columns={columns}
          rows={rows}
          sx={{ fontFamily: "inherit", fontSize: "inherit" }}
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </section>
  );
};

export default HomePage;
