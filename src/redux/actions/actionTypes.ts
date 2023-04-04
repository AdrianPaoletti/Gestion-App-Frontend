export interface ActionTypes {
  loginUser: string;
  logoutUser: string;

  getBlockedDays: string;
}

const actionTypes: ActionTypes = {
  loginUser: "LOGIN_USER",
  logoutUser: "LOGOUT_USER",
  getBlockedDays: "GET_BLOCKED_DAYS",
};

export default actionTypes;
