import React from "react";
import "./colorWheel.css";

const ColorWheel = ({ selectedColor, setSelectedColor }) => {
  const colors = [
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
    "#e6beff",
    "#9a6324",
    "#fffac8",
    "#800000",
    "#aaffc3",
    "#808000",
    "#ffd8b1",
    "#000075",
    "#808080",
    "#ffffff",
  ];

  return (
    <div className="color-wheel-div">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-circle ${
            color === selectedColor ? "selected" : ""
          }`}
          style={{
            backgroundColor: color,
          }}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  );
};

export default ColorWheel;
