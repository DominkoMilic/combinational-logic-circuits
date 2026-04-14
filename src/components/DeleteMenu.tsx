import ColorSelection from "./ColorSelection";
import { sortJoints } from "../utils/elementManagement";
import type { Cable, SetFunctions, SelectedElement, PinIndicatorPosition, Position } from "../types";

interface DeleteMenuProps {
  position: { top: number; left: number };
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  elementId: string | null;
  deleteElement: (elementId: string, setFunctions: SetFunctions, setCables: React.Dispatch<React.SetStateAction<Cable[]>>) => void;
  setFunctions: SetFunctions;
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElement[]>>;
  setNewElement1: React.Dispatch<React.SetStateAction<SelectedElement | null>>;
  cableToDelete: Cable | null;
  setCableToDelete: React.Dispatch<React.SetStateAction<Cable | null>>;
  deleteCable: (cable: Cable, cables: Cable[], setCables: React.Dispatch<React.SetStateAction<Cable[]>>) => void;
  cables: Cable[];
  isColorWheelVisible: boolean;
  setIsColorWheelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  jointPosition: Position | null;
  setPinIndicatorPosition: React.Dispatch<React.SetStateAction<PinIndicatorPosition>>;
}

function DeleteMenu({
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
}: DeleteMenuProps) {
  if (!isVisible) return null;

  const menuTop = position.top < 500 ? position.top : position.top - 100;
  const menuLeft = position.left < 1000 ? position.left : position.left - 150;

  const handleDeleteClick = () => {
    if (cableToDelete) {
      deleteCable(cableToDelete, cables, setCables);
      setCableToDelete(null);
      setIsVisible(false);
    } else if (elementId) {
      setNewElement1(null);
      deleteElement(elementId, setFunctions, setCables);
      setSelectedElement([]);
      setPinIndicatorPosition({ top: undefined, left: undefined });
      setIsVisible(false);
    }
  };

  const handleAddJointClick = () => {
    if (!cableToDelete || !jointPosition) return;
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
          return { ...cable, joints: sortJoints(allPoints, cable) };
        }
        return cable;
      })
    );
  };

  const btnClass =
    "bg-gray-800 hover:bg-gray-700 text-gray-100 px-3 py-1.5 text-sm rounded cursor-pointer border border-gray-600 transition-colors w-full shadow-lg";

  return (
    <div className="absolute z-50 flex flex-col gap-1" style={{ top: menuTop, left: menuLeft }}>
      <button className={btnClass} onClick={handleDeleteClick}>
        DELETE
      </button>
      {cableToDelete && (
        <>
          <button className={btnClass} onClick={handleAddJointClick}>
            ADD JOINT
          </button>
          <button className={btnClass} onClick={() => setIsColorWheelVisible(true)}>
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
      )}
    </div>
  );
}

export default DeleteMenu;
