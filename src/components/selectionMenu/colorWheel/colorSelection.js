import React, { useState } from "react";
import "./colorWheel.css";
import ColorWheel from "./colorWheel";
import { changeCableColor } from "../../../utilis/elementMenagement";

const ColorSelection = ({
  setIsColorWheelVisible,
  setIsVisible,
  cableToDelete,
}) => {
  const [selectedColor, setSelectedColor] = useState("#e6194b");

  const handleApplyColor = (selectedColor) => {
    setIsColorWheelVisible(false);
    setIsVisible(false);
    cableToDelete.color = changeCableColor(selectedColor);
  };

  return (
    <div className="color-menu-div">
      <ColorWheel
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <div className="button-holder">
        <button
          className="delete-menu"
          onClick={() => handleApplyColor(selectedColor)}
        >
          APPLY
        </button>
        <button
          className="delete-menu"
          onClick={() => setIsColorWheelVisible(false)}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default ColorSelection;
