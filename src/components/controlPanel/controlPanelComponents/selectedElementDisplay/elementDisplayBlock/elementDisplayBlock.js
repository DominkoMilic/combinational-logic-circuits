import React, { useState, useEffect } from "react";
import "./elementDisplayBlock.css";
import {
  createElementDisplayNameFromId,
  findImagePath,
} from "../../../../../utilis/controlPanel";

const ElementDisplayBlock = ({ newElement1 }) => {
  const [elementNameDisplay, setElementNameDisplay] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [elementIODisplay, setElementIODisplay] = useState(null);

  useEffect(() => {
    if (newElement1 === null) {
      setElementNameDisplay(null);
      setElementIODisplay(null);
      setImagePath(null);
    } else {
      const name = createElementDisplayNameFromId(newElement1.id);
      setImagePath(findImagePath(name[0]));
      setElementNameDisplay(name[0]);
      setElementIODisplay(name[1]);
    }
  }, [newElement1]);

  return (
    <div className="element-name-display-block">
      <div className="display-element-text">
        <p>
          <span className="bold-text">Selected element ID:</span>{" "}
          <span
            className={elementNameDisplay?.startsWith("!") ? "overline" : ""}
          >
            {elementNameDisplay?.replace(/^!/, "")}
          </span>
          <br />
          <span className="bold-text">I/O: </span>
          {elementIODisplay ? (
            <>
              {elementIODisplay.split(" ")[0]}{" "}
              <span
                className={
                  elementIODisplay.split(" ")[1]?.startsWith("!")
                    ? "overline"
                    : ""
                }
              >
                {elementIODisplay.split(" ")[1]?.replace(/^!/, "")}
              </span>
            </>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="display-element-image">
        {imagePath ? <img src={imagePath} alt="" /> : <></>}
      </div>
    </div>
  );
};

export default ElementDisplayBlock;
