import React, { useState } from "react";
import "./buttons.css";
import { calculateCP, changeXValues } from "../../../../utilis/utilis";
import { clearAllElements } from "../../../../utilis/elementMenagement";
import { saveFile } from "../../../../utilis/saveAndLoad";
import LoadOption from "./loadOption/loadOption";

const ControlPanelButtons = ({
  xVariableValues,
  setXVariableValues,
  setCables,
  cables,
  setFunctions,
  setMenuVisible,
  setDeleteVisible,
  setNewElement1,
  allElements,
  setOnLoad,
  setPinIndicatorPosition,
}) => {
  const [loadOptionVisinbility, setLoadOptionVisibility] = useState(false);

  const handleCPClick = () => {
    calculateCP(xVariableValues, setXVariableValues);
  };

  const handleResetClick = () => {
    changeXValues(0, setXVariableValues);
  };

  const handleClearClick = () => {
    setNewElement1(null);
    setPinIndicatorPosition({ top: undefined, left: undefined });
    clearAllElements(setCables, setFunctions, setMenuVisible, setDeleteVisible);
  };

  const handleLoadClick = () => {
    setLoadOptionVisibility(true);
  };

  const handleSaveClick = () => {
    saveFile(allElements, cables);
  };

  return (
    <div className="control-buttons">
      <button className="CP-button" onClick={handleCPClick}>
        CP
      </button>
      <button className="reset-button" onClick={handleResetClick}>
        RESET
      </button>
      <button className="clear-button" onClick={handleClearClick}>
        CLEAR
      </button>
      <button className="load-button" onClick={handleLoadClick}>
        LOAD
      </button>
      <button className="save-button" onClick={handleSaveClick}>
        SAVE
      </button>
      {loadOptionVisinbility && (
        <LoadOption
          setLoadOptionVisibility={setLoadOptionVisibility}
          setCables={setCables}
          setFunctions={setFunctions}
          setMenuVisible={setMenuVisible}
          setDeleteVisible={setDeleteVisible}
          setOnLoad={setOnLoad}
        />
      )}
    </div>
  );
};

export default ControlPanelButtons;
