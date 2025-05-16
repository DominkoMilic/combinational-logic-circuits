import bufferImage from "../components/images/buffer.png";
import NOTImage from "../components/images/NOT.png";
import NANDImage from "../components/images/NAND.png";
import NORImage from "../components/images/NOR.png";
import EXORImage from "../components/images/EXOR.png";
import EXNORImage from "../components/images/EXNOR.png";
import MUXm1Image from "../components/images/MUXm1.png";
import MUXm2Image from "../components/images/MUXm2.png";
import MUXm3Image from "../components/images/MUXm3.png";
import DEMUXm2Image from "../components/images/DEMUXm2.png";
import DEMUXm3Image from "../components/images/DEMUXm3.png";
import DFlipFlopImage from "../components/images/Dflip-flop.png";
import JKFlipFlopImage from "../components/images/JKflip-flop.png";
import encoderImage from "../components/images/encoder.png";

const images = {
  buffer: bufferImage,
  NOT: NOTImage,
  EXOR: EXORImage,
  EXNOR: EXNORImage,
  NOR2Inputs: NORImage,
  NOR3Inputs: NORImage,
  NOR4Inputs: NORImage,
  NOR8Inputs: NORImage,
  NAND2Inputs: NANDImage,
  NAND3Inputs: NANDImage,
  NAND4Inputs: NANDImage,
  NAND8Inputs: NANDImage,
  MUXm1: MUXm1Image,
  MUXm2: MUXm2Image,
  MUXm3: MUXm3Image,
  DEMUXm2: DEMUXm2Image,
  DEMUXm3: DEMUXm3Image,
  DFlipFlop: DFlipFlopImage,
  JKFlipFlop: JKFlipFlopImage,
  encoder: encoderImage,
};

const createElementDisplayNameFromId = (elementId) => {
  const idArray = elementId.split("-");
  let elementName = idArray[0] + "-" + idArray[1];
  let elementWire = null;
  if (idArray[2]) {
    let elementValues;
    if (idArray[0] === "DEMUXm3") {
      elementWire = findDEMUXm3ElementsWireNames(
        idArray,
        elementName,
        elementWire
      );
    } else if (idArray[0] === "DEMUXm2") {
      elementWire = findDEMUXm2ElementsWireNames(
        idArray,
        elementName,
        elementWire
      );
    } else if (idArray[0] === "MUXm3") {
      elementWire = findMUXm3ElementsWireNames(
        idArray,
        elementName,
        elementWire
      );
    } else if (idArray[0] === "MUXm2") {
      elementWire = findMUXm2ElementsWireNames(
        idArray,
        elementName,
        elementWire
      );
    } else if (idArray[0] === "MUXm1") {
      elementWire = findMUXm1ElementsWireNames(
        idArray,
        elementName,
        elementWire
      );
    } else if (idArray[0] === "DFlipFlop") {
      elementWire = findDFlipFlopElementsWireNames(
        idArray,
        elementName,
        elementWire
      );
    } else if (idArray[0] === "JKFlipFlop") {
      elementWire = findJKFlipFlopElementsWireNames(
        idArray,
        elementName,
        elementWire
      );
    } else if (idArray[0] === "PriorityEncoder") {
      elementWire = findEncoderElementsWireNames(
        idArray,
        elementName,
        elementWire
      );
    } else if (elementId === "X-8-constant" || elementId === "X-9-constant") {
      elementName = elementId.split("-")[1] === "8" ? "low" : "high";
      elementWire = "";
    } else {
      elementValues = findSimpleElememntsWireName(
        idArray,
        elementName,
        elementWire
      );
      elementName = elementValues[0];
      elementWire = elementValues[1];
    }
  }
  return [elementName, elementWire];
};

const findSimpleElememntsWireName = (idArray, elementName, elementWire) => {
  if (idArray[2] !== "NOTX") {
    const isInput = idArray[2][0] === "i" ? true : false;
    elementWire = isInput ? "input " : "output ";
    const letterNumber = isInput ? 5 : 6;
    elementWire = elementWire + idArray[2][letterNumber];
  } else {
    elementName = "!" + elementName;
    elementWire = "";
  }
  return [elementName, elementWire];
};

const findMUXm2ElementsWireNames = (idArray, elementWire) => {
  const isInput = idArray[2][0] === "i";
  elementWire = isInput ? "input " : "output ";

  const wireMap = {
    input9: "VCC",
    input8: "GND",
    input7: "U3",
    input6: "U2",
    input5: "U1",
    input4: "U0",
    input3: "!E",
    input2: "A1",
    input1: "A0",
    output0: "I",
  };

  const wire = idArray[2].split("-")[0];
  return wireMap[wire] ? elementWire + wireMap[wire] : undefined;
};

const findMUXm1ElementsWireNames = (idArray, elementWire) => {
  const isInput = idArray[2][0] === "i";
  elementWire = isInput ? "input " : "output ";

  const wireMap = {
    input6: "VCC",
    input5: "GND",
    input4: "U1",
    input3: "U0",
    input2: "E",
    input1: "A0",
    output0: "I",
  };

  const wire = idArray[2].split("-")[0];
  return wireMap[wire] ? elementWire + wireMap[wire] : undefined;
};

const findMUXm3ElementsWireNames = (idArray, elementWire) => {
  const isInput = idArray[2][0] === "i";
  elementWire = isInput ? "input " : "output ";

  const wireMap = {
    input1: "U0",
    input2: "U1",
    input3: "U2",
    input4: "U3",
    input5: "U4",
    input6: "U5",
    input7: "U6",
    input8: "U7",
    input9: "!E",
    inputA: "GND",
    inputB: "VCC",
    inputC: "A0",
    inputD: "A1",
    inputE: "A2",
    output0: "I",
    output1: "!I",
  };

  const wire = idArray[2].split("-")[0];
  return wireMap[wire] ? elementWire + wireMap[wire] : undefined;
};

const findDEMUXm3ElementsWireNames = (idArray, elementWire) => {
  const isInput = idArray[2][0] === "i";
  elementWire = isInput ? "input " : "output ";

  const wireMap = {
    input8: "VCC",
    input7: "GND",
    input6: "U3",
    input5: "!U2",
    input4: "!U1",
    input3: "A2",
    input2: "A1",
    input1: "A0",
    output7: "!I7",
    output6: "!I6",
    output5: "!I5",
    output4: "!I4",
    output3: "!I3",
    output2: "!I2",
    output1: "!I1",
    output0: "!I0",
  };

  const wire = idArray[2].split("-")[0];
  return wireMap[wire] ? elementWire + wireMap[wire] : undefined;
};

const findDEMUXm2ElementsWireNames = (idArray, elementWire) => {
  const isInput = idArray[2][0] === "i";
  elementWire = isInput ? "input " : "output ";

  const wireMap = {
    input5: "VCC",
    input4: "GND",
    input3: "!U",
    input2: "A1",
    input1: "A0",
    output3: "!I3",
    output2: "!I2",
    output1: "!I1",
    output0: "!I0",
  };

  const wire = idArray[2].split("-")[0];
  return wireMap[wire] ? elementWire + wireMap[wire] : undefined;
};

const findDFlipFlopElementsWireNames = (idArray, elementWire) => {
  const isInput = idArray[2][0] === "i";
  elementWire = isInput ? "input " : "output ";

  const wireMap = {
    input6: "VCC",
    input5: "GND",
    input4: "!S",
    input3: "CP",
    input2: "D",
    input1: "!R",
    output1: "!Q",
    output0: "Q",
  };

  const wire = idArray[2].split("-")[0];
  return wireMap[wire] ? elementWire + wireMap[wire] : undefined;
};

const findJKFlipFlopElementsWireNames = (idArray, elementWire) => {
  const isInput = idArray[2][0] === "i";
  elementWire = isInput ? "input " : "output ";

  const wireMap = {
    input7: "VCC",
    input6: "GND",
    input5: "!S",
    input4: "J",
    input3: "K",
    input2: "CP",
    input1: "!R",
    output1: "!Q",
    output0: "Q",
  };

  const wire = idArray[2].split("-")[0];
  return wireMap[wire] ? elementWire + wireMap[wire] : undefined;
};

const findEncoderElementsWireNames = (idArray, elementWire) => {
  const isInput = idArray[2][0] === "i";
  elementWire = isInput ? "input " : "output ";

  const wireMap = {
    inputD: "!GS",
    inputC: "!EI",
    inputB: "VCC",
    inputA: "GND",
    input9: "!EU",
    input8: "!U7",
    input7: "!U6",
    input6: "!U5",
    input5: "!U4",
    input4: "!U3",
    input3: "!U2",
    input2: "!U1",
    input1: "!U0",
    output2: "I2",
    output1: "I1",
    output0: "I0",
  };

  const wire = idArray[2].split("-")[0];
  return wireMap[wire] ? elementWire + wireMap[wire] : undefined;
};

const findImagePath = (elementName) => {
  const nameToCheck = elementName.split("-")[0];
  return images[nameToCheck] || null;
};

export { createElementDisplayNameFromId, findImagePath, images };
