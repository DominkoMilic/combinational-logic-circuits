import {
  calculateBuffer,
  calculateNOT,
  calculateNOR,
  calculateNAND,
  calculateEXOR,
  calculateEXNOR,
  calculateDEMUXm2,
  calculateDEMUXm3,
  calculateMUXm1,
  calculateMUXm2,
  calculateMUXm3,
  calculateDFlipFlop,
  calculateJKFlipFlop,
  calculatePriorityEncoder,
  calculateY,
} from "./elementOutputs";

const allComponents = [
  { elementId: "NOT", numberOfInputs: 1, numberOfOutputs: 1 },
  { elementId: "buffer", numberOfInputs: 1, numberOfOutputs: 1 },
  { elementId: "NOR2Inputs", numberOfInputs: 2, numberOfOutputs: 1 },
  { elementId: "NOR3Inputs", numberOfInputs: 3, numberOfOutputs: 1 },
  { elementId: "NOR4Inputs", numberOfInputs: 4, numberOfOutputs: 1 },
  { elementId: "NOR8Inputs", numberOfInputs: 8, numberOfOutputs: 1 },
  { elementId: "NAND2Inputs", numberOfInputs: 2, numberOfOutputs: 1 },
  { elementId: "NAND3Inputs", numberOfInputs: 3, numberOfOutputs: 1 },
  { elementId: "NAND4Inputs", numberOfInputs: 4, numberOfOutputs: 1 },
  { elementId: "NAND8Inputs", numberOfInputs: 8, numberOfOutputs: 1 },
  { elementId: "EXOR", numberOfInputs: 2, numberOfOutputs: 1 },
  { elementId: "EXNOR", numberOfInputs: 2, numberOfOutputs: 1 },
  { elementId: "MUXm1", numberOfInputs: 6, numberOfOutputs: 1 },
  { elementId: "MUXm2", numberOfInputs: 9, numberOfOutputs: 1 },
  { elementId: "MUXm3", numberOfInputs: 14, numberOfOutputs: 2 },
  { elementId: "DEMUXm2", numberOfInputs: 5, numberOfOutputs: 4 },
  { elementId: "DEMUXm3", numberOfInputs: 8, numberOfOutputs: 8 },
  { elementId: "PriorityEncoder", numberOfInputs: 11, numberOfOutputs: 5 },
  { elementId: "DFlipFlop", numberOfInputs: 6, numberOfOutputs: 2 },
  { elementId: "JKFlipFlop", numberOfInputs: 7, numberOfOutputs: 2 },
  { elementId: "Y", numberOfInputs: 1, numberOfOutputs: 0 },
];

const fullDFlipFlopElements = [];
const fullJKFlipFlopElements = [];

const updateCablesAndElements = (cables, xVariableValues) => {
  const updatedCables = [];
  let newElement1, newElement2;
  cables.forEach((cable) => {
    if (cable.element1.id.split("-")[0] === "X") {
      if (cable.element1.id.split("-")[1] === "8") {
        newElement1 = {
          ...cable.element1,
          value: "0",
        };
      } else if (cable.element1.id.split("-")[1] === "9") {
        newElement1 = {
          ...cable.element1,
          value: "1",
        };
      } else {
        const indexToUpdate = cable.element1.id.split("-")[1];
        newElement1 = {
          ...cable.element1,
          value: xVariableValues[indexToUpdate],
        };
      }
    } else {
      newElement1 = {
        ...cable.element1,
      };
    }
    newElement2 = {
      ...cable.element2,
    };
    const newCable = {
      element1: newElement1,
      element2: newElement2,
    };
    updatedCables.push(newCable);
  });

  return updatedCables;
};

const updateYDiv = (
  cables,
  setYVariableValues,
  dFlipFlopElements,
  jkFlipFlopElements
) => {
  const newYValues = [];

  fullDFlipFlopElements.length = 0;
  fullDFlipFlopElements.push(...dFlipFlopElements);

  fullJKFlipFlopElements.length = 0;
  fullJKFlipFlopElements.push(...jkFlipFlopElements);

  let path = [];
  for (let i = 0; i < 24; i++) {
    findPath(cables, path, `Y-${i}`);
    const calculatedOutputs = calculateOutput(path.reverse(), cables);
    newYValues.push(calculatedOutputs);
    path = [];
  }

  setYVariableValues(newYValues);
};

const findPath = (cables, path, yId) => {
  const idToCheck = yId.split("-")[0] + "-" + yId.split("-")[1];
  cables.forEach((cable) => {
    const cableElementIdTOCheck =
      cable.element2.id.split("-")[0] + "-" + cable.element2.id.split("-")[1];
    if (cableElementIdTOCheck === idToCheck) {
      const newElement = {
        ...cable.element2,
        calculatedValue: undefined,
      };
      path.push(newElement);
      if (cable.element1.id.split("-")[0] !== "X") {
        findPath(cables, path, cable.element1.id);
      } else {
        let newElement;
        if (cable.element1.id.split("-")[2] === "NOTX") {
          newElement = {
            ...cable.element1,
            calculatedValue: cable.element1.value === "1" ? "0" : "1",
          };
        } else {
          newElement = {
            ...cable.element1,
            calculatedValue: cable.element1.value === "1" ? "1" : "0",
          };
        }
        path.push(newElement);
      }
    }
  });
};

const calculateOutput = (path, cables) => {
  const indexOfY =
    path.findIndex((element) => element.id.split("-")[0] === "Y") + 1;
  let counter = 0;
  const pathToCheck = path.slice(0, indexOfY);
  if (pathToCheck.length > 1) {
    while (counter < indexOfY) {
      if (pathToCheck[counter].calculatedValue === undefined) {
        const valueToAssign = chooseElementsForCalculation(
          counter,
          pathToCheck,
          cables
        );
        pathToCheck[counter].calculatedValue = valueToAssign;
      }
      counter++;
    }

    return pathToCheck[counter - 1].calculatedValue;
  } else {
    return "0";
  }
};

const chooseElementsForCalculation = (currentIndex, path, cables) => {
  const inputs = [];
  let elementId;
  let fullNameElement;
  const inputCount = findInputCount(path[currentIndex].id.split("-")[0]);
  if (inputCount > 0) {
    if (path.length > 1) {
      elementId =
        path[currentIndex].id.split("-")[0] +
        "-" +
        path[currentIndex].id.split("-")[1];
      fullNameElement = path[currentIndex].id;
      for (let i = 0; i < path.length; i++) {
        if (
          elementId ===
          path[i].id.split("-")[0] + "-" + path[i].id.split("-")[1]
        ) {
          if (inputCount !== inputs.length) {
            const lastWordInIndex = path[i].id.split("-")[2];
            const order = lastWordInIndex
              ? lastWordInIndex[lastWordInIndex.length - 1]
              : "1";
            const newInput = JSON.parse(JSON.stringify(path[i - 1]));
            newInput.orderNumber = order;
            newInput.calculatedValue = path[i - 1]?.calculatedValue || [];

            inputs.push(newInput);
          } else {
            break;
          }
          if (!path[i - 1]) {
            if (path[i - 1].calculatedValue === undefined) {
              console.log(
                "element prije nije definrian, treba ga izracunat: ",
                path[i - 1]
              );
              return;
            }
            return;
          }
        }
      }
    } else {
      console.log("na tu varijablu nista nije spojeno");
    }

    if (inputCount !== inputs.length) {
      alert(`Not all cables are connected to element: ${elementId}`);
      return;
    } else {
      const inputsInOrder = sortInputArray(inputs);
      const gate = elementId.split("-")[0];
      let output;

      if (checkIfInputsHaveOutputArray(inputsInOrder)) {
        const newInputsInOrder = calculateSingleOutput(
          inputsInOrder,
          cables,
          fullNameElement
        );
        output = chooseCalculationGate(gate, newInputsInOrder, elementId);
      } else {
        output = chooseCalculationGate(gate, inputsInOrder, elementId);
      }

      return output;
    }
  } else {
    return;
  }
};

const checkIfInputsHaveOutputArray = (inputsInOrder) => {
  return inputsInOrder.some((input) => Array.isArray(input.calculatedValue));
};

const findCablesConnectedToGivenElement = (cables, elementId) => {
  return cables.filter(
    (cable) =>
      cable.element2.id.split("-")[0] +
        "-" +
        cable.element2.id.split("-")[1] ===
      elementId
  );
};

const calculateSingleOutput = (inputsInOrder, cables, fullNameElement) => {
  fullNameElement =
    fullNameElement.split("-")[0] + "-" + fullNameElement.split("-")[1];

  const cablesForCalculation = findCablesConnectedToGivenElement(
    cables,
    fullNameElement
  );

  const newInputArray = [];

  let flag = false;

  inputsInOrder.forEach((input) => {
    if (Array.isArray(input.calculatedValue)) {
      if (!flag) {
        input = calculateInputForUse(input, cablesForCalculation);
        const newInputElements = calculateAllElementsToAdd(
          inputsInOrder,
          input
        );
        newInputArray.push(...newInputElements);
        flag = true;
      }
    } else {
      newInputArray.push(input);
    }
  });

  return newInputArray;
};

const calculateInputForUse = (input, cablesForCalculation) => {
  const elementName = input.id.split("-")[0] + "-" + input.id.split("-")[1];

  const searchedCable = cablesForCalculation.filter(
    (cable) =>
      cable.element1.id.split("-")[0] +
        "-" +
        cable.element1.id.split("-")[1] ===
      elementName
  );

  const outputIndex = [];
  searchedCable.forEach((cable) => {
    outputIndex.push(cable.element1.id.split("-")[2].slice(-1));
  });
  return outputIndex;
};

const calculateAllElementsToAdd = (inputsInOrder, input) => {
  const newInputsInOrder = [];
  for (let i = 0; i < input.length; i++) {
    const originalElement = inputsInOrder[i];
    const newElement = JSON.parse(JSON.stringify(originalElement));
    newElement.calculatedValue = newElement.calculatedValue[input[i]];
    newInputsInOrder.push(newElement);
  }

  return newInputsInOrder;
};

const chooseCalculationGate = (gate, inputs, elementId) => {
  switch (gate) {
    case "NOT":
      return calculateNOT(inputs);

    case "buffer":
      return calculateBuffer(inputs);

    case "NOR2Inputs":
    case "NOR3Inputs":
    case "NOR4Inputs":
    case "NOR8Inputs":
      return calculateNOR(inputs);

    case "NAND2Inputs":
    case "NAND3Inputs":
    case "NAND4Inputs":
    case "NAND8Inputs":
      return calculateNAND(inputs);

    case "EXOR":
      return calculateEXOR(inputs);

    case "EXNOR":
      return calculateEXNOR(inputs);

    case "MUXm1":
      return calculateMUXm1(inputs);
    case "MUXm2":
      return calculateMUXm2(inputs);
    case "MUXm3":
      return calculateMUXm3(inputs);

    case "DEMUXm2":
      return calculateDEMUXm2(inputs);
    case "DEMUXm3":
      return calculateDEMUXm3(inputs);

    case "DFlipFlop":
      return calculateDFlipFlop(inputs, elementId, fullDFlipFlopElements);

    case "JKFlipFlop":
      return calculateJKFlipFlop(inputs, elementId, fullJKFlipFlopElements);

    case "PriorityEncoder":
      return calculatePriorityEncoder(inputs);

    case "Y":
      return calculateY(inputs);

    default:
      break;
  }
};

const calculateCP = (xVariableValues, setXVariableValues) => {
  let decimalNumber = 0;
  xVariableValues.forEach((x, index) => {
    if (x === "1") {
      decimalNumber += Math.pow(2, index);
    }
  });

  decimalNumber = decimalNumber + 1 <= 255 ? decimalNumber + 1 : 0;

  changeXValues(decimalNumber, setXVariableValues);
};

const changeXValues = (decimalNumber, setXVariableValues) => {
  const newX = Array(8).fill(0);
  for (let i = 7; i >= 0; i--) {
    if (decimalNumber - Math.pow(2, i) >= 0) {
      newX[i] = "1";
      decimalNumber -= Math.pow(2, i);
    }
  }

  setXVariableValues(newX);
};

const sortInputArray = (inputs) => {
  const orderMap = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    A: 9,
    B: 10,
    C: 11,
    D: 12,
    E: 13,
  };

  const newInputs = Array(inputs.length).fill(null);
  inputs.forEach((input) => {
    const index = orderMap[input.orderNumber];
    if (index !== undefined) {
      newInputs[index] = input;
    }
  });

  return newInputs;
};

const findInputCount = (id) => {
  const foundElement = allComponents.find(
    (element) => element.elementId === id
  );
  return foundElement ? foundElement.numberOfInputs : 0;
};

const calculateCableSpawnPosition = (event, element) => {
  if (!event.target || !element?.id) return [0, 0];

  const elementBounds = event.target.getBoundingClientRect();
  let pointX, pointY;

  if (element.id.split("-")[0] === "X") {
    pointX = elementBounds.left + elementBounds.width;
    pointY = elementBounds.top + elementBounds.height / 2;
  } else if (element.id.split("-")[0] === "Y") {
    pointX = elementBounds.left;
    pointY = elementBounds.top + elementBounds.height / 2;
  } else {
    pointX = elementBounds.left + elementBounds.width / 2;
    pointY = elementBounds.top + elementBounds.height / 2;
  }

  return [pointX, pointY];
};

const adjustCablePositionOnScreenSizeChange = (
  setCables,
  rect,
  element,
  flag
) => {
  if (flag === "x") {
    adjustInput(setCables, rect, element);
  } else {
    adjustOutput(setCables, rect, element);
  }
};

const adjustInput = (setCables, rect, element) => {
  setCables((prevCables) => {
    return prevCables.map((cable) => {
      if (cable.element1.id === element.id) {
        const newPosition = calculateNewPosition(element, rect);

        return {
          ...cable,
          element1: {
            ...cable.element1,
            position: newPosition,
          },
        };
      }
      return cable;
    });
  });
};

const adjustOutput = (setCables, rect, element) => {
  setCables((prevCables) => {
    return prevCables.map((cable) => {
      if (cable.element2.id === element.id) {
        const newPosition = calculateNewPosition(element, rect);

        return {
          ...cable,
          element2: {
            ...cable.element2,
            position: newPosition,
          },
        };
      }
      return cable;
    });
  });
};

const calculateNewPosition = (element, rect) => {
  let pointX, pointY;

  if (element.id.split("-")[0] === "X") {
    pointX = rect.left + rect.width;
    pointY = rect.top + rect.height / 2;
  } else if (element.id.split("-")[0] === "Y") {
    pointX = rect.left;
    pointY = rect.top + rect.height / 2;
  } else {
    pointX = rect.left + rect.width / 2;
    pointY = rect.top + rect.height / 2;
  }

  return { x: pointX, y: pointY };
};

export {
  updateCablesAndElements,
  updateYDiv,
  calculateCP,
  changeXValues,
  calculateCableSpawnPosition,
  adjustCablePositionOnScreenSizeChange,
};
