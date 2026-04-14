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
    <div className="flex flex-col items-center bg-gray-900 rounded-lg p-2 mt-1 border border-gray-700 shadow-lg">
      <ColorWheel selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <div className="flex gap-2 mt-2">
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 text-sm rounded
                     cursor-pointer border-none transition-colors"
          onClick={handleApplyColor}
        >
          APPLY
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 text-sm rounded
                     cursor-pointer border border-gray-600 transition-colors"
          onClick={() => setIsColorWheelVisible(false)}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default ColorSelection;
