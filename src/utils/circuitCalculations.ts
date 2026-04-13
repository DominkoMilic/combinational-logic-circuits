import type { CableEndpoint, CircuitElement } from "../types";

interface CalculationInput {
  calculatedValue: string | string[] | undefined;
  orderNumber?: string;
}

export const calculateBuffer = (inputs: CalculationInput[]): string | undefined => {
  if (inputs[0].calculatedValue === undefined) return undefined;
  return inputs[0].calculatedValue as string;
};

export const calculateNOT = (inputs: CalculationInput[]): string | undefined => {
  if (inputs[0].calculatedValue === undefined) return undefined;
  return inputs[0].calculatedValue === "1" ? "0" : "1";
};

export const calculateNOR = (inputs: CalculationInput[]): string | undefined => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) return undefined;
    if (inputs[i].calculatedValue === "1") return "0";
  }
  return "1";
};

export const calculateNAND = (inputs: CalculationInput[]): string | undefined => {
  let counter = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) return undefined;
    if (inputs[i].calculatedValue === "1") counter++;
  }
  return counter === inputs.length ? "0" : "1";
};

export const calculateEXNOR = (inputs: CalculationInput[]): string | undefined => {
  if (inputs[0].calculatedValue === undefined || inputs[1].calculatedValue === undefined) return undefined;
  return inputs[0].calculatedValue === inputs[1].calculatedValue ? "1" : "0";
};

export const calculateEXOR = (inputs: CalculationInput[]): string | undefined => {
  if (inputs[0].calculatedValue === undefined || inputs[1].calculatedValue === undefined) return undefined;
  return inputs[0].calculatedValue === inputs[1].calculatedValue ? "0" : "1";
};

export const calculateY = (inputs: CalculationInput[]): string | undefined => {
  if (inputs[0].calculatedValue === undefined) return undefined;
  return inputs[0].calculatedValue as string;
};

const calculateDecFromBinary = (codeWord: string): number | undefined => {
  const map: Record<string, number> = {
    "00": 0, "000": 0, "01": 1, "001": 1,
    "10": 2, "010": 2, "11": 3, "011": 3,
    "100": 4, "101": 5, "110": 6, "111": 7,
  };
  return map[codeWord];
};

export const calculateMUXm1 = (inputs: CalculationInput[]): string | undefined => {
  for (const input of inputs) if (input.calculatedValue === undefined) return undefined;
  if (inputs[5].calculatedValue === "1" && inputs[4].calculatedValue === "0" && inputs[1].calculatedValue === "0") {
    return inputs[0].calculatedValue === "0"
      ? inputs[2].calculatedValue as string
      : inputs[3].calculatedValue as string;
  }
  return undefined;
};

export const calculateMUXm2 = (inputs: CalculationInput[]): string | undefined => {
  for (const input of inputs) if (input.calculatedValue === undefined) return undefined;
  if (inputs[8].calculatedValue === "1" && inputs[7].calculatedValue === "0" && inputs[2].calculatedValue === "0") {
    const codeWord = (inputs[1].calculatedValue as string) + (inputs[0].calculatedValue as string);
    const dec = calculateDecFromBinary(codeWord);
    return dec !== undefined ? inputs[3 + dec].calculatedValue as string : undefined;
  }
  return undefined;
};

export const calculateMUXm3 = (inputs: CalculationInput[]): string[] | undefined => {
  for (const input of inputs) if (input.calculatedValue === undefined) return undefined;
  if (inputs[8].calculatedValue === "0" && inputs[9].calculatedValue === "0" && inputs[10].calculatedValue === "1") {
    const codeWord = (inputs[13].calculatedValue as string) + (inputs[12].calculatedValue as string) + (inputs[11].calculatedValue as string);
    const decWord = calculateDecFromBinary(codeWord);
    if (decWord === undefined) return undefined;
    const outputArray = Array(2).fill("0");
    outputArray[0] = inputs[decWord].calculatedValue as string;
    outputArray[1] = inputs[decWord].calculatedValue === "1" ? "0" : "1";
    return outputArray;
  }
  return undefined;
};

export const calculateDEMUXm2 = (inputs: CalculationInput[]): string[] | undefined => {
  for (const input of inputs) if (input.calculatedValue === undefined) return undefined;
  if (inputs[4].calculatedValue === "1" && inputs[3].calculatedValue === "0" && inputs[2].calculatedValue === "0") {
    const decWord = (inputs[1].calculatedValue as string) + (inputs[0].calculatedValue as string);
    const dec = calculateDecFromBinary(decWord);
    if (dec === undefined) return undefined;
    const outputArray = Array(4).fill("1");
    outputArray[dec] = "0";
    return outputArray;
  }
  return undefined;
};

export const calculateDEMUXm3 = (inputs: CalculationInput[]): string[] | undefined => {
  for (const input of inputs) if (input.calculatedValue === undefined) return undefined;
  if (inputs[3].calculatedValue === "0" && inputs[4].calculatedValue === "0" && inputs[5].calculatedValue === "1" && inputs[6].calculatedValue === "0" && inputs[7].calculatedValue === "1") {
    const codeWord = (inputs[2].calculatedValue as string) + (inputs[1].calculatedValue as string) + (inputs[0].calculatedValue as string);
    const decWord = calculateDecFromBinary(codeWord);
    if (decWord === undefined) return undefined;
    const outputArray = Array(8).fill("1");
    outputArray[decWord] = "0";
    return outputArray;
  }
  return undefined;
};

const getElementPrevValue = (elementId: string, fullArray: CircuitElement[]): string => {
  const el = fullArray.find((element) => elementId === element.id);
  return el?.prevQValue ?? "0";
};

const changeElementPrevValue = (elementId: string, fullArray: CircuitElement[], newValue: string): void => {
  const idx = fullArray.findIndex((element) => element.id === elementId);
  if (idx !== -1) fullArray[idx].prevQValue = newValue;
};

export const calculateDFlipFlop = (inputs: CalculationInput[], elementId: string, fullDFlipFlopElements: CircuitElement[]): string[] | undefined => {
  for (const input of inputs) if (input.calculatedValue === undefined) return undefined;
  const prevQ = getElementPrevValue(elementId, fullDFlipFlopElements);
  if (inputs[5].calculatedValue === "1" && inputs[4].calculatedValue === "0") {
    if (inputs[0].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullDFlipFlopElements, "0");
      return ["0", "1"];
    } else if (inputs[3].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullDFlipFlopElements, "1");
      return ["1", "0"];
    } else if (inputs[2].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullDFlipFlopElements, inputs[1].calculatedValue as string);
      return [inputs[1].calculatedValue as string, inputs[1].calculatedValue === "0" ? "1" : "0"];
    }
    return [prevQ, prevQ === "0" ? "1" : "0"];
  }
  return undefined;
};

export const calculateJKFlipFlop = (inputs: CalculationInput[], elementId: string, fullJKFlipFlopElements: CircuitElement[]): string[] | undefined => {
  for (const input of inputs) if (input.calculatedValue === undefined) return undefined;
  const prevQ = getElementPrevValue(elementId, fullJKFlipFlopElements);
  if (inputs[6].calculatedValue === "1" && inputs[5].calculatedValue === "0") {
    if (inputs[0].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullJKFlipFlopElements, "0");
      return ["0", "1"];
    } else if (inputs[4].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullJKFlipFlopElements, "0");
      return ["1", "0"];
    } else if (inputs[1].calculatedValue === "1") {
      if (inputs[3].calculatedValue === "0" && inputs[2].calculatedValue === "1") {
        changeElementPrevValue(elementId, fullJKFlipFlopElements, "0");
        return ["0", "1"];
      } else if (inputs[3].calculatedValue === "1" && inputs[2].calculatedValue === "0") {
        changeElementPrevValue(elementId, fullJKFlipFlopElements, "1");
        return ["1", "0"];
      } else if (inputs[3].calculatedValue === "0" && inputs[2].calculatedValue === "0") {
        return [prevQ, prevQ === "1" ? "0" : "1"];
      }
      return [prevQ === "1" ? "0" : "1", prevQ];
    }
    return [prevQ, prevQ === "1" ? "0" : "1"];
  }
  return undefined;
};

export const calculatePriorityEncoder = (inputs: CalculationInput[]): string[] | undefined => {
  for (const input of inputs) if (input.calculatedValue === undefined) return undefined;
  if (inputs[10].calculatedValue === "1" && inputs[9].calculatedValue === "0" && inputs[8].calculatedValue === "0") {
    let hpIndex = -1;
    for (let i = 0; i < 8; i++) {
      if (inputs[i].calculatedValue === "1") hpIndex = i;
    }
    const binMap: Record<number, string> = { 0: "000", 1: "001", 2: "010", 3: "011", 4: "100", 5: "101", 6: "110", 7: "111" };
    const outputBin = binMap[hpIndex] || "000";
    const outputArray = Array(5).fill("0");
    outputArray[0] = outputBin[0];
    outputArray[1] = outputBin[1];
    outputArray[2] = outputBin[2];
    if (hpIndex === -1) { outputArray[3] = "1"; outputArray[4] = "0"; }
    else { outputArray[3] = "0"; outputArray[4] = "1"; }
    return outputArray;
  }
  return undefined;
};
