import React, { useEffect, useState } from "react";
import BlockedCard from "./BlockedDayCard/BlockedDayCard";

import "./HomePage.scss";
import { BlockedDay } from "../../models/blockedDay";
import axios from "axios";
import { Pagination } from "@mui/material";

const HomePage = () => {
  const [blockedDays, setBlockedDays] = useState<Array<BlockedDay>>();

  useEffect(() => {
    axios
      .get("http://localhost:8000/days/blocked")
      .then(({ data: { total, blockedDays } }) => {
        if (blockedDays) {
          setBlockedDays(blockedDays);
          console.log("total", blockedDays);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="home">
      <div className="home__titles">
        <h2 className="home__title">Blocked</h2>
        <h3 className="home__sub-title">days and hours</h3>
      </div>
      <ul className="home__block-list">
        {blockedDays?.map((blockedDay, index) => (
          <li key={index} className="blocked-card">
            <BlockedCard blockedDay={blockedDay} />
          </li>
        ))}
      </ul>
      <div className="home__pagination">
        <Pagination count={5} size="medium" />
      </div>
    </section>
  );
};

export default HomePage;
