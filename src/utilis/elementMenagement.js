const deleteElement = (element, setFunctions, setCables) => {
  findSetFunctionForElement(element, setFunctions, setCables);
};

const findSetFunctionForElement = (element, setFunctions, setCables) => {
  let elementType = element.split("-")[0].toLowerCase();
  if (elementType === "priorityencoder") elementType = "encoder";
  Object.entries(setFunctions).forEach(([key, func]) => {
    const functionForElement = key.slice(3, -8).toLowerCase();
    if (functionForElement === elementType) {
      removeElementFromItsArray(func, element);
      removeCablesThatWereConnectedToDeletedElement(element, setCables);
    }
  });
};

const removeElementFromItsArray = (func, element) => {
  func((prevElements) => prevElements.filter((el) => el.id !== element));
};

const removeCablesThatWereConnectedToDeletedElement = (element, setCables) => {
  setCables((prevCables) =>
    prevCables.filter((cable) => {
      const element1Id =
        cable.element1.id.split("-")[0] + "-" + cable.element1.id.split("-")[1];
      const element2Id =
        cable.element2.id.split("-")[0] + "-" + cable.element2.id.split("-")[1];
      return element1Id !== element && element2Id !== element;
    })
  );
};

const clearAllElements = (
  setCables,
  setFunctions,
  setMenuVisible,
  setDeleteVisible
) => {
  setMenuVisible(false);
  setDeleteVisible(false);
  setCables([]);
  Object.entries(setFunctions).forEach(([_, func]) => {
    func([]);
  });
};

const deleteCable = (cableToDelete, cables, setCables) => {
  setCables(
    cables.filter(
      (cable) =>
        !(
          cable.element1 === cableToDelete.element1 &&
          cable.element2 === cableToDelete.element2
        )
    )
  );
};

const changeCableColor = (newColor) => {
  const colors = [
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
    "#e6beff",
    "#9a6324",
    "#fffac8",
    "#800000",
    "#aaffc3",
    "#808000",
    "#ffd8b1",
    "#000075",
    "#808080",
    "#ffffff",
  ];

  return colors.indexOf(newColor);
};

const changeElementPosition = (element, newPosition) => {
  element.position = newPosition;
};

const sortJoints = (allPoints, cable) => {
  return allPoints.slice(1, -1).sort((a, b) => {
    const distA = Math.hypot(
      a.x - cable.element1.position.x,
      a.y - cable.element1.position.y
    );
    const distB = Math.hypot(
      b.x - cable.element1.position.x,
      b.y - cable.element1.position.y
    );
    return distA - distB;
  });
};

export {
  deleteElement,
  deleteCable,
  clearAllElements,
  changeCableColor,
  changeElementPosition,
  sortJoints,
};
