import React from "react";
import "./App.css";
import { TimerContainer } from "./components/timer_container";
import { ProjectsList } from "./components/projects_list";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

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

  return (
    <>
      <div className="popup-container">
        <Header></Header>
        <TimerContainer></TimerContainer>
        <ProjectsList></ProjectsList>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
