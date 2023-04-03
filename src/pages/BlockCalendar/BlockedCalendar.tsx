import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Calendar, DateObject } from "react-multi-date-picker";

import "./BlockedCalendar.scss";
import axios from "axios";
import { useNavigate } from "react-router";

const BlockedCalendar = () => {
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);
  const [selectedHours, setSelectedHours] = useState<Array<string>>([]);
  const [blockHoursFlag, setBlockHoursFlag] = useState<boolean>(false);
  const [accordionOpen, setAccordionOpen] = useState<string>("dates");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const hoursToBlock: Array<string> = [
    "8:00",
    "9:30",
    "11:00",
    "12:30",
    "14:00",
    "15:30",
    "17:00",
  ];

  const formatDateSelection = (dates: Array<any>) => {
    const datesFormatted = dates.map((date) => {
      const monthFormatted =
        date?.month.number > 9 ? date?.month.number : "0" + date?.month.number;
      const dayFormatted = date?.day > 9 ? date?.day : "0" + date?.day;
      return moment(
        `${dayFormatted}/${monthFormatted}/${date?.year}`,
        "DD/MM/YYYY"
      ).toDate();
    });
    const datesSorted = datesFormatted.sort(
      (a, b) => a.getTime() - b.getTime()
    );
    setSelectedDates(datesSorted);
  };

  const handleHourClick = (hour: string) => {
    if ((selectedHours as Array<string>).indexOf(hour) > -1) {
      setSelectedHours((prevSelectedHours) =>
        prevSelectedHours?.filter(
          (prevSelectedHour) => prevSelectedHour !== hour
        )
      );
      return;
    }
    setSelectedHours((prevSelectedHours) => [
      ...(prevSelectedHours as Array<string>),
      hour,
    ]);
  };

  const handleHourAll = () => {
    setBlockHoursFlag((prevBlockHoursFlag) => {
      if (!prevBlockHoursFlag) {
        setSelectedHours(hoursToBlock);
      } else {
        setSelectedHours([]);
      }
      return !prevBlockHoursFlag;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_TOKEN as string) || ""
    );
    axios
      .post(
        "http://localhost:8000/days/blocked",
        {
          dates: selectedDates,
          hours: selectedHours,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <section className="blocked-calendar">
      <div className="blocked-calendar__titles">
        <h2 className="blocked-calendar__title">Calendar</h2>
        <h3 className="blocked-calendar__sub-title">picker</h3>
      </div>
      <div className="blocked-calendar__accordion blocked-calendar__accordion--days">
        <Accordion expanded={accordionOpen === "dates"}>
          <AccordionSummary
            onClick={() => setAccordionOpen("dates")}
            expandIcon={
              <p className="blocked-calendar__change">
                {selectedDates.length ? "Change" : ""}
              </p>
            }
          >
            <div className="blocked-calendar__accordion-title">
              <CalendarMonthIcon fontSize="large" />
              <h3>Choose days to block</h3>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="blocked-calendar__details">
              <Calendar
                multiple
                disableYearPicker={true}
                value={selectedDates}
                minDate={new Date()}
                onChange={(dates) => formatDateSelection(dates as DateObject[])}
              />
              <button
                className={` ${
                  selectedDates.length
                    ? ""
                    : "blocked-calendar__button--disabled"
                } blocked-calendar__button`}
                onClick={() => setAccordionOpen("hours")}
              >
                NEXT
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="blocked-calendar__accordion">
        <Accordion expanded={accordionOpen === "hours"}>
          <AccordionSummary
            onClick={() => setAccordionOpen("hours")}
            expandIcon={
              <p className="blocked-calendar__change">
                {selectedHours.length ? "Change" : ""}
              </p>
            }
          >
            <div className="blocked-calendar__accordion-title">
              <QueryBuilderIcon fontSize="large" />
              <h3>Choose hours to block</h3>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="blocked-calendar__details">
              <ul className="blocked-calendar__hours">
                <li
                  className={`blocked-calendar__hour blocked-calendar__hour--all ${
                    blockHoursFlag ? "blocked-calendar__hour--selected" : ""
                  }`}
                  onClick={handleHourAll}
                >
                  ALL
                </li>
                {hoursToBlock.map((hourToBlock: string, index: number) => (
                  <li
                    className={`blocked-calendar__hour ${
                      (selectedHours as Array<string>).indexOf(hourToBlock) >
                        -1 && !blockHoursFlag
                        ? "blocked-calendar__hour--selected"
                        : ""
                    } ${
                      blockHoursFlag ? "blocked-calendar__hour--disabled" : ""
                    } `}
                    key={index}
                    onClick={() =>
                      !blockHoursFlag && handleHourClick(hourToBlock)
                    }
                  >
                    {hourToBlock}
                  </li>
                ))}
              </ul>
              <button
                className={`blocked-calendar__button ${
                  selectedHours.length
                    ? ""
                    : " blocked-calendar__button--disabled"
                } blocked-calendar__button--hours`}
                disabled={selectedHours.length ? false : true}
                onClick={() => setAccordionOpen("summary")}
              >
                NEXT
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="blocked-calendar__accordion">
        <Accordion expanded={accordionOpen === "summary"}>
          <AccordionSummary
            onClick={() =>
              selectedDates.length &&
              selectedHours.length &&
              setAccordionOpen("summary")
            }
            expandIcon={<p></p>}
          >
            <div className="blocked-calendar__accordion-title">
              <AssignmentOutlinedIcon fontSize="large" />
              <h3>Summary</h3>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="blocked-calendar__summary">
              <div className="blocked-calendar__summary-block">
                <h4>Dates: </h4>
                <p>
                  {selectedDates?.map(
                    (selectedDate, index) =>
                      moment(selectedDate).format("DD/MM/YYYY") +
                      (selectedDates.length - 1 === index ? "" : ", ")
                  )}
                </p>
              </div>
              <div className="blocked-calendar__summary-block">
                <h4>Hours: </h4>
                <p>
                  {selectedHours?.map(
                    (selectedHour, index) =>
                      selectedHour +
                      (selectedHours.length - 1 === index ? "" : ", ")
                  )}
                </p>
              </div>
              <button
                className={`blocked-calendar__button blocked-calendar__button--submit`}
                onClick={handleSubmit}
              >
                BLOCK DATE{" "}
                {isLoading && (
                  <CircularProgress
                    style={{
                      width: "2rem",
                      height: "2rem",
                      position: "absolute",
                      marginLeft: "1rem",
                    }}
                  />
                )}
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
};

export default BlockedCalendar;
