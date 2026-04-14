import ElementDisplayBlock from "./ElementDisplayBlock";
import type { SelectedElement, PinIndicatorPosition } from "../types";

interface SelectedElementDisplayProps {
  newElement1: SelectedElement | null;
  setNewElement1: React.Dispatch<React.SetStateAction<SelectedElement | null>>;
  setPinIndicatorPosition: React.Dispatch<React.SetStateAction<PinIndicatorPosition>>;
}

function SelectedElementDisplay({
  newElement1,
  setNewElement1,
  setPinIndicatorPosition,
}: SelectedElementDisplayProps) {
  const resetSelectedElement = () => {
    setNewElement1(null);
    setPinIndicatorPosition({ top: undefined, left: undefined });
  };

  return (
    <div className="flex items-center gap-2 h-full">
      <ElementDisplayBlock newElement1={newElement1} />
      <button
        onClick={resetSelectedElement}
        className="bg-gray-700 hover:bg-gray-600 text-gray-100 text-[10px] px-2 py-1
                   rounded cursor-pointer border border-gray-600 transition-colors whitespace-nowrap"
      >
        RESET SELECTED ELEMENT
      </button>
    </div>
  );
}

export default SelectedElementDisplay;
