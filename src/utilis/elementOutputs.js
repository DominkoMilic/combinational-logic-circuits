const calculateBuffer = (inputs) => {
  if (inputs[0].calculatedValue === undefined) return undefined;
  return inputs[0].calculatedValue;
};

const calculateNOT = (inputs) => {
  if (inputs[0].calculatedValue === undefined) return undefined;
  return inputs[0].calculatedValue === "1" ? "0" : "1";
};

const calculateNOR = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    } else if (inputs[i].calculatedValue === "1") {
      return "0";
    }
  }
  return "1";
};

const calculateNAND = (inputs) => {
  let counter = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    } else if (inputs[i].calculatedValue === "1") {
      counter++;
    }
  }

  if (counter === inputs.length) return "0";
  else return "1";
};

const calculateEXNOR = (inputs) => {
  if (
    inputs[0].calculatedValue === undefined ||
    inputs[1].calculatedValue === undefined
  ) {
    return undefined;
  }
  if (
    (inputs[0].calculatedValue === "0" && inputs[1].calculatedValue === "0") ||
    (inputs[0].calculatedValue === "1" && inputs[1].calculatedValue === "1")
  ) {
    return "1";
  }
  return "0";
};

const calculateEXOR = (inputs) => {
  if (
    inputs[0].calculatedValue === undefined ||
    inputs[1].calculatedValue === undefined
  ) {
    return undefined;
  }
  if (
    (inputs[0].calculatedValue === "0" && inputs[1].calculatedValue === "0") ||
    (inputs[0].calculatedValue === "1" && inputs[1].calculatedValue === "1")
  ) {
    return "0";
  }
  return "1";
};

const calculateY = (inputs) => {
  if (inputs[0].calculatedValue === undefined) return undefined;
  else return inputs[0].calculatedValue;
};

const calculateMUXm3 = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    }
  }

  if (
    inputs[8].calculatedValue === "0" &&
    inputs[9].calculatedValue === "0" &&
    inputs[10].calculatedValue === "1"
  ) {
    const codeWord =
      inputs[13].calculatedValue +
      inputs[12].calculatedValue +
      inputs[11].calculatedValue;

    const decWord = calculateDecFromBinary(codeWord);
    const outputArray = Array(2).fill("0");

    outputArray[0] = inputs[decWord].calculatedValue;
    outputArray[1] = inputs[decWord].calculatedValue === "1" ? "0" : "1";

    return outputArray;
  } else {
    return undefined;
  }
};

const calculateDEMUXm3 = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    }
  }

  if (
    inputs[3].calculatedValue === "0" &&
    inputs[4].calculatedValue === "0" &&
    inputs[5].calculatedValue === "1" &&
    inputs[6].calculatedValue === "0" &&
    inputs[7].calculatedValue === "1"
  ) {
    const codeWord =
      inputs[2].calculatedValue +
      inputs[1].calculatedValue +
      inputs[0].calculatedValue;

    const decWord = calculateDecFromBinary(codeWord);

    const outputArray = Array(8).fill("1");
    outputArray[decWord] = "0";

    return outputArray;
  } else {
    return undefined;
  }
};

const calculateMUXm1 = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    }
  }

  if (
    inputs[5].calculatedValue === "1" &&
    inputs[4].calculatedValue === "0" &&
    inputs[1].calculatedValue === "0"
  ) {
    return inputs[0].calculatedValue === "0"
      ? inputs[2].calculatedValue
      : inputs[3].calculatedValue;
  } else {
    return undefined;
  }
};

const calculateMUXm2 = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    }
  }

  if (
    inputs[8].calculatedValue === "1" &&
    inputs[7].calculatedValue === "0" &&
    inputs[2].calculatedValue === "0"
  ) {
    const codeWord = inputs[1].calculatedValue + inputs[0].calculatedValue;

    return inputs[3 + calculateDecFromBinary(codeWord)].calculatedValue;
  } else {
    return undefined;
  }
};

const calculateDEMUXm2 = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    }
  }

  if (
    inputs[4].calculatedValue === "1" &&
    inputs[3].calculatedValue === "0" &&
    inputs[2].calculatedValue === "0"
  ) {
    const decWord = inputs[1].calculatedValue + inputs[0].calculatedValue;

    const outputArray = Array(4).fill("1");
    outputArray[calculateDecFromBinary(decWord)] = "0";

    return outputArray;
  } else {
    return undefined;
  }
};

const calculateJKFlipFlop = (inputs, elementId, fullJKFlipFlopElements) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    }
  }

  const prevQ = getElementPrevValue(elementId, fullJKFlipFlopElements);

  if (inputs[6].calculatedValue === "1" && inputs[5].calculatedValue === "0") {
    if (inputs[0].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullJKFlipFlopElements, "0");
      return ["0", "1"];
    } else if (inputs[4].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullJKFlipFlopElements, "0");
      return ["1", "0"];
    } else if (inputs[1].calculatedValue === "1") {
      if (
        inputs[3].calculatedValue === "0" &&
        inputs[2].calculatedValue === "1"
      ) {
        changeElementPrevValue(elementId, fullJKFlipFlopElements, "0");
        return ["0", "1"];
      } else if (
        inputs[3].calculatedValue === "1" &&
        inputs[2].calculatedValue === "0"
      ) {
        changeElementPrevValue(elementId, fullJKFlipFlopElements, "1");
        return ["1", "0"];
      } else if (
        inputs[3].calculatedValue === "0" &&
        inputs[2].calculatedValue === "0"
      ) {
        return [prevQ, prevQ === "1" ? "0" : "1"];
      } else {
        return [prevQ === "1" ? "0" : "1", prevQ];
      }
    } else {
      return [prevQ, prevQ === "1" ? "0" : "1"];
    }
  } else {
    return undefined;
  }
};

const calculateDFlipFlop = (inputs, elementId, fullDFlipFlopElements) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    }
  }

  const prevQ = getElementPrevValue(elementId, fullDFlipFlopElements);

  if (inputs[5].calculatedValue === "1" && inputs[4].calculatedValue === "0") {
    if (inputs[0].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullDFlipFlopElements, "0");
      return ["0", "1"];
    } else if (inputs[3].calculatedValue === "1") {
      changeElementPrevValue(elementId, fullDFlipFlopElements, "1");
      return ["1", "0"];
    } else if (inputs[2].calculatedValue === "1") {
      changeElementPrevValue(
        elementId,
        fullDFlipFlopElements,
        inputs[1].calculatedValue
      );
      return [
        inputs[1].calculatedValue,
        inputs[1].calculatedValue === "0" ? "1" : "0",
      ];
    } else {
      return [prevQ, prevQ === "0" ? "1" : "0"];
    }
  } else {
    return undefined;
  }
};

const calculatePriorityEncoder = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].calculatedValue === undefined) {
      return undefined;
    }
  }

  if (
    inputs[10].calculatedValue === "1" &&
    inputs[9].calculatedValue === "0" &&
    inputs[8].calculatedValue === "0"
  ) {
    const index = findHighestPriority1(inputs.slice(0, 8));
    const outputBin = findBinFromDec(index);
    const outputArray = Array(5).fill("0");

    outputArray[0] = outputBin[0];
    outputArray[1] = outputBin[1];
    outputArray[2] = outputBin[2];

    if (index === -1) {
      outputArray[3] = "1";
      outputArray[4] = "0";
    } else {
      outputArray[3] = "0";
      outputArray[4] = "1";
    }

    return outputArray;
  } else {
    return undefined;
  }
};

const findHighestPriority1 = (inputPins) => {
  let HPIndex = -1;
  inputPins.forEach((input, index) => {
    if (input.calculatedValue === "1") HPIndex = index;
  });

  return HPIndex;
};

const findBinFromDec = (index) => {
  const map = {
    0: "000",
    1: "001",
    2: "010",
    3: "011",
    4: "100",
    5: "101",
    6: "110",
    7: "111",
  };

  return map[index] || "000";
};

const calculateDecFromBinary = (codeWord) => {
  switch (codeWord) {
    case "00":
    case "000":
      return 0;
    case "01":
    case "001":
      return 1;
    case "10":
    case "010":
      return 2;
    case "11":
    case "011":
      return 3;
    case "100":
      return 4;
    case "101":
      return 5;
    case "110":
      return 6;
    case "111":
      return 7;
    default:
      return undefined;
  }
};

const getElementPrevValue = (elementId, fullArray) => {
  const searchedElement = fullArray.find((element) => elementId === element.id);
  return searchedElement?.prevQValue ?? null;
};

const changeElementPrevValue = (elementId, fullArray, newValue) => {
  const elementIndex = fullArray.findIndex(
    (element) => element.id === elementId
  );

  if (elementIndex !== -1) {
    fullArray[elementIndex].prevQValue = newValue;
  }
};

export {
  calculateBuffer,
  calculateNOR,
  calculateNAND,
  calculateNOT,
  calculateEXOR,
  calculateEXNOR,
  calculateMUXm1,
  calculateMUXm2,
  calculateMUXm3,
  calculateDEMUXm2,
  calculateDEMUXm3,
  calculateDFlipFlop,
  calculateJKFlipFlop,
  calculatePriorityEncoder,
  calculateY,
};
