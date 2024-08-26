import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { TimerContainer } from "./components/timer/timer_container";
import { ProjectsList } from "./components/projects/projects_list";
import { Header } from "./components/common/header";
import { Footer } from "./components/common/footer";

function App() {
  // Breaking the application down
  // Header
  // - PV logo
  // - Title
  // - Collapse + X
  // Timer
  // - Timer Card
  // - Start, pause, stop buttons
  // Create new project button...?
  // Project List
  // - This Week
  // - Today
  // - Yesterday
  // - later in the week

  // add entry, edit entry, dashboard

  const [isMiniature, setIsMiniature] = useState(false);
  const popupRef = useRef(document.body);

  const toggleMiniatureView = () => {
    setIsMiniature((prev) => !prev);
  };

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.style.height = isMiniature ? "250px" : "600px";
    }
  }, [isMiniature]);

  return (
    <>
      <div className="popup-container">
        <Header
          toggleMiniatureView={toggleMiniatureView}
          isMiniature={isMiniature}
        ></Header>
        <TimerContainer></TimerContainer>
        {!isMiniature && (
          <>
            <ProjectsList></ProjectsList>
            <Footer></Footer>
          </>
        )}
      </div>
    </>
  );
}

export default App;
