import React from "react";
import "./header.css";

export const Header = ({ toggleMiniatureView, isMiniature }) => {
  const handleDropdown = () => {
    toggleMiniatureView();
  };

  return (
    <div className="header">
      <img className="logo" src="icon.png" />
      <h1 className="header-title">Work Hour Tracker</h1>
      <div className="window-manangment-btns">
        <span
          className="btn-minimize material-symbols-outlined"
          onClick={handleDropdown}
        >
          {isMiniature ? "arrow_drop_down" : "arrow_drop_up"}
        </span>
        <span className="btn-close material-symbols-outlined">close</span>
      </div>
    </div>
  );
};
