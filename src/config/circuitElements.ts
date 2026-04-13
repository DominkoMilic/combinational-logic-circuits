import type { CircuitElementConfig, PinConfig } from "../types";

import bufferImage from "../components/images/buffer.png";
import NOTImage from "../components/images/NOT.png";
import NANDImage from "../components/images/NAND.png";
import NOR2IImage from "../components/images/NOR2I.png";
import NOR3IImage from "../components/images/NOR3I.png";
import NOR4IImage from "../components/images/NOR4I.png";
import NOR8IImage from "../components/images/NOR8I.png";
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

export const circuitImages: Record<string, string> = {
  buffer: bufferImage,
  NOT: NOTImage,
  EXOR: EXORImage,
  EXNOR: EXNORImage,
  NOR2Inputs: NOR2IImage,
  NOR3Inputs: NOR3IImage,
  NOR4Inputs: NOR4IImage,
  NOR8Inputs: NOR8IImage,
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

function inputPin(refIndex: number, refId: string, inputNumber = 1): PinConfig {
  return { refIndex, refId, cableOption: 0, inputNumber };
}

function outputPin(
  refIndex: number,
  refId: string,
  inputNumber = 8
): PinConfig {
  return { refIndex, refId, cableOption: 1, inputNumber };
}

export const circuitConfigs: Record<string, CircuitElementConfig> = {
  NOT: {
    name: "NOT",
    width: 50,
    height: 50,
    imageWidth: 42,
    imageHeight: 42,
    layout: "horizontal",
    topPins: [inputPin(0, "input1", 1)],
    bottomPins: [outputPin(1, "output0", 1)],
  },

  buffer: {
    name: "buffer",
    width: 50,
    height: 50,
    imageWidth: 42,
    imageHeight: 42,
    layout: "horizontal",
    topPins: [inputPin(0, "input1", 1)],
    bottomPins: [outputPin(1, "output0", 1)],
  },

  NOR2Inputs: {
    name: "NOR2Inputs",
    width: 90,
    height: 90,
    imageWidth: 70,
    imageHeight: 70,
    layout: "horizontal",
    topPins: [inputPin(0, "input1", 1), inputPin(1, "input2", 1)],
    bottomPins: [outputPin(2, "output0", 2)],
  },

  NOR3Inputs: {
    name: "NOR3Inputs",
    width: 90,
    height: 90,
    imageWidth: 70,
    imageHeight: 70,
    layout: "horizontal",
    topPins: [
      inputPin(0, "input1", 1),
      inputPin(1, "input2", 1),
      inputPin(2, "input3", 1),
    ],
    bottomPins: [outputPin(3, "output0", 2)],
  },

  NOR4Inputs: {
    name: "NOR4Inputs",
    width: 90,
    height: 90,
    imageWidth: 70,
    imageHeight: 70,
    layout: "horizontal",
    topPins: [
      inputPin(0, "input1", 1),
      inputPin(1, "input2", 1),
      inputPin(2, "input3", 1),
      inputPin(3, "input4", 1),
    ],
    bottomPins: [outputPin(4, "output0", 2)],
  },

  NOR8Inputs: {
    name: "NOR8Inputs",
    width: 90,
    height: 90,
    imageWidth: 70,
    imageHeight: 70,
    layout: "horizontal",
    eightInput: true,
    topPins: [
      inputPin(0, "input1", 1),
      inputPin(1, "input2", 1),
      inputPin(2, "input3", 1),
      inputPin(3, "input4", 1),
      inputPin(4, "input5", 1),
      inputPin(5, "input6", 1),
      inputPin(6, "input7", 1),
      inputPin(7, "input8", 1),
    ],
    bottomPins: [outputPin(8, "output0", 2)],
  },

  NAND2Inputs: {
    name: "NAND2Inputs",
    width: 90,
    height: 90,
    imageWidth: 70,
    imageHeight: 70,
    layout: "horizontal",
    topPins: [inputPin(0, "input1", 1), inputPin(1, "input2", 1)],
    bottomPins: [outputPin(2, "output0", 2)],
  },

  NAND3Inputs: {
    name: "NAND3Inputs",
    width: 90,
    height: 90,
    imageWidth: 70,
    imageHeight: 70,
    layout: "horizontal",
    topPins: [
      inputPin(0, "input1", 1),
      inputPin(1, "input2", 1),
      inputPin(2, "input3", 1),
    ],
    bottomPins: [outputPin(3, "output0", 2)],
  },

  NAND4Inputs: {
    name: "NAND4Inputs",
    width: 90,
    height: 90,
    imageWidth: 70,
    imageHeight: 70,
    layout: "horizontal",
    topPins: [
      inputPin(0, "input1", 1),
      inputPin(1, "input2", 1),
      inputPin(2, "input3", 1),
      inputPin(3, "input4", 1),
    ],
    bottomPins: [outputPin(4, "output0", 2)],
  },

  NAND8Inputs: {
    name: "NAND8Inputs",
    width: 90,
    height: 90,
    imageWidth: 70,
    imageHeight: 70,
    layout: "horizontal",
    eightInput: true,
    topPins: [
      inputPin(0, "input1", 1),
      inputPin(1, "input2", 1),
      inputPin(2, "input3", 1),
      inputPin(3, "input4", 1),
      inputPin(4, "input5", 1),
      inputPin(5, "input6", 1),
      inputPin(6, "input7", 1),
      inputPin(7, "input8", 1),
    ],
    bottomPins: [outputPin(8, "output0", 2)],
  },

  EXOR: {
    name: "EXOR",
    width: 100,
    height: 100,
    imageWidth: 90,
    imageHeight: 90,
    layout: "horizontal",
    topPins: [inputPin(0, "input1", 1), inputPin(1, "input2", 1)],
    bottomPins: [outputPin(2, "output0", 2)],
  },

  EXNOR: {
    name: "EXNOR",
    width: 100,
    height: 100,
    imageWidth: 90,
    imageHeight: 90,
    layout: "horizontal",
    topPins: [inputPin(0, "input1", 1), inputPin(1, "input2", 1)],
    bottomPins: [outputPin(2, "output0", 2)],
  },

  DEMUXm2: {
    name: "DEMUXm2",
    width: 100,
    height: 100,
    imageWidth: 100,
    imageHeight: 100,
    layout: "ic",
    topGridCols: 4,
    bottomGridCols: 5,
    topStyle: { top: "-10%", left: "15%", width: "80%" },
    bottomStyle: { bottom: "-10%", left: "13%", width: "82%" },
    topPins: [
      inputPin(0, "input5", 1),
      outputPin(1, "output0"),
      outputPin(2, "output1"),
      outputPin(3, "output2"),
    ],
    bottomPins: [
      inputPin(4, "input1", 1),
      inputPin(5, "input2", 1),
      inputPin(6, "input3", 1),
      outputPin(7, "output3"),
      inputPin(8, "input4", 1),
    ],
  },

  DEMUXm3: {
    name: "DEMUXm3",
    width: 150,
    height: 150,
    imageWidth: 150,
    imageHeight: 150,
    layout: "ic",
    topGridCols: 8,
    bottomGridCols: 8,
    topStyle: { top: "3%", left: "8%", width: "90%" },
    bottomStyle: { bottom: "3%", left: "8%", width: "90%" },
    topPins: [
      inputPin(0, "input8", 1),
      outputPin(1, "output0"),
      outputPin(2, "output1"),
      outputPin(3, "output2"),
      outputPin(4, "output3"),
      outputPin(5, "output4"),
      outputPin(6, "output5"),
      outputPin(7, "output6"),
    ],
    bottomPins: [
      inputPin(8, "input1", 1),
      inputPin(9, "input2", 1),
      inputPin(10, "input3", 1),
      inputPin(11, "input4", 1),
      inputPin(12, "input5", 1),
      inputPin(13, "input6", 1),
      outputPin(14, "output7"),
      inputPin(15, "input7", 1),
    ],
  },

  MUXm1: {
    name: "MUXm1",
    width: 100,
    height: 100,
    imageWidth: 100,
    imageHeight: 100,
    layout: "ic",
    topGridCols: 3,
    bottomGridCols: 4,
    topStyle: { top: "-10%", left: "23%", width: "70%" },
    bottomStyle: { bottom: "-10%", left: "18%", width: "73%" },
    topPins: [
      inputPin(0, "input6", 1),
      inputPin(1, "input3", 1),
      inputPin(2, "input4", 1),
    ],
    bottomPins: [
      inputPin(3, "input1", 1),
      outputPin(4, "output0", 6),
      inputPin(5, "input2", 1),
      inputPin(6, "input5", 1),
    ],
  },

  MUXm2: {
    name: "MUXm2",
    width: 100,
    height: 100,
    imageWidth: 100,
    imageHeight: 100,
    layout: "ic",
    topGridCols: 5,
    bottomGridCols: 5,
    topStyle: { top: "-11%", left: "13%", width: "80%" },
    bottomStyle: { bottom: "-10%", left: "13%", width: "80%" },
    topPins: [
      inputPin(0, "input9", 1),
      inputPin(1, "input4", 1),
      inputPin(2, "input5", 1),
      inputPin(3, "input6", 1),
      inputPin(4, "input7", 1),
    ],
    bottomPins: [
      inputPin(5, "input1", 1),
      inputPin(6, "input2", 1),
      outputPin(7, "output0", 9),
      inputPin(8, "input3", 1),
      inputPin(9, "input8", 1),
    ],
  },

  MUXm3: {
    name: "MUXm3",
    width: 150,
    height: 150,
    imageWidth: 150,
    imageHeight: 150,
    layout: "ic",
    topGridCols: 8,
    bottomGridCols: 8,
    topStyle: { top: "3%", left: "8%", width: "90%" },
    bottomStyle: { bottom: "3%", left: "8%", width: "90%" },
    topPins: [
      inputPin(0, "inputB", 1),
      inputPin(1, "input5", 1),
      inputPin(2, "input6", 1),
      inputPin(3, "input7", 1),
      inputPin(4, "input8", 1),
      inputPin(5, "inputC", 1),
      inputPin(6, "inputD", 1),
      inputPin(7, "inputE", 1),
    ],
    bottomPins: [
      inputPin(8, "input4", 1),
      inputPin(9, "input3", 1),
      inputPin(10, "input2", 1),
      inputPin(11, "input1", 1),
      outputPin(12, "output0"),
      outputPin(13, "output1"),
      inputPin(14, "input9", 1),
      inputPin(15, "inputA", 1),
    ],
  },

  DFlipFlop: {
    name: "DFlipFlop",
    width: 100,
    height: 100,
    imageWidth: 100,
    imageHeight: 100,
    layout: "ic",
    topGridCols: 4,
    bottomGridCols: 4,
    topStyle: { top: "-10%", left: "18%", width: "73%" },
    bottomStyle: { bottom: "-10%", left: "18%", width: "73%" },
    topPins: [
      inputPin(0, "input6", 1),
      inputPin(1, "input4", 1),
      outputPin(2, "output0"),
      outputPin(3, "output1"),
    ],
    bottomPins: [
      inputPin(4, "input1", 1),
      inputPin(5, "input2", 1),
      inputPin(6, "input3", 1),
      inputPin(7, "input5", 1),
    ],
  },

  JKFlipFlop: {
    name: "JKFlipFlop",
    width: 100,
    height: 100,
    imageWidth: 100,
    imageHeight: 100,
    layout: "ic",
    topGridCols: 4,
    bottomGridCols: 5,
    topStyle: { top: "-10%", left: "15%", width: "80%" },
    bottomStyle: { bottom: "-10%", left: "13%", width: "80%" },
    topPins: [
      inputPin(0, "input7", 1),
      inputPin(1, "input5", 1),
      outputPin(2, "output0"),
      outputPin(3, "output1"),
    ],
    bottomPins: [
      inputPin(4, "input1", 1),
      inputPin(5, "input2", 1),
      inputPin(6, "input3", 1),
      inputPin(7, "input4", 1),
      inputPin(8, "input6", 1),
    ],
  },

  encoder: {
    name: "encoder",
    width: 150,
    height: 150,
    imageWidth: 150,
    imageHeight: 150,
    layout: "ic",
    topGridCols: 8,
    bottomGridCols: 8,
    topStyle: { top: "3%", left: "8%", width: "90%" },
    bottomStyle: { bottom: "3%", left: "8%", width: "90%" },
    topPins: [
      inputPin(0, "inputB", 1),
      outputPin(1, "output3"),
      outputPin(2, "output4"),
      inputPin(3, "input5", 1),
      inputPin(4, "input6", 1),
      inputPin(5, "input7", 1),
      inputPin(6, "input8", 1),
      outputPin(7, "output0"),
    ],
    bottomPins: [
      inputPin(8, "input4", 1),
      inputPin(9, "input3", 1),
      inputPin(10, "input2", 1),
      inputPin(11, "input1", 1),
      inputPin(12, "input9", 1),
      outputPin(13, "output2"),
      outputPin(14, "output1"),
      inputPin(15, "inputA", 1),
    ],
  },
};
