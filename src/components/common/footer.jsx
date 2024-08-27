import React from "react";
import "./footer.css";

export const Footer = () => {
  return (
    <div className="nav-footer">
      <div className="nav-option">
        <span className="circle-btn material-symbols-outlined">add</span>
        <h3 className="nav-txt">Add Entry</h3>
      </div>
      <div className="nav-option">
        <span className="circle-btn material-symbols-outlined">edit</span>
        <h3 className="nav-txt">Edit Entry</h3>
      </div>
      <div className="nav-option">
        <span className="circle-btn material-symbols-outlined">dashboard</span>
        <h3 className="nav-txt">Dashboard</h3>
      </div>
    </div>
  );
};
