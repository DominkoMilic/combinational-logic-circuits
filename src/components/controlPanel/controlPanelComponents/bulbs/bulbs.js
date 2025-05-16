import React, { useState, useEffect } from "react";
import "./bulbs.css";

const ControlPanelBulbs = ({ setXVariableValues, xVariableValues }) => {
  const [xButtons, setXButtons] = useState(
    Array.from({ length: 8 }, (_, index) => ({
      value: xVariableValues[index],
      id: `X-${index}`,
    }))
  );

  useEffect(() => {
    setXButtons(
      Array.from({ length: 8 }, (_, index) => ({
        value: xVariableValues?.[index] ?? "0",
        id: `X-${index}`,
      }))
    );
  }, [xVariableValues]);

  const handleBulbButtonClick = (button) => {
    const buttonIndex = button.id.split("-")[1];

    const newValue = button.value === "1" ? "0" : "1";

    setXButtons((prev) => {
      const updatedArray = [...prev];
      updatedArray[buttonIndex].value = newValue;
      return updatedArray;
    });

    setXVariableValues((prevXVariableValues) => {
      const updatedArray = [...prevXVariableValues];
      updatedArray[buttonIndex] = newValue;
      return updatedArray;
    });
  };

  return (
    <div className="framework">
      <div className="bulb-button-container">
        {xButtons
          .slice()
          .reverse()
          .map((item) => (
            <div className="control-pair" key={item.id}>
              <div
                className="control-bulb"
                id={item.id}
                style={{
                  backgroundColor: item.value === "1" ? "green" : "red",
                }}
              ></div>
              <div className="control-button">
                <button
                  id={item.id}
                  onClick={(e) => handleBulbButtonClick(item, e)}
                ></button>
                <div className="variable-index">
                  {"X" + item.id.split("-")[1]}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ControlPanelBulbs;
