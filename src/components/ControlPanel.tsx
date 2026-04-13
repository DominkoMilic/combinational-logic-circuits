import ControlPanelBulbs from "./ControlPanelBulbs";
import ControlPanelButtons from "./ControlPanelButtons";
import SelectedElementDisplay from "./SelectedElementDisplay";
import type { Cable, SetFunctions, SelectedElement, PinIndicatorPosition } from "../types";

interface ControlPanelProps {
  setXVariableValues: React.Dispatch<React.SetStateAction<string[]>>;
  xVariableValues: string[];
  setIsHelp: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>;
  cables: Cable[];
  setFunctions: SetFunctions;
  allElements: Record<string, unknown[]>;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newElement1: SelectedElement | null;
  setNewElement1: React.Dispatch<React.SetStateAction<SelectedElement | null>>;
  setOnLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setPinIndicatorPosition: React.Dispatch<React.SetStateAction<PinIndicatorPosition>>;
}

function ControlPanel({
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
}: ControlPanelProps) {
  return (
    <div className="flex items-center h-full bg-gray-500 px-2 gap-3">
      {/* Bulb indicators */}
      <div className="shrink-0">
        <ControlPanelBulbs
          setXVariableValues={setXVariableValues}
          xVariableValues={xVariableValues}
        />
      </div>

      {/* Control buttons */}
      <div className="shrink-0">
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

      {/* Selected element display */}
      <div className="flex-1 min-w-0">
        <SelectedElementDisplay
          newElement1={newElement1}
          setNewElement1={setNewElement1}
          setPinIndicatorPosition={setPinIndicatorPosition}
        />
      </div>

      {/* Info/Help buttons */}
      <div className="flex gap-2 shrink-0">
        <button
          className="bg-slate-600 hover:bg-slate-500 text-white w-8 h-8 rounded-full
                     flex items-center justify-center cursor-pointer border-none transition-colors
                     text-sm font-bold"
          onClick={() => { setIsInfoVisible(true); setIsHelp(false); }}
          title="Info"
        >
          i
        </button>
        <button
          className="bg-slate-600 hover:bg-slate-500 text-white w-8 h-8 rounded-full
                     flex items-center justify-center cursor-pointer border-none transition-colors
                     text-sm font-bold"
          onClick={() => { setIsInfoVisible(true); setIsHelp(true); }}
          title="Help"
        >
          ?
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
