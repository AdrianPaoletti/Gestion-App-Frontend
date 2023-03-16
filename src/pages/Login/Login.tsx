import React, { useEffect, useState } from "react";
import axios from "axios";

import showIconPath from "../../assets/images/show.svg";
import hideIconPath from "../../assets/images/hide.svg";
import "./Login.scss";
import { User } from "../../models/user";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

interface LoginProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Login = ({ user, setUser }: LoginProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username.length && user.password.length) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.id]: value });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setIsDisabled(true);
    axios
      .post(`${process.env.REACT_APP_API}/users/login`, user)
      .then(({ data }) => {
        setShowError(false);
        setIsLoading(false);
        setIsDisabled(false);

        const { token } = data;
        localStorage.setItem(
          process.env.REACT_APP_TOKEN as string,
          JSON.stringify({ token })
        );
        navigate("/");
      })
      .catch(() => {
        setShowError(true);
        setIsLoading(false);
        setIsDisabled(false);
      });
  };

  return (
    <section className="login">
      <div className="login__half-circle"></div>
      <div className="login__titles">
        <h1 className="login__title">Hey,</h1>
        <h1 className="login__title">Login To Access.</h1>
        <p className="login__sub-title">Just for administrators</p>
      </div>
      <div className="login__inputs">
        <input
          type="text"
          className="login__input login__input--username"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <div className="login__input-container">
          <input
            type={showPassword ? "text" : "password"}
            className="login__input login__input--password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <img
            src={showPassword ? hideIconPath : showIconPath}
            width={26}
            alt="show password"
            onClick={
              user.password.length > 0
                ? () => setShowPassword(!showPassword)
                : undefined
            }
          />
        </div>
        {showError ? (
          <p className="login__message login__message--error">
            Incorrect username or password
          </p>
        ) : (
          <p className="login__message login__message--helper">
            So far, so good
          </p>
        )}
      </div>
      <button
        className={`login__input login__input--button ${
          isDisabled ? "login__input--disabled" : ""
        }`}
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        Login
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
    </section>
  );
};

export default Login;
