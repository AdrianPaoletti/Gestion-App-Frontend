import { userAction } from "../actions/actionCreator";
import actionTypes from "../actions/actionTypes";

const logUserReducer = (
  user = { isAuthenticated: false, user: {} },
  action: userAction
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

    default:
      newUser = user;
  }

  return newUser;
};

export default logUserReducer;
