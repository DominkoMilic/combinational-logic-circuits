import React from "react";
import "./leftSideIndicators.css";

const LeftSideIndicator = ({ handleBulbButtonClick, button }) => {
  return (
    <div className="left-indicator">
      <div
        className="left-indicator-bulb"
        style={{ backgroundColor: button.value === "1" ? "green" : "red" }}
      ></div>
      <button
        className="left-indicator-button"
        onClick={() => handleBulbButtonClick(button)}
      ></button>
    </div>
  );
};

export default LeftSideIndicator;
