import { BlockedDay } from "../../models/blockedDay";
import { User } from "../../models/user";
import actionTypes from "./actionTypes";

export interface userAction {
  user: User;
  type: string;
}

export interface BlockedDaysAction {
  blockedDays: Array<BlockedDay>;
  type: string;
}

export const loginUserAction = (user: User) => ({
  type: actionTypes.loginUser,
  user,
});

export const logoutUserAction = () => ({
  type: actionTypes.logoutUser,
});

export const getBlockedDaysAction = (
  blockedDays: Array<BlockedDay>
): BlockedDaysAction => ({
  type: actionTypes.getBlockedDays,
  blockedDays,
});
