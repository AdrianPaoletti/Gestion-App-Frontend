import { combineReducers } from "redux";
import logUserReducer from "./logUserReducer";
import blockedDaysReducer from "./blockedDaysReducer";

const rootReducer = combineReducers({
  logUser: logUserReducer,
  blockedDays: blockedDaysReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
