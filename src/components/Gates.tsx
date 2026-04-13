import CircuitElement from "./CircuitElement";
import { circuitConfigs } from "../config/circuitElements";
import type { CircuitElement as CircuitElementType, ElementsState } from "../types";

interface GatesProps {
  elements: ElementsState;
  handleElementClick: (
    element: { id: string; value: string },
    event: React.MouseEvent,
    cableOption: number,
    inputNumber: number
  ) => void;
  handleDeleteElementClick: (event: React.MouseEvent, elementId: string) => void;
  handleDragElement: (
    element: CircuitElementType,
    positions: ({ x: number; y: number; id: string } | null)[],
    newPosition?: { x: number; y: number }
  ) => void;
  onLoad: boolean;
}

const elementTypeToConfig: Record<string, string> = {
  NOT: "NOT",
  buffer: "buffer",
  NOR2Inputs: "NOR2Inputs",
  NOR3Inputs: "NOR3Inputs",
  NOR4Inputs: "NOR4Inputs",
  NOR8Inputs: "NOR8Inputs",
  NAND2Inputs: "NAND2Inputs",
  NAND3Inputs: "NAND3Inputs",
  NAND4Inputs: "NAND4Inputs",
  NAND8Inputs: "NAND8Inputs",
  EXOR: "EXOR",
  EXNOR: "EXNOR",
  DEMUXm2: "DEMUXm2",
  DEMUXm3: "DEMUXm3",
  MUXm1: "MUXm1",
  MUXm2: "MUXm2",
  MUXm3: "MUXm3",
  DFlipFlop: "DFlipFlop",
  JKFlipFlop: "JKFlipFlop",
  encoder: "encoder",
};

function Gates({
  elements,
  handleElementClick,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}: GatesProps) {
  return (
    <div>
      {Object.entries(elements).flatMap(([type, elArray]) => {
        const configKey = elementTypeToConfig[type];
        const config = configKey ? circuitConfigs[configKey] : null;
        if (!config) return [];

        return elArray.map((el) => (
          <CircuitElement
            key={el.id}
            config={config}
            element={el}
            handleElementClick={handleElementClick}
            handleDeleteElementClick={handleDeleteElementClick}
            handleDragElement={handleDragElement}
            onLoad={onLoad}
          />
        ));
      })}
    </div>
  );
}

export default Gates;
