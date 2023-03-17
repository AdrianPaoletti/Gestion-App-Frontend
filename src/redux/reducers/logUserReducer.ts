import actionTypes from "../actions/actionTypes";

const logUserReducer = (
  user = { isAuthenticated: false, user: {} },
  action: any
) => {
  let newUser;

  switch (action.type) {
    case actionTypes.loginUser:
      newUser = {
        ...user,
        isAuthenticated: true,
        user: action.user,
      };
      break;

    case actionTypes.logoutUser:
      newUser = {
        isAuthenticated: false,
        user: {},
      };
      break;

    case actionTypes.loggedUser:
      newUser = {
        isAuthenticated: true,
        user: action.user,
      };
      break;

    default:
      newUser = user;
  }

  return newUser;
};

export default logUserReducer;
