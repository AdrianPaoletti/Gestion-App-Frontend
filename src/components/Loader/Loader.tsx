import React from "react";
import { CircularProgress } from "@mui/material";
import "./Loader.scss";

const Loader = () => {
  return (
    <section className="loader">
      <CircularProgress
        style={{
          width: "4rem",
          height: "4rem",
          color: "#3c5a56",
        }}
      />
    </section>
  );
};

export default Loader;
