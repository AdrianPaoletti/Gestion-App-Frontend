import React from "react";
import BlockedCard from "./BlockedCard/BlockedCard";

import "./HomePage.scss";

const HomePage = () => {
  return (
    <section className="home">
      <div className="home__titles">
        <h2 className="home__title">Blocked</h2>
        <h3 className="home__sub-title">days and hours</h3>
      </div>
      <div className="home__block-list">
        <BlockedCard />
        <BlockedCard />
      </div>
    </section>
  );
};

export default HomePage;
