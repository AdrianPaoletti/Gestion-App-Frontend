import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "../reducers/rootReducer";

const store = configureStore({ reducer: rootRedcuer });

export default store;
