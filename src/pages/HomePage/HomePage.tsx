import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import BlockedCard from "./BlockedDayCard/BlockedDayCard";

import "./HomePage.scss";
import { BlockedDay } from "../../models/blockedDay";
import axios from "axios";
import { Pagination } from "@mui/material";
import { PER_PAGE } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { getBlockedDaysAction } from "../../redux/actions/actionCreator";
import Loader from "../../components/Loader/Loader";

interface HomePageProps {
  blockedDays: Array<BlockedDay>;
}

const HomePage = ({ blockedDays }: HomePageProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalBlockedDays, setTotalBlockedDays] = useState<string>("");
  const [actualPage, setActualPage] = useState<number>(1);

  useEffect(() => {
    getBlockedDays();
  }, [actualPage]);

  const getBlockedDays = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/days/blocked`, {
        params: { page: actualPage, limit: PER_PAGE },
      })
      .then(({ data: { total, blockedDays } }) => {
        if (blockedDays) {
          dispatch(getBlockedDaysAction(blockedDays));
          setTotalBlockedDays(total);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    if (page !== actualPage) {
      setIsLoading(true);
      setActualPage(page);
    }
  };

  return (
    <section className="home">
      <div className="home__titles">
        <h2 className="home__title">Blocked</h2>
        <h3 className="home__sub-title">days and hours</h3>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className="home__block-list">
          {blockedDays?.map((blockedDay, index) => (
            <li key={index} className="blocked-card">
              <BlockedCard
                blockedDay={blockedDay}
                getBlockedDays={getBlockedDays}
              />
            </li>
          ))}
        </ul>
      )}
      {!blockedDays?.length && !isLoading && (
        <h3 className="home__no-results">No blocked days yet!</h3>
      )}
      {(blockedDays?.length as number) > 0 && !isLoading && (
        <div className="home__pagination">
          <Pagination
            count={Math.ceil(+totalBlockedDays / PER_PAGE)}
            shape="rounded"
            page={actualPage}
            onChange={handleChange}
            size="large"
            sx={{fontSize: "1.2rem"}}
          />
        </div>
      )}
    </section>
  );
};

export default HomePage;
