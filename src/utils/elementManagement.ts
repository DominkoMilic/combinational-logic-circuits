import type { Cable, CircuitElement, SetFunctions, Position } from "../types";

export const deleteElement = (element: string, setFunctions: SetFunctions, setCables: React.Dispatch<React.SetStateAction<Cable[]>>) => {
  let elementType = element.split("-")[0].toLowerCase();
  if (elementType === "priorityencoder") elementType = "encoder";

  Object.entries(setFunctions).forEach(([key, func]) => {
    const functionForElement = key.slice(3, -8).toLowerCase();
    if (functionForElement === elementType) {
      func((prev: CircuitElement[]) => prev.filter((el) => el.id !== element));
      setCables((prev) =>
        prev.filter((cable) => {
          const e1Id = cable.element1.id.split("-")[0] + "-" + cable.element1.id.split("-")[1];
          const e2Id = cable.element2.id.split("-")[0] + "-" + cable.element2.id.split("-")[1];
          return e1Id !== element && e2Id !== element;
        })
      );
    }
  });
};

export const clearAllElements = (
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>,
  setFunctions: SetFunctions,
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setMenuVisible(false);
  setDeleteVisible(false);
  setCables([]);
  Object.values(setFunctions).forEach((func) => func([]));
};

export const deleteCable = (cableToDelete: Cable, cables: Cable[], setCables: React.Dispatch<React.SetStateAction<Cable[]>>) => {
  setCables(cables.filter((cable) =>
    !(cable.element1 === cableToDelete.element1 && cable.element2 === cableToDelete.element2)
  ));
};

export const changeCableColor = (newColor: string): number => {
  const colors = [
    "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231",
    "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe",
    "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000",
    "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff",
  ];
  return colors.indexOf(newColor);
};

export const changeElementPosition = (element: CircuitElement, newPosition: Position) => {
  element.position = newPosition;
};

export const sortJoints = (allPoints: Position[], cable: Cable): Position[] => {
  return allPoints.slice(1, -1).sort((a, b) => {
    const distA = Math.hypot(a.x - cable.element1.position.x, a.y - cable.element1.position.y);
    const distB = Math.hypot(b.x - cable.element1.position.x, b.y - cable.element1.position.y);
    return distA - distB;
  });
};
