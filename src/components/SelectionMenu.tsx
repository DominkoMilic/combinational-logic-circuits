import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Cable, SelectedElement, PinIndicatorPosition } from "../types";

interface SelectionMenuProps {
  visible: boolean;
  position: { top: number; left: number };
  cableOption: number;
  selectedElement: SelectedElement[];
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElement[]>>;
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cables: Cable[];
  newElement1: SelectedElement | null;
  setNewElement1: React.Dispatch<React.SetStateAction<SelectedElement | null>>;
  setPinIndicatorPosition: React.Dispatch<React.SetStateAction<PinIndicatorPosition>>;
}

function SelectionMenu({
  visible,
  position,
  cableOption,
  selectedElement,
  setSelectedElement,
  setCables,
  setMenuVisible,
  cables,
  newElement1,
  setNewElement1,
  setPinIndicatorPosition,
}: SelectionMenuProps) {
  const [previousCable, setPreviousCable] = useState<boolean | null>(null);

  if (!visible) return null;

  const handleAddCable = (isInputCable: boolean) => {
    setMenuVisible(false);
    let newElement2: SelectedElement | null = null;

    if (previousCable == null || !newElement1) {
      setPreviousCable(isInputCable);
      setNewElement1(selectedElement[selectedElement.length - 1]);
    } else {
      if (isInputCable === previousCable) {
        alert("Can't connect same I/O to other I/O!");
        return;
      }
      newElement2 = selectedElement[selectedElement.length - 1];
    }

    setPinIndicatorPosition({
      top: selectedElement[selectedElement.length - 1].position.y - 10,
      left: selectedElement[selectedElement.length - 1].position.x - 10,
    });

    if (newElement1 && newElement2) {
      const el1Id = newElement1.id.split("-")[0] + newElement1.id.split("-")[1];
      const el2Id = newElement2.id.split("-")[0] + newElement2.id.split("-")[1];

      if (el1Id === el2Id) {
        alert("Can't connect cable input and output to same element!");
      } else {
        const newCable: Cable = isInputCable
          ? {
              id: uuidv4(),
              element1: newElement1,
              element2: newElement2,
              color: Math.floor(Math.random() * 21),
              joints: [],
            }
          : {
              id: uuidv4(),
              element1: newElement2,
              element2: newElement1,
              color: Math.floor(Math.random() * 21),
              joints: [],
            };

        const inputCount = cables.filter(
          (c) => c.element2.id === newCable.element2.id
        ).length;

        if (inputCount < (newCable.element2.inputNumber ?? 1)) {
          setCables((prev) => [...prev, newCable]);
        } else {
          alert(`Can't add anymore input cables to ${newCable.element2.id} element!`);
        }
      }

      setSelectedElement([]);
      setPinIndicatorPosition({ top: undefined, left: undefined });
      setPreviousCable(null);
      setNewElement1(null);
    }
  };

  return (
    <div
      className="absolute z-50"
      style={{ top: position.top, left: position.left }}
    >
      <button
        className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5
                   text-sm rounded cursor-pointer border border-slate-500 transition-colors"
        onClick={() => handleAddCable(cableOption === 0)}
      >
        {cableOption === 0 ? "ADD INPUT CABLE" : "ADD OUTPUT CABLE"}
      </button>
    </div>
  );
}

export default SelectionMenu;
