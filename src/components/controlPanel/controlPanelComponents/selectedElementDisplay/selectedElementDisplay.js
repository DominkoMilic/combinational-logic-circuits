import React from "react";
import "./selectedElementDisplay.css";
import ElementDisplayBlock from "./elementDisplayBlock/elementDisplayBlock";

const ControlPanelSelectedElementDisplay = ({
  newElement1,
  setNewElement1,
  setPinIndicatorPosition,
}) => {
  const resetSelectedElement = () => {
    setNewElement1(null);
    setPinIndicatorPosition({
      top: undefined,
      left: undefined,
    });
  };

  return (
    <div className="selected-element-display">
      <ElementDisplayBlock newElement1={newElement1} />
      <div className="element-reset-button-block">
        <button onClick={resetSelectedElement}>RESET SELECTED ELEMENT</button>
      </div>
    </div>
  );
};

export default ControlPanelSelectedElementDisplay;
