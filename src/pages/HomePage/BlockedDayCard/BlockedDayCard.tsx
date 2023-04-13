import React, { useState } from "react";
import "./BlockedDayCard.scss";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, CircularProgress, IconButton, Modal } from "@mui/material";
import { BlockedDay } from "../../../models/blockedDay";
import moment from "moment";
import axios from "axios";

interface BlockedCardProps {
  blockedDay: BlockedDay;
  getBlockedDays: () => void;
}

const BlockedCard = ({ blockedDay, getBlockedDays }: BlockedCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const token = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_TOKEN as string) || ""
    );
    axios
      .delete(`${process.env.REACT_APP_API}/days/blocked/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false);
        setIsOpenModal(false);
        getBlockedDays();
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="blocked-card__information">
        <div className="blocked-card__information-unit">
          <h4>Dates:</h4>
          <p>
            {blockedDay.dates.map(
              (date, index, dates) =>
                moment(date).format("DD/MM/YYYY") +
                (dates.length - 1 === index ? "" : ", ")
            )}
          </p>
        </div>
        <div className="blocked-card__information-unit">
          <h4>Observations:</h4>
          <p>
            {blockedDay.observations}
          </p>
        </div>
        <div className="blocked-card__information-unit blocked-card__information-unit--hours">
          <ul>
            {blockedDay.hours.map((hour, index) => (
              <li key={index}>{hour}</li>
            ))}
          </ul>
        </div>
      </div>
      <IconButton
        sx={{
          position: "absolute",
          right: "0.5rem",
          top: "0.5rem",
          fontSize: "2.25rem",
        }}
        onClick={() => {
          setIsOpenModal(true);
          setId(blockedDay.id);
        }}
      >
        <DeleteOutlineIcon fontSize="inherit" />
      </IconButton>
      <Modal
        open={isOpenModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            width: "90%",
            maxWidth: "500px",
            height: 150,
            padding: "2rem",
            borderRadius: "1rem",
            outline: 0
          }}
        >
          <h3 id="modal-title">Delete blocked</h3>
          <p id="modal-description" className="blocked-card__modal-description">
            Are you sure you want to delete it?
          </p>
          <div className="blocked-card__modal-buttons">
            {isLoading && (
              <CircularProgress
                style={{
                  width: "2rem",
                  height: "2rem",
                  marginTop: "1rem",
                  marginRight: "1rem",
                  color: "#3c5a56",
                }}
              />
            )}
            <button
              className="blocked-card__modal-delete"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
            <button
              className="blocked-card__modal-cancel"
              onClick={() => setIsOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default BlockedCard;
