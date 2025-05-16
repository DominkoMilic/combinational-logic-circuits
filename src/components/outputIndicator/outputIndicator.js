import React, { useEffect, useState, useRef } from "react";
import "./outputIndicator.css";
import { adjustCablePositionOnScreenSizeChange } from "../../utilis/utilis";

const OutputIndicator = ({
  yVariableValues,
  handleElementClick,
  onLoad,
  setCables,
}) => {
  const elementRefs = useRef({});
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < 1300 ? true : false
  );
  const [yDiv, setYDiv] = useState(
    Array.from({ length: 24 }, (_, index) => ({
      value: `0`,
      id: `Y-${index}`,
    }))
  );

  useEffect(() => {
    const newYDiv = [];
    yVariableValues.forEach((y, index) => {
      const newElement = {
        value: y,
        id: `Y-${index}`,
      };
      newYDiv.push(newElement);
    });
    setYDiv(newYDiv);
  }, [yVariableValues]);

  const handleYDivClick = (div, e) => {
    const inputNumber = 1;
    handleElementClick(div, e, 0, inputNumber);
  };

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1300 ? true : false);
      Object.entries(elementRefs.current).forEach(([key, el]) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          adjustCablePositionOnScreenSizeChange(
            setCables,
            rect,
            {
              value: "0",
              id: key,
            },
            "y"
          );
        }
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [onLoad]);

  return (
    <div className="output-block">
      {yDiv.map((div) => (
        <div
          key={div.id}
          id={div.id}
          className="Y-number"
          ref={(el) => (elementRefs.current[`${div.id}`] = el)}
          onContextMenu={(e) => {
            e.preventDefault();
            handleYDivClick(div, e);
          }}
          style={{ justifyContent: `${isSmallScreen ? "center" : ""}` }}
        >
          <div
            className="Y-bulb"
            style={{ backgroundColor: div.value === "1" ? "green" : "red" }}
          ></div>

          {isSmallScreen ? "" : div.id}
        </div>
      ))}
    </div>
  );
};

export default OutputIndicator;
