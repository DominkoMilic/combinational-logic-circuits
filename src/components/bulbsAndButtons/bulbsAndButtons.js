import React, { useState, useEffect, useRef } from "react";
import "./bulbsAndButtons.css";
import LeftSideIndicator from "./leftSideIndicators/leftSideIndicators";
import { adjustCablePositionOnScreenSizeChange } from "../../utilis/utilis";

const BulbAndButtons = ({
  setXVariableValues,
  xVariableValues,
  handleElementClick,
  setMenuVisible,
  setCables,
  onLoad,
}) => {
  const elementRefs = useRef({});
  const [xButtons, setXButtons] = useState(
    Array.from({ length: 8 }, (_, index) => ({
      value: xVariableValues[index],
      id: `X-${index}`,
    }))
  );

  const constantX = [
    {
      value: "0",
      id: "X-8-constant",
    },
    {
      value: "1",
      id: "X-9-constant",
    },
  ];

  useEffect(() => {
    setXButtons(
      Array.from({ length: 8 }, (_, index) => ({
        value: xVariableValues?.[index] ?? 0,
        id: `X-${index}`,
      }))
    );
  }, [xVariableValues]);

  const handleBulbButtonClick = (button) => {
    setMenuVisible(false);
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

  const handleDivClick = (button, e) => {
    const inputNumber = 0;
    handleElementClick(button, e, 1, inputNumber);
  };

  const handleNotDivClick = (button, e) => {
    const inputNumber = 0;
    const newElement = {
      id: button.id + "-NOTX",
      value: button.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  useEffect(() => {
    function handleResize() {
      Object.entries(elementRefs.current).forEach(([key, el], index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (key === "X-8-constant") {
            adjustCablePositionOnScreenSizeChange(
              setCables,
              rect,
              {
                value: 0,
                id: "X-8-constant",
              },
              "x"
            );
          } else if (key === "X-9-constant") {
            adjustCablePositionOnScreenSizeChange(
              setCables,
              rect,
              {
                value: 1,
                id: "X-9-constant",
              },
              "x"
            );
          } else if (index % 2 === 0) {
            adjustCablePositionOnScreenSizeChange(
              setCables,
              rect,
              {
                value: xButtons[index / 2].value,
                id: xButtons[index / 2].id,
              },
              "x"
            );
          } else {
            adjustCablePositionOnScreenSizeChange(
              setCables,
              rect,
              {
                value: xButtons[(index - 1) / 2].value === "0" ? "1" : "0",
                id: xButtons[(index - 1) / 2].id + "-NOTX",
              },
              "x"
            );
          }
        }
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [onLoad]);

  return (
    <div className="one-above">
      {xButtons.map((button) => (
        <div className="input-buttons" key={button.id}>
          <LeftSideIndicator
            handleBulbButtonClick={handleBulbButtonClick}
            button={button}
          />
          <div className="one-above">
            <div
              className="variable-names"
              ref={(el) => (elementRefs.current[`${button.id}`] = el)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleDivClick(button, e);
              }}
            >
              {button.id.split("-")[0] + button.id.split("-")[1]}
            </div>
            <div
              className="variable-names NOTX"
              ref={(el) => (elementRefs.current[`${button.id}-NOTX`] = el)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleNotDivClick(button, e);
              }}
            >
              {button.id.split("-")[0] + button.id.split("-")[1]}
            </div>
          </div>
        </div>
      ))}

      <div className="constants">
        <div
          className="one"
          id="X-0-constant"
          ref={(el) => (elementRefs.current["X-8-constant"] = el)}
          onContextMenu={(e) => {
            e.preventDefault();
            handleDivClick(constantX[0], e);
          }}
        >
          0
        </div>
        <div
          className="zero"
          id="X-1-constant"
          ref={(el) => (elementRefs.current["X-9-constant"] = el)}
          onContextMenu={(e) => {
            e.preventDefault();
            handleDivClick(constantX[1], e);
          }}
        >
          1
        </div>
      </div>
    </div>
  );
};

export default BulbAndButtons;
