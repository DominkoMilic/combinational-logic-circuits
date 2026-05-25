import type { Cable, CableEndpoint, CircuitElement } from "../types";
import {
  calculateBuffer, calculateNOT, calculateNOR, calculateNAND,
  calculateEXOR, calculateEXNOR, calculateDEMUXm2, calculateDEMUXm3,
  calculateMUXm1, calculateMUXm2, calculateMUXm3,
  calculateDFlipFlop, calculateJKFlipFlop, calculatePriorityEncoder, calculateY,
} from "./circuitCalculations";

const allComponents = [
  { elementId: "NOT", numberOfInputs: 1 }, { elementId: "buffer", numberOfInputs: 1 },
  { elementId: "NOR2Inputs", numberOfInputs: 2 }, { elementId: "NOR3Inputs", numberOfInputs: 3 },
  { elementId: "NOR4Inputs", numberOfInputs: 4 }, { elementId: "NOR8Inputs", numberOfInputs: 8 },
  { elementId: "NAND2Inputs", numberOfInputs: 2 }, { elementId: "NAND3Inputs", numberOfInputs: 3 },
  { elementId: "NAND4Inputs", numberOfInputs: 4 }, { elementId: "NAND8Inputs", numberOfInputs: 8 },
  { elementId: "EXOR", numberOfInputs: 2 }, { elementId: "EXNOR", numberOfInputs: 2 },
  { elementId: "MUXm1", numberOfInputs: 6 }, { elementId: "MUXm2", numberOfInputs: 9 },
  { elementId: "MUXm3", numberOfInputs: 14 }, { elementId: "DEMUXm2", numberOfInputs: 5 },
  { elementId: "DEMUXm3", numberOfInputs: 8 }, { elementId: "PriorityEncoder", numberOfInputs: 11 },
  { elementId: "DFlipFlop", numberOfInputs: 6 }, { elementId: "JKFlipFlop", numberOfInputs: 7 },
  { elementId: "Y", numberOfInputs: 1 },
];

let fullDFlipFlopElements: CircuitElement[] = [];
let fullJKFlipFlopElements: CircuitElement[] = [];

export const updateCablesAndElements = (
  cables: Cable[],
  xVariableValues: string[],
  xVarElements: CircuitElement[] = [],
) => {
  return cables.map((cable) => {
    let newElement1: CableEndpoint;
    const prefix = cable.element1.id.split("-")[0];
    if (prefix === "X") {
      const idx = cable.element1.id.split("-")[1];
      if (idx === "8") newElement1 = { ...cable.element1, value: "0" };
      else if (idx === "9") newElement1 = { ...cable.element1, value: "1" };
      else newElement1 = { ...cable.element1, value: xVariableValues[parseInt(idx)] };
    } else if (prefix === "Const0") {
      newElement1 = { ...cable.element1, value: "0" };
    } else if (prefix === "Const1") {
      newElement1 = { ...cable.element1, value: "1" };
    } else if (prefix === "XVar") {
      const idx = cable.element1.id.split("-")[1];
      const xv = xVarElements.find((e) => e.id === `XVar-${idx}`);
      newElement1 = { ...cable.element1, value: xv?.value === "1" ? "1" : "0" };
    } else {
      newElement1 = { ...cable.element1 };
    }
    return { element1: newElement1, element2: { ...cable.element2 } };
  });
};

export const updateYDiv = (
  cables: { element1: CableEndpoint; element2: CableEndpoint }[],
  setYVariableValues: React.Dispatch<React.SetStateAction<string[]>>,
  dFlipFlopElements: CircuitElement[],
  jkFlipFlopElements: CircuitElement[]
) => {
  fullDFlipFlopElements = [...dFlipFlopElements];
  fullJKFlipFlopElements = [...jkFlipFlopElements];

  const newYValues: string[] = [];
  for (let i = 0; i < 24; i++) {
    let path: CableEndpoint[] = [];
    findPath(cables, path, `Y-${i}`);
    const result = calculateOutput(path.reverse(), cables);
    newYValues.push(result || "0");
  }
  setYVariableValues(newYValues);
};

const findPath = (cables: { element1: CableEndpoint; element2: CableEndpoint }[], path: CableEndpoint[], yId: string) => {
  const idToCheck = yId.split("-")[0] + "-" + yId.split("-")[1];
  cables.forEach((cable) => {
    const cableId = cable.element2.id.split("-")[0] + "-" + cable.element2.id.split("-")[1];
    if (cableId === idToCheck) {
      path.push({ ...cable.element2, calculatedValue: undefined });
      const prefix = cable.element1.id.split("-")[0];
      if (prefix === "X") {
        const isNot = cable.element1.id.split("-")[2] === "NOTX";
        path.push({
          ...cable.element1,
          calculatedValue: isNot
            ? (cable.element1.value === "1" ? "0" : "1")
            : (cable.element1.value === "1" ? "1" : "0"),
        });
      } else if (prefix === "Const0") {
        path.push({ ...cable.element1, calculatedValue: "0" });
      } else if (prefix === "Const1") {
        path.push({ ...cable.element1, calculatedValue: "1" });
      } else if (prefix === "XVar") {
        const isNot = cable.element1.id.split("-")[2] === "output1";
        const v = cable.element1.value === "1" ? "1" : "0";
        path.push({
          ...cable.element1,
          calculatedValue: isNot ? (v === "1" ? "0" : "1") : v,
        });
      } else {
        findPath(cables, path, cable.element1.id);
      }
    }
  });
};

const calculateOutput = (path: CableEndpoint[], cables: { element1: CableEndpoint; element2: CableEndpoint }[]): string => {
  const indexOfY = path.findIndex((el) => el.id.split("-")[0] === "Y") + 1;
  const pathToCheck = path.slice(0, indexOfY);
  if (pathToCheck.length <= 1) return "0";

  let counter = 0;
  while (counter < indexOfY) {
    if (pathToCheck[counter].calculatedValue === undefined) {
      pathToCheck[counter].calculatedValue = chooseElementsForCalculation(counter, pathToCheck, cables);
    }
    counter++;
  }
  return (pathToCheck[counter - 1].calculatedValue as string) || "0";
};

const findInputCount = (id: string): number => {
  const found = allComponents.find((el) => el.elementId === id);
  return found ? found.numberOfInputs : 0;
};

const sortInputArray = (inputs: CableEndpoint[]): CableEndpoint[] => {
  const orderMap: Record<string, number> = {
    "1": 0, "2": 1, "3": 2, "4": 3, "5": 4, "6": 5, "7": 6, "8": 7,
    "9": 8, "A": 9, "B": 10, "C": 11, "D": 12, "E": 13,
  };
  const result: CableEndpoint[] = Array(inputs.length).fill(null);
  inputs.forEach((input) => {
    const idx = orderMap[input.orderNumber || "1"];
    if (idx !== undefined) result[idx] = input;
  });
  return result;
};

const checkIfInputsHaveOutputArray = (inputs: CableEndpoint[]): boolean =>
  inputs.some((input) => Array.isArray(input.calculatedValue));

const findCablesConnectedToGivenElement = (cables: { element1: CableEndpoint; element2: CableEndpoint }[], elementId: string) =>
  cables.filter((cable) => cable.element2.id.split("-")[0] + "-" + cable.element2.id.split("-")[1] === elementId);

const calculateInputForUse = (input: CableEndpoint, cablesForCalculation: { element1: CableEndpoint; element2: CableEndpoint }[]): string[] => {
  const elementName = input.id.split("-")[0] + "-" + input.id.split("-")[1];
  const searchedCable = cablesForCalculation.filter(
    (cable) => cable.element1.id.split("-")[0] + "-" + cable.element1.id.split("-")[1] === elementName
  );
  return searchedCable.map((cable) => cable.element1.id.split("-")[2].slice(-1));
};

const calculateAllElementsToAdd = (inputsInOrder: CableEndpoint[], outputIndices: string[]): CableEndpoint[] => {
  const result: CableEndpoint[] = [];
  for (let i = 0; i < outputIndices.length; i++) {
    const el = JSON.parse(JSON.stringify(inputsInOrder[i]));
    el.calculatedValue = (el.calculatedValue as string[])[parseInt(outputIndices[i])];
    result.push(el);
  }
  return result;
};

const calculateSingleOutput = (inputsInOrder: CableEndpoint[], cables: { element1: CableEndpoint; element2: CableEndpoint }[], fullNameElement: string): CableEndpoint[] => {
  const elementId = fullNameElement.split("-")[0] + "-" + fullNameElement.split("-")[1];
  const cablesForCalculation = findCablesConnectedToGivenElement(cables, elementId);
  const result: CableEndpoint[] = [];
  let processed = false;

  inputsInOrder.forEach((input) => {
    if (Array.isArray(input.calculatedValue)) {
      if (!processed) {
        const outputIndices = calculateInputForUse(input, cablesForCalculation);
        result.push(...calculateAllElementsToAdd(inputsInOrder, outputIndices));
        processed = true;
      }
    } else {
      result.push(input);
    }
  });
  return result;
};

const chooseCalculationGate = (gate: string, inputs: CableEndpoint[], elementId: string): string | string[] | undefined => {
  const calcInputs = inputs as unknown as { calculatedValue: string | undefined; orderNumber?: string }[];
  switch (gate) {
    case "NOT": return calculateNOT(calcInputs);
    case "buffer": return calculateBuffer(calcInputs);
    case "NOR2Inputs": case "NOR3Inputs": case "NOR4Inputs": case "NOR8Inputs": return calculateNOR(calcInputs);
    case "NAND2Inputs": case "NAND3Inputs": case "NAND4Inputs": case "NAND8Inputs": return calculateNAND(calcInputs);
    case "EXOR": return calculateEXOR(calcInputs);
    case "EXNOR": return calculateEXNOR(calcInputs);
    case "MUXm1": return calculateMUXm1(calcInputs);
    case "MUXm2": return calculateMUXm2(calcInputs);
    case "MUXm3": return calculateMUXm3(calcInputs);
    case "DEMUXm2": return calculateDEMUXm2(calcInputs);
    case "DEMUXm3": return calculateDEMUXm3(calcInputs);
    case "DFlipFlop": return calculateDFlipFlop(calcInputs, elementId, fullDFlipFlopElements);
    case "JKFlipFlop": return calculateJKFlipFlop(calcInputs, elementId, fullJKFlipFlopElements);
    case "PriorityEncoder": return calculatePriorityEncoder(calcInputs);
    case "Y": return calculateY(calcInputs);
    default: return undefined;
  }
};

const chooseElementsForCalculation = (currentIndex: number, path: CableEndpoint[], cables: { element1: CableEndpoint; element2: CableEndpoint }[]): string | string[] | undefined => {
  const inputCount = findInputCount(path[currentIndex].id.split("-")[0]);
  if (inputCount <= 0) return undefined;
  if (path.length <= 1) return undefined;

  const inputs: CableEndpoint[] = [];
  const elementId = path[currentIndex].id.split("-")[0] + "-" + path[currentIndex].id.split("-")[1];
  const fullNameElement = path[currentIndex].id;

  for (let i = 0; i < path.length; i++) {
    if (elementId === path[i].id.split("-")[0] + "-" + path[i].id.split("-")[1]) {
      if (inputCount !== inputs.length) {
        const lastWord = path[i].id.split("-")[2];
        const order = lastWord ? lastWord[lastWord.length - 1] : "1";
        const newInput = JSON.parse(JSON.stringify(path[i - 1] || {}));
        newInput.orderNumber = order;
        newInput.calculatedValue = path[i - 1]?.calculatedValue || [];
        inputs.push(newInput);
      } else break;
      if (!path[i - 1]) return undefined;
    }
  }

  if (inputCount !== inputs.length) {
    alert(`Not all cables are connected to element: ${elementId}`);
    return undefined;
  }

  const inputsInOrder = sortInputArray(inputs);
  const gate = elementId.split("-")[0];

  if (checkIfInputsHaveOutputArray(inputsInOrder)) {
    const newInputs = calculateSingleOutput(inputsInOrder, cables, fullNameElement);
    return chooseCalculationGate(gate, newInputs, elementId);
  }
  return chooseCalculationGate(gate, inputsInOrder, elementId);
};

export const calculateCP = (xVariableValues: string[], setXVariableValues: React.Dispatch<React.SetStateAction<string[]>>) => {
  let dec = 0;
  xVariableValues.forEach((x, i) => { if (x === "1") dec += Math.pow(2, i); });
  dec = dec + 1 <= 255 ? dec + 1 : 0;
  changeXValues(dec, setXVariableValues);
};

export const changeXValues = (decimalNumber: number, setXVariableValues: React.Dispatch<React.SetStateAction<string[]>>) => {
  const newX = Array(8).fill("0");
  let remaining = decimalNumber;
  for (let i = 7; i >= 0; i--) {
    if (remaining - Math.pow(2, i) >= 0) {
      newX[i] = "1";
      remaining -= Math.pow(2, i);
    }
  }
  setXVariableValues(newX);
};

export const calculateCableSpawnPosition = (event: React.MouseEvent, element: { id: string }): [number, number] => {
  if (!event.target || !element?.id) return [0, 0];
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const prefix = element.id.split("-")[0];
  if (prefix === "X") return [rect.left + rect.width, rect.top + rect.height / 2];
  if (prefix === "Y") return [rect.left, rect.top + rect.height / 2];
  return [rect.left + rect.width / 2, rect.top + rect.height / 2];
};

export const adjustCablePositionOnScreenSizeChange = (
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>,
  rect: DOMRect,
  element: { id: string; value: string | number },
  flag: "x" | "y"
) => {
  const calcPosition = () => {
    const prefix = element.id.split("-")[0];
    if (prefix === "X") return { x: rect.left + rect.width, y: rect.top + rect.height / 2 };
    if (prefix === "Y") return { x: rect.left, y: rect.top + rect.height / 2 };
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  setCables((prev) =>
    prev.map((cable) => {
      if (flag === "x" && cable.element1.id === element.id) {
        return { ...cable, element1: { ...cable.element1, position: calcPosition() } };
      }
      if (flag === "y" && cable.element2.id === element.id) {
        return { ...cable, element2: { ...cable.element2, position: calcPosition() } };
      }
      return cable;
    })
  );
};
