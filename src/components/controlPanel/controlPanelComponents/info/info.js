import React from "react";
import "./info.css";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";

const ControlPanelInfo = ({ setIsHelp, setIsInfoVisible }) => {
  const handleInfoIconClick = () => {
    setIsInfoVisible(true);
    setIsHelp(false);
  };

  const handleHelpIconClick = () => {
    setIsInfoVisible(true);
    setIsHelp(true);
  };

  return (
    <div className="info-display">
      <InfoIcon className="info-icon" onClick={() => handleInfoIconClick()} />
      <HelpIcon className="help-icon" onClick={() => handleHelpIconClick()} />
    </div>
  );
};

export default ControlPanelInfo;
