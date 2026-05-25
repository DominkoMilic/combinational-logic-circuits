import React, { useRef } from "react";
import { gateSvgs } from "./GateSvgs";
import type { CircuitElement, SetFunctions } from "../types";

interface ScrollBoxProps {
  setFunctions: SetFunctions;
}

const components = [
  { key: "Const0", label: "Constant 0" },
  { key: "Const1", label: "Constant 1" },
  { key: "XVar", label: "X variable" },
  { key: "buffer", label: "Buffer" },
  { key: "NOT", label: "NOT" },
  { key: "NOR2Inputs", label: "NOR 2 inputs" },
  { key: "NOR3Inputs", label: "NOR 3 inputs" },
  { key: "NOR4Inputs", label: "NOR 4 inputs" },
  { key: "NOR8Inputs", label: "NOR 8 inputs" },
  { key: "NAND2Inputs", label: "NAND 2 inputs" },
  { key: "NAND3Inputs", label: "NAND 3 inputs" },
  { key: "NAND4Inputs", label: "NAND 4 inputs" },
  { key: "NAND8Inputs", label: "NAND 8 inputs" },
  { key: "EXOR", label: "EXOR" },
  { key: "EXNOR", label: "EXNOR" },
  { key: "DEMUXm2", label: "DEMUX m=2" },
  { key: "DEMUXm3", label: "DEMUX m=3" },
  { key: "MUXm1", label: "MUX m=1" },
  { key: "MUXm2", label: "MUX m=2" },
  { key: "MUXm3", label: "MUX m=3" },
  { key: "encoder", label: "Priority encoder" },
  { key: "DFlipFlop", label: "D flip-flop", hasFlipFlopState: true },
  { key: "JKFlipFlop", label: "JK flip-flop", hasFlipFlopState: true },
];

// Maps component key -> the setter function key in setFunctions
const keyToSetterName: Record<string, string> = {
  Const0: "setConst0Elements",
  Const1: "setConst1Elements",
  XVar: "setXVarElements",
  NOT: "setNotElements",
  buffer: "setBufferElements",
  NOR2Inputs: "setNor2InputsElements",
  NOR3Inputs: "setNor3InputsElements",
  NOR4Inputs: "setNor4InputsElements",
  NOR8Inputs: "setNor8InputsElements",
  NAND2Inputs: "setNand2InputsElements",
  NAND3Inputs: "setNand3InputsElements",
  NAND4Inputs: "setNand4InputsElements",
  NAND8Inputs: "setNand8InputsElements",
  EXNOR: "setExNorElements",
  EXOR: "setExOrElements",
  DEMUXm2: "setDemuxm2Elements",
  DEMUXm3: "setDemuxm3Elements",
  MUXm1: "setMuxm1Elements",
  MUXm2: "setMuxm2Elements",
  MUXm3: "setMuxm3Elements",
  encoder: "setEncoderElements",
  DFlipFlop: "setDFlipFlopElements",
  JKFlipFlop: "setJkFlipFlopElements",
};

// The element type ID used in the circuit (may differ from config key for encoder)
const keyToTypeId: Record<string, string> = {
  encoder: "PriorityEncoder",
};

function ScrollBox({ setFunctions }: ScrollBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddElement = (key: string, hasFlipFlopState?: boolean) => {
    const setterName = keyToSetterName[key];
    const setter = setFunctions[setterName];
    if (!setter) return;

    const typeId = keyToTypeId[key] || key;

    setter((prev: CircuitElement[]) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;
      const newElement: CircuitElement = {
        id: `${typeId}-${nextId}`,
        value: "0",
        position: { x: 0, y: 0 },
      };
      if (hasFlipFlopState) {
        newElement.prevQValue = "0";
      }
      return [...prev, newElement];
    });
  };

  return (
    <div className="flex items-center h-full w-full">
      <div
        ref={scrollRef}
        className="flex flex-col items-center gap-2 overflow-y-auto h-full w-full p-2"
      >
        {components.map(({ key, label, hasFlipFlopState }) => (
          <button
            key={key}
            onClick={() => handleAddElement(key, hasFlipFlopState)}
            className="flex flex-col items-center p-1.5 bg-gray-800 hover:bg-gray-700
                       text-gray-200 text-xs rounded cursor-pointer border border-gray-700 hover:border-gray-600
                       w-full transition-colors"
          >
            {gateSvgs[key] &&
              React.createElement(gateSvgs[key], { width: 40, height: 40 })}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScrollBox;
