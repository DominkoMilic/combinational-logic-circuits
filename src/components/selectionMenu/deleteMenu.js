import React from "react";
import "./selectionMenu.css";
import ColorSelection from "./colorWheel/colorSelection";
import { sortJoints } from "../../utilis/elementMenagement";

const DeleteMenu = ({
  position,
  isVisible,
  setIsVisible,
  elementId,
  deleteElement,
  setFunctions,
  setCables,
  setSelectedElement,
  setNewElement1,
  cableToDelete,
  setCableToDelete,
  deleteCable,
  cables,
  isColorWheelVisible,
  setIsColorWheelVisible,
  jointPosition,
  setPinIndicatorPosition,
}) => {
  if (!isVisible) return null;

  const menuStyle = {
    top: position.top < 500 ? position.top : position.top - 100,
    left: position.left < 1000 ? position.left : position.left - 150,
    position: "absolute",
  };

  const handleDeleteClick = () => {
    if (cableToDelete) {
      deleteCable(cableToDelete, cables, setCables);
      setCableToDelete(null);
      setIsVisible(false);
    } else {
      setNewElement1(null);
      deleteElement(elementId, setFunctions, setCables);
      setSelectedElement([]);
      setPinIndicatorPosition({
        top: undefined,
        left: undefined,
      });
      setIsVisible(false);
    }
  };

  const handleCableColorChange = () => {
    setIsColorWheelVisible(true);
  };

  const handleAddJointClick = () => {
    setIsColorWheelVisible(false);
    setIsVisible(false);

    setCables((prevCables) =>
      prevCables.map((cable) => {
        if (cable.id === cableToDelete.id) {
          const allPoints = [
            cable.element1.position,
            ...cable.joints,
            { x: jointPosition.x, y: jointPosition.y },
            cable.element2.position,
          ];

          return {
            ...cable,
            joints: sortJoints(allPoints, cable),
          };
        }
        return cable;
      })
    );
  };

  return (
    <div className="selection-menu-div" style={menuStyle}>
      <button className="delete-menu" onClick={() => handleDeleteClick()}>
        DELETE
      </button>

      {cableToDelete ? (
        <>
          <button className="delete-menu" onClick={() => handleAddJointClick()}>
            ADD JOINT
          </button>
          <button
            className="delete-menu"
            onClick={() => handleCableColorChange()}
          >
            CHANGE COLOR
          </button>
          {isColorWheelVisible && (
            <ColorSelection
              setIsColorWheelVisible={setIsColorWheelVisible}
              setIsVisible={setIsVisible}
              cableToDelete={cableToDelete}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default DeleteMenu;
