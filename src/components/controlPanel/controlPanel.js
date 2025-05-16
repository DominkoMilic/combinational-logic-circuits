import React from "react";
import "./controlPanel.css";
import ControlPanelBulbs from "./controlPanelComponents/bulbs/bulbs";
import ControlPanelButtons from "./controlPanelComponents/buttons/buttons";
import ControlPanelInfo from "./controlPanelComponents/info/info";
import ControlPanelSelectedElementDisplay from "./controlPanelComponents/selectedElementDisplay/selectedElementDisplay";

const ControlPanel = ({
  setXVariableValues,
  xVariableValues,
  setIsHelp,
  setIsInfoVisible,
  setCables,
  cables,
  setFunctions,
  allElements,
  setMenuVisible,
  setDeleteVisible,
  newElement1,
  setNewElement1,
  setOnLoad,
  setPinIndicatorPosition,
}) => {
  return (
    <div className="control-panel">
      <div className="indicator">
        <ControlPanelBulbs
          setXVariableValues={setXVariableValues}
          xVariableValues={xVariableValues}
        />
      </div>
      <div className="control-buttons">
        <ControlPanelButtons
          xVariableValues={xVariableValues}
          setXVariableValues={setXVariableValues}
          setCables={setCables}
          cables={cables}
          setFunctions={setFunctions}
          setMenuVisible={setMenuVisible}
          setDeleteVisible={setDeleteVisible}
          setNewElement1={setNewElement1}
          allElements={allElements}
          setOnLoad={setOnLoad}
          setPinIndicatorPosition={setPinIndicatorPosition}
        />
      </div>
      <div className="control-selected">
        <ControlPanelSelectedElementDisplay
          newElement1={newElement1}
          setNewElement1={setNewElement1}
          setPinIndicatorPosition={setPinIndicatorPosition}
        />
      </div>
      <div className="control-info">
        <ControlPanelInfo
          setIsHelp={setIsHelp}
          setIsInfoVisible={setIsInfoVisible}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
