const wireNameMaps: Record<string, Record<string, string>> = {
  MUXm1: {
    input6: "VCC", input5: "GND", input4: "U1", input3: "U0",
    input2: "E", input1: "A0", output0: "I",
  },
  MUXm2: {
    input9: "VCC", input8: "GND", input7: "U3", input6: "U2",
    input5: "U1", input4: "U0", input3: "!E", input2: "A1",
    input1: "A0", output0: "I",
  },
  MUXm3: {
    input1: "U0", input2: "U1", input3: "U2", input4: "U3",
    input5: "U4", input6: "U5", input7: "U6", input8: "U7",
    input9: "!E", inputA: "GND", inputB: "VCC", inputC: "A0",
    inputD: "A1", inputE: "A2", output0: "I", output1: "!I",
  },
  DEMUXm2: {
    input5: "VCC", input4: "GND", input3: "!U", input2: "A1",
    input1: "A0", output3: "!I3", output2: "!I2", output1: "!I1",
    output0: "!I0",
  },
  DEMUXm3: {
    input8: "VCC", input7: "GND", input6: "U3", input5: "!U2",
    input4: "!U1", input3: "A2", input2: "A1", input1: "A0",
    output7: "!I7", output6: "!I6", output5: "!I5", output4: "!I4",
    output3: "!I3", output2: "!I2", output1: "!I1", output0: "!I0",
  },
  DFlipFlop: {
    input6: "VCC", input5: "GND", input4: "!S", input3: "CP",
    input2: "D", input1: "!R", output1: "!Q", output0: "Q",
  },
  JKFlipFlop: {
    input7: "VCC", input6: "GND", input5: "!S", input4: "J",
    input3: "K", input2: "CP", input1: "!R", output1: "!Q",
    output0: "Q",
  },
  PriorityEncoder: {
    inputD: "!GS", inputC: "!EI", inputB: "VCC", inputA: "GND",
    input9: "!EU", input8: "!U7", input7: "!U6", input6: "!U5",
    input5: "!U4", input4: "!U3", input3: "!U2", input2: "!U1",
    input1: "!U0", output2: "I2", output1: "I1", output0: "I0",
  },
};

const icElementTypes = new Set(Object.keys(wireNameMaps));

export const createElementDisplayNameFromId = (elementId: string): [string, string | null] => {
  const idArray = elementId.split("-");
  let elementName = idArray[0] + "-" + idArray[1];
  let elementWire: string | null = null;

  if (!idArray[2]) return [elementName, elementWire];

  const elementType = idArray[0];

  if (elementId === "X-8-constant" || elementId === "X-9-constant") {
    return [idArray[1] === "8" ? "low" : "high", ""];
  }

  if (icElementTypes.has(elementType)) {
    const isInput = idArray[2][0] === "i";
    elementWire = isInput ? "input " : "output ";
    const wire = idArray[2].split("-")[0];
    const wireMap = wireNameMaps[elementType];
    const wireName = wireMap[wire];
    return [elementName, wireName ? elementWire + wireName : null];
  }

  // Simple elements (NOT, buffer, NOR, NAND, EXOR, EXNOR)
  if (idArray[2] !== "NOTX") {
    const isInput = idArray[2][0] === "i";
    elementWire = isInput ? "input " : "output ";
    const letterNumber = isInput ? 5 : 6;
    elementWire = elementWire + idArray[2][letterNumber];
  } else {
    elementName = "!" + elementName;
    elementWire = "";
  }

  return [elementName, elementWire];
};

export const findElementSvgKey = (elementName: string): string | null => {
  const nameToCheck = elementName.replace(/^!/, "").split("-")[0];
  // Map PriorityEncoder back to "encoder" key used by gateSvgs
  if (nameToCheck === "PriorityEncoder") return "encoder";
  return nameToCheck || null;
};
