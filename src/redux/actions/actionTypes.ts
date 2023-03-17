export interface ActionTypes {
  loginUser: string;
  logoutUser: string;
  loggedUser: string;
}

const actionTypes: ActionTypes = {
  loginUser: "LOGIN_USER",
  logoutUser: "LOGOUT_USER",
  loggedUser: "LOGGED_USER",
};

export default actionTypes;
