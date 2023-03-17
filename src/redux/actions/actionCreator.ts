import actionTypes from "./actionTypes";

export const loginUserAction = (user: any) => ({
  type: actionTypes.loginUser,
  user,
});

export const logoutUserAction = () => ({
  type: actionTypes.logoutUser,
});

export const loggedUserAction = (user: any) => ({
  type: actionTypes.loggedUser,
  user,
});
