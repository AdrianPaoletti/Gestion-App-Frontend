import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";
import {
  loggedUserAction,
  loginUserAction,
} from "../redux/actions/actionCreator";

import { AppState } from "../redux/reducers/rootReducer";

const useUser = () => {
  const urlApi = process.env.REACT_APP_API;
  const dispatch: Dispatch<any> = useDispatch();

  const loginUser = async (userData: User) => {
    return axios
      .post(`${urlApi}/users/login`, userData)
      .then(({ data: { token } }) => {
        const user = jwtDecode(token);
        dispatch(loginUserAction(user));
        localStorage.setItem(
          process.env.REACT_APP_TOKEN as string,
          JSON.stringify(token)
        );
      })
      .catch((error) => {
        console.error("Something went wrong on login", error);
      });
  };

  const loggedUser = () => {
    const checkUserLogged = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_TOKEN as string) as string
    );
    if (checkUserLogged) {
      const userData = jwtDecode(checkUserLogged);
      dispatch(loggedUserAction(userData));
    }
  };

  return { loginUser, loggedUser };
};

export default useUser;
