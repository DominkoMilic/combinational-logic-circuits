import React from "react";
import "./infoScreen.css";
import TextForInfo from "./textForInfo/textForInfo";

const InfoScreen = ({ visible, setIsInfoVisible, isHelp }) => {
  if (!visible) return;

  return (
    <div className="screen-blur">
      <div className="info-screen">
        <button
          className="exit-button"
          onClick={() => {
            setIsInfoVisible(false);
          }}
        >
          X
        </button>
        <TextForInfo isHelp={isHelp} />
      </div>
    </div>
  );
};

export default InfoScreen;
