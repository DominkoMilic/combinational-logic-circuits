import { useState } from "react";
import ColorWheel from "./ColorWheel";
import { changeCableColor } from "../utils/elementManagement";
import type { Cable } from "../types";

interface ColorSelectionProps {
  setIsColorWheelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cableToDelete: Cable;
}

function ColorSelection({
  setIsColorWheelVisible,
  setIsVisible,
  cableToDelete,
}: ColorSelectionProps) {
  const [selectedColor, setSelectedColor] = useState("#e6194b");

  const handleApplyColor = () => {
    setIsColorWheelVisible(false);
    setIsVisible(false);
    cableToDelete.color = changeCableColor(selectedColor);
  };

  return (
    <div className="flex flex-col items-center bg-slate-800 rounded p-2 mt-1">
      <ColorWheel selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <div className="flex gap-2 mt-2">
        <button
          className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 text-sm rounded
                     cursor-pointer border border-slate-500 transition-colors"
          onClick={handleApplyColor}
        >
          APPLY
        </button>
        <button
          className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 text-sm rounded
                     cursor-pointer border border-slate-500 transition-colors"
          onClick={() => setIsColorWheelVisible(false)}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default ColorSelection;
