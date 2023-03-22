import { User } from "../../models/user";
import actionTypes from "./actionTypes";

export interface userAction {
  user: User;
  type: string;
}

export const loginUserAction = (user: User) => ({
  type: actionTypes.loginUser,
  user,
});

export const logoutUserAction = () => ({
  type: actionTypes.logoutUser,
});
