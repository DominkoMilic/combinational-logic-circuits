import React from "react";
import "./textForInfo.css";
import InfoBlock from "./infoBlock/infoBlock";
import HelpBlock from "./helpBlock/helpBlock";

const TextForInfo = ({ isHelp }) => {
  if (isHelp) {
    return (
      <div className="text">
        <HelpBlock />
      </div>
    );
  } else {
    return (
      <div className="text">
        <InfoBlock />
      </div>
    );
  }
};

export default TextForInfo;
