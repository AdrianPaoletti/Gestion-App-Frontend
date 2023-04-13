import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  TextField,
} from "@mui/material";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import axios from "axios";
import { useNavigate } from "react-router";
import { BlockedDay } from "../../models/blockedDay";
import Loader from "../../components/Loader/Loader";
import { Calendar, DateObject } from "react-multi-date-picker";
import "./BlockedCalendar.scss";
import { MAX_LENGTH_HOURS } from "../../utils/constants";

interface BlockedCalendarProps {
  setLocationUrl: React.Dispatch<React.SetStateAction<string>>;
}

const BlockedCalendar = ({ setLocationUrl }: BlockedCalendarProps) => {
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);
  const [selectedHours, setSelectedHours] = useState<Array<string>>([]);
  const [blockHoursFlag, setBlockHoursFlag] = useState<boolean>(false);
  const [accordionOpen, setAccordionOpen] = useState<string>("dates");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMonthly, setIsLoadingMonthly] = useState<boolean>(false);
  const [disabledDates, setDisabledDates] = useState<Array<Date>>();
  const [disabledHours, setDisabledHours] = useState<Array<string>>([]);
  const [blockedDays, setBlockedDays] = useState<Array<BlockedDay>>([]);
  const [observations, setObservations] = useState<string>("");
  const navigate = useNavigate();
  const hoursToBlock: Array<string> = [
    "08:00",
    "09:30",
    "11:00",
    "12:30",
    "14:00",
    "15:30",
    "17:00",
  ];

  useEffect(() => {
    getBlockedDaysMonthly();
  }, []);

  useEffect(() => {
    setDisabledDates(() => {
      const monthlyDates: Date[] = [];
      blockedDays.map((blockedDay: BlockedDay) => {
        if (blockedDay.hours.length === MAX_LENGTH_HOURS) {
          blockedDay.dates.forEach((date) => monthlyDates.push(date));
        }
      });
      return monthlyDates;
    });
  }, [blockedDays]);

  const getBlockedDaysMonthly = (date: DateObject | null = null) => {
    setIsLoadingMonthly(true);
    axios
      .get(`${process.env.REACT_APP_API}/days/blocked-monthly`, {
        params: {
          month: date?.month.index,
          year: date?.year,
        },
      })
      .then(({ data: blockedDays }) => {
        setBlockedDays(blockedDays);
        setIsLoadingMonthly(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingMonthly(false);
      });
  };

  const formatDateSelection = (dates: Array<DateObject>) => {
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
    return datesSorted;
  };

  const standarizedDate = (date: Date) =>
    new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );

  const handleCalendarChange = (dates: Array<DateObject>) => {
    const selectedDates = formatDateSelection(dates);
    const matchedDates = blockedDays.filter((blockedDay) =>
      blockedDay.dates.some(
        (date) =>
          selectedDates
            .map((selectedDate) => selectedDate.getDate())
            .indexOf(new Date(date).getDate()) > -1
      )
    );
    if (selectedDates.length === 1) {
      matchedDates.forEach((matchedDate) => {
        setDisabledHours((prevDisabledHours) => {
          return [...prevDisabledHours, ...matchedDate.hours];
        });
      });
      return;
    }
    if (selectedDates.length > 1) {
      let arrayOfDatesObject: Array<{ date: Date; hours: Array<string> }> = [];
      matchedDates.forEach((matchedDate) => {
        matchedDate.dates.forEach((date) => {
          const indexDateObject = arrayOfDatesObject.findIndex(
            (dateObject) => dateObject?.date === date
          );
          if (indexDateObject > -1) {
            arrayOfDatesObject[indexDateObject] = {
              ...arrayOfDatesObject[indexDateObject],
              hours: [
                ...arrayOfDatesObject[indexDateObject].hours,
                ...matchedDate.hours,
              ],
            };
            return;
          }
          return (arrayOfDatesObject = [
            ...arrayOfDatesObject,
            { date, hours: matchedDate.hours },
          ]);
        });
      });
      const datesThatMatched = arrayOfDatesObject.filter((dateObject) =>
        selectedDates
          .map((date) => standarizedDate(date).getDate())
          .includes(new Date(dateObject.date).getDate())
      );
      const hourCounts: any = {};
      datesThatMatched
        .map((dateThatMatched) => dateThatMatched.hours)
        .flat(1)
        .forEach((hour) => {
          hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });

      setDisabledHours(
        Object.keys(hourCounts).filter(
          (key) => hourCounts[key] >= selectedDates.length
        )
      );
      return;
    }
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
    const submitDates = selectedDates.map((selectedDate) =>
      standarizedDate(selectedDate)
    );
    axios
      .post(
        `${process.env.REACT_APP_API}/days/blocked`,
        {
          dates: submitDates,
          hours: selectedHours,
          observations
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
        setLocationUrl("/");
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
      {isLoadingMonthly && <Loader />}
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
                weekStartDayIndex={1}
                onMonthChange={getBlockedDaysMonthly}
                mapDays={(dateObject) =>
                  disabledDates
                    ?.map((disabledDate) => new Date(disabledDate).getDate())
                    .includes(dateObject.date.day)
                    ? { disabled: true }
                    : { disabled: false }
                }
                disableYearPicker={true}
                value={selectedDates}
                minDate={new Date()}
                onChange={(dates) =>
                  handleCalendarChange(dates as DateObject[])
                }
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
            onClick={() => selectedDates.length && setAccordionOpen("hours")}
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
                        -1 &&
                      disabledHours.indexOf(hourToBlock) === -1 &&
                      !blockHoursFlag
                        ? "blocked-calendar__hour--selected"
                        : ""
                    } ${
                      blockHoursFlag || disabledHours.indexOf(hourToBlock) > -1
                        ? "blocked-calendar__hour--disabled"
                        : ""
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
              <div className="blocked-calendar__summary-block">
                <h4>Notes: </h4>
                {/* <textarea name="" id="" cols={1} rows={1}></textarea> */}
                <TextField
                  placeholder="Optional notes to add on the block"
                  onChange={(e) => setObservations(e.target.value)}
                  rows={2}
                  multiline
                  fullWidth
                  sx={{ marginLeft: "1rem", fontSize: "1.4rem" }}
                />
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
                      color: "#3c5a56",
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
