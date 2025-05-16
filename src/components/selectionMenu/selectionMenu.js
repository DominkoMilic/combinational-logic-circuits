import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./selectionMenu.css";

const SelectionMenu = ({
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
}) => {
  const [previousCable, setPreviousCable] = useState(null);

  if (!visible) return null;

  const menuStyle = {
    top: position.top,
    left: position.left,
    position: "absolute",
  };

  const handleAddCable = (isInputCable) => {
    setMenuVisible(false);
    let newElement2 = null;

    if (previousCable == null || !newElement1) {
      setPreviousCable(isInputCable);
      setNewElement1(selectedElement[selectedElement.length - 1]);
    } else {
      if (isInputCable === previousCable) {
        alert(`Can't connect same I/O to other I/O!`);
        return;
      } else {
        newElement2 = selectedElement[selectedElement.length - 1];
      }
    }

    setPinIndicatorPosition({
      top: selectedElement[selectedElement.length - 1].position.y - 10,
      left: selectedElement[selectedElement.length - 1].position.x - 10,
    });

    if (newElement1 && newElement2) {
      let newCable;
      if (!isInputCable) {
        newCable = {
          id: uuidv4(),
          element1: newElement2,
          element2: newElement1,
          color: Math.floor(Math.random() * 21),
          joints: [],
        };
      } else {
        newCable = {
          id: uuidv4(),
          element1: newElement1,
          element2: newElement2,
          color: Math.floor(Math.random() * 21),
          joints: [],
        };
      }

      if (
        newElement1.id.split("-")[0] + newElement1.id.split("-")[1] ===
        newElement2.id.split("-")[0] + newElement2.id.split("-")[1]
      ) {
        alert("Can't connect cable input and output to same element!");
      } else {
        if (checkIfOutputElementAlreadyHaveCable(newCable.element2)) {
          setCables((prev) => [...prev, newCable]);
        } else {
          alert(
            `Can't add anymore input cables to ${newCable.element2.id} element!`
          );
        }
      }

      setSelectedElement([]);
      setPinIndicatorPosition({
        top: undefined,
        left: undefined,
      });
      setPreviousCable(null);
      setNewElement1(null);
    }
  };

  const checkIfOutputElementAlreadyHaveCable = (elementToCheck) => {
    let inputCounter = 0;
    cables.forEach((cable) => {
      if (cable.element2.id === elementToCheck.id) {
        inputCounter++;
      }
    });

    if (inputCounter >= elementToCheck.inputNumber) {
      return false;
    }
    return true;
  };

  return (
    <div className="selection-menu-div" style={menuStyle}>
      {cableOption === 0 ? (
        <button className="selection-menu" onClick={() => handleAddCable(true)}>
          ADD INPUT CABLE
        </button>
      ) : (
        <button
          className="selection-menu"
          onClick={() => handleAddCable(false)}
        >
          ADD OUTPUT CABLE
        </button>
      )}
    </div>
  );
};

export default SelectionMenu;
