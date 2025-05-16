import React from "react";
import "./premadeOption.css";

const PremadeOption = ({ image, title, file, handleLoadFromPC }) => {
  return (
    <div
      className="premade-option-container"
      onClick={() => handleLoadFromPC(file)}
    >
      <div className="option-image">
        <img src={image} alt=""></img>
      </div>
      <div className="option-title">{title}</div>
    </div>
  );
};

export default PremadeOption;
