export interface Position {
  x: number;
  y: number;
}

export interface CircuitElement {
  id: string;
  value: string;
  position: Position;
  prevQValue?: string;
}

export interface CableEndpoint {
  id: string;
  value: string;
  position: Position;
  inputNumber?: number;
  calculatedValue?: string | string[];
  orderNumber?: string;
}

export interface Cable {
  id: string;
  element1: CableEndpoint;
  element2: CableEndpoint;
  color: number;
  joints: Position[];
}

export interface SelectedElement extends CableEndpoint {
  inputNumber: number;
}

export interface PinConfig {
  refIndex: number;
  refId: string;
  cableOption: 0 | 1;
  inputNumber: number;
}

export type LayoutType = "horizontal" | "ic";

export interface CircuitElementConfig {
  name: string;
  width: number;
  height: number;
  imageWidth: number;
  imageHeight: number;
  layout: LayoutType;
  imageClass?: string;
  topPins: PinConfig[];
  bottomPins: PinConfig[];
  topGridCols?: number;
  bottomGridCols?: number;
  topStyle?: React.CSSProperties;
  bottomStyle?: React.CSSProperties;
  eightInput?: boolean;
}

export type ElementType =
  | "NOT"
  | "buffer"
  | "NOR2Inputs"
  | "NOR3Inputs"
  | "NOR4Inputs"
  | "NOR8Inputs"
  | "NAND2Inputs"
  | "NAND3Inputs"
  | "NAND4Inputs"
  | "NAND8Inputs"
  | "EXOR"
  | "EXNOR"
  | "DEMUXm2"
  | "DEMUXm3"
  | "MUXm1"
  | "MUXm2"
  | "MUXm3"
  | "DFlipFlop"
  | "JKFlipFlop"
  | "encoder"
  | "Const0"
  | "Const1";

export type ElementsState = Record<ElementType, CircuitElement[]>;

export type SetFunctions = Record<
  string,
  React.Dispatch<React.SetStateAction<CircuitElement[]>>
>;

export interface MenuPosition {
  top: number;
  left: number;
}

export interface PinIndicatorPosition {
  top: number | undefined;
  left: number | undefined;
}

export interface ComponentSpec {
  elementId: string;
  numberOfInputs: number;
  numberOfOutputs: number;
}

export interface PremadeCircuit {
  title: string;
  image: string;
  file: string;
}
