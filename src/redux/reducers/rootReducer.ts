import { combineReducers } from "redux";
import logUserReducer from "./logUserReducer";

const rootReducer = combineReducers({
  logUser: logUserReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
