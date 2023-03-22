import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { User } from "../models/user";
import {
  loginUserAction,
  logoutUserAction,
} from "../redux/actions/actionCreator";

const useUser = () => {
  const urlApi = process.env.REACT_APP_API;
  const dispatch: Dispatch<any> = useDispatch();

  const loginUser = async (userData: User) => {
    return axios
      .post(`${urlApi}/users/login`, userData)
      .then(({ data: { token } }) => {
        const user = jwtDecode(token);
        console.log(user);
        dispatch(loginUserAction(user as User));
        localStorage.setItem(
          process.env.REACT_APP_TOKEN as string,
          JSON.stringify(token)
        );
      })
      .catch((error) => {
        console.error("Something went wrong on login", error);
      });
  };

  const logOut = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN as string);
    dispatch(logoutUserAction());
  };

  return { loginUser, logOut };
};

export default useUser;
