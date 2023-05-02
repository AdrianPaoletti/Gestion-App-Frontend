import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import Login from "./pages/Login/Login";
import { User } from "./models/user";
import NotFound from "./pages/NotFound/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import BlockedCalendar from "./pages/BlockCalendar/BlockedCalendar";
import { useSelector } from "react-redux";
import { AppState } from "./redux/reducers/rootReducer";

function App() {
  const blockedDays = useSelector((state: AppState) => state.blockedDays);
  const [locationUrl, setLocationUrl] = useState<string>("");
  const [user, setUser] = useState<User>({ username: "", password: "" });

  return (
    <div className="app">
      <div className="app__page">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <div className="app__page-container">
                    <HomePage blockedDays={blockedDays} />
                    <Navbar
                      locationUrl={locationUrl}
                      setLocationUrl={setLocationUrl}
                    />
                  </div>
                }
              />
              <Route
                path="/blocked-calendar"
                element={
                  <div className="app__page-container">
                    <BlockedCalendar setLocationUrl={setLocationUrl} />
                    <Navbar
                      locationUrl={locationUrl}
                      setLocationUrl={setLocationUrl}
                    />
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
