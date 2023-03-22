export interface ActionTypes {
  loginUser: string;
  logoutUser: string;
}

const actionTypes: ActionTypes = {
  loginUser: "LOGIN_USER",
  logoutUser: "LOGOUT_USER",
};

export default actionTypes;
