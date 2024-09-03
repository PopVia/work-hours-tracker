import React, { useState } from "react";
import { Modal } from "./modal";
import { ManualEntryForm } from "../projects/manual_entry_form";
import "./footer.css";

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen((prev) => {
      return !prev;
    });
  };
  return (
    <div className="nav-footer">
      {isModalOpen && (
        <Modal headerContent={"Add Time Entry"} onClose={handleOpenModal}>
          <ManualEntryForm onSubmit={handleOpenModal}></ManualEntryForm>
        </Modal>
      )}
      <div className="nav-option">
        <span
          className="circle-btn material-symbols-outlined"
          onClick={handleOpenModal}
        >
          add
        </span>
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
