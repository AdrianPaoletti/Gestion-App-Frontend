import React from "react";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__half-circle"></div>
      <div className="not-found__titles">
        <h1 className="not-found__title">404</h1>
        <h1 className="not-found__title">Not Found. No Access.</h1>
        <p className="not-found__sub-title">Just for administrators</p>
      </div>
    </section>
  );
};

export default NotFound;
