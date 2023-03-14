/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./App.scss";

function App() {
  const [isReadyForInstall, setIsReadyForInstall] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      setDeferredPrompt(event);
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    setDeferredPrompt(null);
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <div className="App">
      <h1>Hello Admin!</h1>
      {isReadyForInstall && (
        <Button variant="contained" onClick={downloadApp}>
          Donwload app
        </Button>
      )}
    </div>
  );
}

export default App;
