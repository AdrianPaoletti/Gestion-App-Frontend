import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Button } from "@mui/material";

import "./App.scss";
import Login from "./pages/Login/Login";
import { User } from "./models/user";
import NotFound from "./pages/NotFound/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import BlockedCalendar from "./pages/BlockCalendar/BlockedCalendar";
// import useUser from "./hooks/useUser";

function App() {
  // const [isReadyForInstall, setIsReadyForInstall] = useState<boolean>(false);
  // const [deferredPrompt, setDeferredPrompt] = useState<any>();
  const [user, setUser] = useState<User>({ username: "", password: "" });

  // useEffect(() => {
  //   window.addEventListener("beforeinstallprompt", (event: Event) => {
  //     // Prevent the mini-infobar from appearing on mobile.
  //     event.preventDefault();
  //     console.log("👍", "beforeinstallprompt", event);
  //     // Stash the event so it can be triggered later.
  //     setDeferredPrompt(event);
  //     // Remove the 'hidden' class from the install button container.
  //     setIsReadyForInstall(true);
  //   });
  // }, []);

  // const downloadApp = async () => {
  //   console.log("👍", "butInstall-clicked");
  //   const promptEvent = deferredPrompt;
  //   if (!promptEvent) {
  //     // The deferred prompt isn't available.
  //     console.log("oops, no prompt event guardado en window");
  //     return;
  //   }
  //   // Show the install prompt.
  //   promptEvent.prompt();
  //   // Log the result
  //   const result = await promptEvent.userChoice;
  //   console.log("👍", "userChoice", result);
  //   // Reset the deferred prompt variable, since
  //   // prompt() can only be called once.
  //   setDeferredPrompt(null);
  //   // Hide the install button.
  //   setIsReadyForInstall(false);
  // };

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
                    <HomePage />
                    <Navbar />
                  </div>
                }
              />
              <Route
                path="/blocked-calendar"
                element={
                  <div className="app__page-container">
                    <BlockedCalendar />
                    <Navbar />
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      {/* {isReadyForInstall && (
          <Button variant="contained" onClick={downloadApp}>
            Donwload app
          </Button>
        )} */}
    </div>
  );
}

export default App;
