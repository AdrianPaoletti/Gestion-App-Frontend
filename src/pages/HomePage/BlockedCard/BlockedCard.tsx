import React from "react";
import "./BlockedCard.scss";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

const BlockedCard = () => {
  return (
    <section className="blocked-card">
      <div className="blocked-card__information">
        <div className="blocked-card__information-unit">
          <h4>Date from:</h4>
          <p>14/14/14</p>
        </div>
        <div className="blocked-card__information-unit">
          <h4>Date to:</h4>
          <p>14/14/14</p>
        </div>
        <div className="blocked-card__information-unit blocked-card__information-unit--hours">
          {/* <h4>Hours:</h4> */}
          <ul>
            <li>546</li>
            <li>546</li>
            <li>546</li>
            <li>546</li>
            <li>546</li>
          </ul>
        </div>
      </div>
      <IconButton
        sx={{
          position: "absolute",
          right: "0.5rem",
          top: "0.5rem",
          fontSize: "2rem",
        }}
      >
        <DeleteOutlineIcon fontSize="inherit" />
      </IconButton>
    </section>
  );
};

export default BlockedCard;
