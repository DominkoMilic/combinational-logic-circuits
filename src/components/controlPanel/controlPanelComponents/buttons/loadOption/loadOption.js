import React from "react";
import "./loadOption.css";
import { loadFile } from "../../../../../utilis/saveAndLoad";
import PremadeOption from "./premadeOption/premadeOption";
import { premadeCircuit } from "../../../../../utilis/premadeCircuts";

const LoadOption = ({
  setLoadOptionVisibility,
  setCables,
  setFunctions,
  setMenuVisible,
  setDeleteVisible,
  setOnLoad,
}) => {
  const handleCancelClick = () => {
    setLoadOptionVisibility(false);
  };

  const handleLoadFromPC = async (file) => {
    try {
      await loadFile(
        setCables,
        setFunctions,
        setMenuVisible,
        setDeleteVisible,
        file
      );
    } catch (error) {
      console.error("Error loading file:", error);
      alert("An error occurred while loading the file. Please try again.");
    }
    setOnLoad((prev) => !prev);
    setLoadOptionVisibility(false);
  };

  return (
    <div className="load-options-full">
      <div className="load-options-container">
        <div className="premade-circuits">
          {premadeCircuit.map((circuit, index) => (
            <PremadeOption
              key={index}
              image={circuit.image}
              title={circuit.title}
              file={circuit.file}
              handleLoadFromPC={handleLoadFromPC}
            />
          ))}
        </div>
        <div className="upload-cancel-container">
          <button onClick={() => handleLoadFromPC(null)}>UPLOAD FILE</button>
          <button onClick={handleCancelClick}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default LoadOption;
