import { useState } from "react";
import { calculateCP, changeXValues } from "../utils/circuitEngine";
import { clearAllElements } from "../utils/elementManagement";
import { saveFile } from "../utils/saveAndLoad";
import LoadOption from "./LoadOption";
import type { Cable, SetFunctions, SelectedElement, PinIndicatorPosition } from "../types";

interface ControlPanelButtonsProps {
  xVariableValues: string[];
  setXVariableValues: React.Dispatch<React.SetStateAction<string[]>>;
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>;
  cables: Cable[];
  setFunctions: SetFunctions;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setNewElement1: React.Dispatch<React.SetStateAction<SelectedElement | null>>;
  allElements: Record<string, unknown[]>;
  setOnLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setPinIndicatorPosition: React.Dispatch<React.SetStateAction<PinIndicatorPosition>>;
}

function ControlPanelButtons({
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
}: ControlPanelButtonsProps) {
  const [loadOptionVisibility, setLoadOptionVisibility] = useState(false);

  const btnClass =
    "bg-gray-700 hover:bg-gray-600 text-gray-100 text-xs px-3 py-1.5 rounded cursor-pointer border border-gray-600 transition-colors";

  return (
    <div className="flex items-center gap-2 h-full px-2">
      <button className={btnClass} onClick={() => calculateCP(xVariableValues, setXVariableValues)}>
        CP
      </button>
      <button className={btnClass} onClick={() => changeXValues(0, setXVariableValues)}>
        RESET
      </button>
      <button
        className={btnClass}
        onClick={() => {
          setNewElement1(null);
          setPinIndicatorPosition({ top: undefined, left: undefined });
          clearAllElements(setCables, setFunctions, setMenuVisible, setDeleteVisible);
        }}
      >
        CLEAR
      </button>
      <button className={btnClass} onClick={() => setLoadOptionVisibility(true)}>
        LOAD
      </button>
      <button className={btnClass} onClick={() => saveFile(allElements, cables)}>
        SAVE
      </button>
      {loadOptionVisibility && (
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
}

export default ControlPanelButtons;
