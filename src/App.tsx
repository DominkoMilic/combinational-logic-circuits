import { useEffect, useState, useCallback, useMemo } from "react";
import ControlPanel from "./components/ControlPanel";
import BulbsAndButtons from "./components/BulbsAndButtons";
import OutputIndicator from "./components/OutputIndicator";
import SelectionMenu from "./components/SelectionMenu";
import DeleteMenu from "./components/DeleteMenu";
import InfoScreen from "./components/InfoScreen";
import Cables from "./components/Cables";
import Gates from "./components/Gates";
import ScrollBox from "./components/ScrollBox";
import {
  calculateCableSpawnPosition,
  updateCablesAndElements,
  updateYDiv,
} from "./utils/circuitEngine";
import {
  deleteElement,
  deleteCable,
  changeElementPosition,
} from "./utils/elementManagement";
import type {
  Cable,
  CircuitElement,
  ElementType,
  ElementsState,
  SelectedElement,
  SetFunctions,
  PinIndicatorPosition,
  Position,
} from "./types";

const ELEMENT_TYPES: ElementType[] = [
  "NOT",
  "buffer",
  "NOR2Inputs",
  "NOR3Inputs",
  "NOR4Inputs",
  "NOR8Inputs",
  "NAND2Inputs",
  "NAND3Inputs",
  "NAND4Inputs",
  "NAND8Inputs",
  "EXOR",
  "EXNOR",
  "DEMUXm2",
  "DEMUXm3",
  "MUXm1",
  "MUXm2",
  "MUXm3",
  "DFlipFlop",
  "JKFlipFlop",
  "encoder",
  "Const0",
  "Const1",
];

const INITIAL_ELEMENTS = Object.fromEntries(
  ELEMENT_TYPES.map((t) => [t, [] as CircuitElement[]]),
) as unknown as ElementsState;

// Maps element type -> setter function name (preserves backward compat with save/load)
const TYPE_TO_SETTER: Record<ElementType, string> = {
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
  EXOR: "setExOrElements",
  EXNOR: "setExNorElements",
  DEMUXm2: "setDemuxm2Elements",
  DEMUXm3: "setDemuxm3Elements",
  MUXm1: "setMuxm1Elements",
  MUXm2: "setMuxm2Elements",
  MUXm3: "setMuxm3Elements",
  DFlipFlop: "setDFlipFlopElements",
  JKFlipFlop: "setJkFlipFlopElements",
  encoder: "setEncoderElements",
  Const0: "setConst0Elements",
  Const1: "setConst1Elements",
};

const SETTER_TO_TYPE: Record<string, ElementType> = Object.fromEntries(
  Object.entries(TYPE_TO_SETTER).map(([k, v]) => [v, k as ElementType]),
);

function App() {
  const [xVariableValues, setXVariableValues] = useState<string[]>(
    Array(8).fill("0"),
  );
  const [yVariableValues, setYVariableValues] = useState<string[]>(
    Array(24).fill("0"),
  );
  const [elements, setElements] = useState<ElementsState>(INITIAL_ELEMENTS);

  const [cables, setCables] = useState<Cable[]>([]);
  const [selectedElement, setSelectedElement] = useState<SelectedElement[]>([]);
  const [newElement1, setNewElement1] = useState<SelectedElement | null>(null);
  const [jointPosition, setJointPosition] = useState<Position | null>(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [cableOption, setCableOption] = useState(0);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deletePosition, setDeletePosition] = useState({ top: 0, left: 0 });
  const [elementToDelete, setElementToDelete] = useState<string | null>(null);
  const [cableToDelete, setCableToDelete] = useState<Cable | null>(null);
  const [isColorWheelVisible, setIsColorWheelVisible] = useState(false);

  const [onLoad, setOnLoad] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [pinIndicatorPosition, setPinIndicatorPosition] =
    useState<PinIndicatorPosition>({
      top: undefined,
      left: undefined,
    });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 900) setIsSmallScreen(true);
  }, []);

  // Create setter functions that match the original API (for backward compat with save/load)
  const setFunctions: SetFunctions = useMemo(() => {
    const fns: SetFunctions = {};
    for (const [type, setterName] of Object.entries(TYPE_TO_SETTER)) {
      fns[setterName] = ((
        updater:
          | CircuitElement[]
          | ((prev: CircuitElement[]) => CircuitElement[]),
      ) => {
        setElements((prev) => ({
          ...prev,
          [type]:
            typeof updater === "function"
              ? updater(prev[type as ElementType])
              : updater,
        }));
      }) as React.Dispatch<React.SetStateAction<CircuitElement[]>>;
    }
    return fns;
  }, []);

  // Flatten all elements for save/load format (uses original key names for backward compat)
  const allElements = useMemo(() => {
    const result: Record<string, unknown[]> = {};
    for (const [type, arr] of Object.entries(elements)) {
      // Use the original state variable names as keys (for save/load compat)
      const keyMap: Record<string, string> = {
        NOT: "notElements",
        buffer: "bufferElements",
        NOR2Inputs: "nor2InputsElements",
        NOR3Inputs: "nor3InputsElements",
        NOR4Inputs: "nor4InputsElements",
        NOR8Inputs: "nor8InputsElements",
        NAND2Inputs: "nand2InputsElements",
        NAND3Inputs: "nand3InputsElements",
        NAND4Inputs: "nand4InputsElements",
        NAND8Inputs: "nand8InputsElements",
        EXOR: "exOrElements",
        EXNOR: "exNorElements",
        DEMUXm2: "demuxm2Elements",
        DEMUXm3: "demuxm3Elements",
        MUXm1: "muxm1Elements",
        MUXm2: "muxm2Elements",
        MUXm3: "muxm3Elements",
        DFlipFlop: "dFlipFlopElements",
        JKFlipFlop: "jkFlipFlopElements",
        encoder: "encoderElements",
        Const0: "const0Elements",
        Const1: "const1Elements",
      };
      result[keyMap[type] || type] = arr;
    }
    return result;
  }, [elements]);

  const handleElementClick = useCallback(
    (
      element: { id: string; value: string },
      event: React.MouseEvent,
      cableOpt: number,
      iNumber: number,
    ) => {
      const { clientX, clientY } = event;
      const position =
        clientX > 1700
          ? { top: clientY, left: clientX - 130 }
          : { top: clientY, left: clientX };

      const elementPosition = calculateCableSpawnPosition(event, element);

      setDeleteVisible(false);
      setIsColorWheelVisible(false);
      setMenuPosition(position);
      setMenuVisible(true);
      setCableOption(cableOpt);
      setSelectedElement((prev) => [
        ...prev,
        {
          ...element,
          position: { x: elementPosition[0], y: elementPosition[1] },
          inputNumber: iNumber,
        },
      ]);
    },
    [],
  );

  const handleDeleteElementClick = useCallback(
    (event: React.MouseEvent, elementId: string) => {
      setCableToDelete(null);
      const { clientX, clientY } = event;
      const position =
        clientX > 1700
          ? { top: clientY, left: clientX - 130 }
          : { top: clientY, left: clientX };

      setElementToDelete(elementId);
      setMenuVisible(false);
      setDeletePosition(position);
      setDeleteVisible(true);
    },
    [],
  );

  const handleDeleteCableClick = useCallback(
    (event: React.MouseEvent, cable: Cable) => {
      setSelectedElement([]);
      setPinIndicatorPosition({ top: undefined, left: undefined });
      const { clientX, clientY } = event;
      const position =
        clientX > 1700
          ? { top: clientY, left: clientX - 130 }
          : { top: clientY, left: clientX };

      setCableToDelete(cable);
      setMenuVisible(false);
      setDeletePosition(position);
      setDeleteVisible(true);
      setJointPosition({ x: clientX, y: clientY });
    },
    [],
  );

  const handleDragElement = useCallback(
    (
      element: CircuitElement,
      positions: ({ x: number; y: number; id: string } | null)[],
      newElementPosition?: { x: number; y: number },
    ) => {
      setSelectedElement([]);
      setPinIndicatorPosition({ top: undefined, left: undefined });
      setNewElement1(null);
      setDeleteVisible(false);
      setIsColorWheelVisible(false);
      setMenuVisible(false);

      if (newElementPosition) {
        changeElementPosition(element, newElementPosition);
      }

      setCables((prevCables) =>
        prevCables.map((cable) => {
          const updatedCable = { ...cable };
          const elId = element.id;
          const c1Id =
            cable.element1.id.split("-")[0] +
            "-" +
            cable.element1.id.split("-")[1];
          const c2Id =
            cable.element2.id.split("-")[0] +
            "-" +
            cable.element2.id.split("-")[1];

          if (c1Id === elId) {
            const newPos = positions.find(
              (pos) => pos?.id === cable.element1.id.split("-")[2],
            );
            if (newPos)
              updatedCable.element1 = { ...cable.element1, position: newPos };
          } else if (c2Id === elId) {
            const newPos = positions.find(
              (pos) => pos?.id === cable.element2.id.split("-")[2],
            );
            if (newPos)
              updatedCable.element2 = { ...cable.element2, position: newPos };
          }

          return updatedCable;
        }),
      );
    },
    [],
  );

  // Circuit recalculation
  useEffect(() => {
    if (isDragging) return;
    const updatedCables = updateCablesAndElements(cables, xVariableValues);
    try {
      updateYDiv(
        updatedCables,
        setYVariableValues,
        elements.DFlipFlop,
        elements.JKFlipFlop,
      );
    } catch (error) {
      console.error("Error updating output values: ", error);
    }
  }, [
    xVariableValues,
    cables,
    elements.DFlipFlop,
    elements.JKFlipFlop,
    isDragging,
  ]);

  // Drag tracking
  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMainPartClick = () => {
    setIsColorWheelVisible(false);
    setMenuVisible(false);
    setDeleteVisible(false);
  };

  const handleJointDrag = useCallback(
    (
      event: { clientX: number; clientY: number },
      cableId: string,
      jointIndex: number,
    ) => {
      setCables((prevCables) =>
        prevCables.map((cable) =>
          cable.id === cableId
            ? {
                ...cable,
                joints: cable.joints.map((joint, index) =>
                  index === jointIndex
                    ? { x: event.clientX, y: event.clientY }
                    : joint,
                ),
              }
            : cable,
        ),
      );
    },
    [],
  );

  if (isSmallScreen) {
    return (
      <div className="flex items-center justify-center h-screen p-8 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Screen Too Small</h1>
          <p>
            We are sorry but app currently does not support small screen
            devices.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div
        className="h-[88vh] w-full flex cursor-default"
        onContextMenu={(e) => e.preventDefault()}
        onClick={handleMainPartClick}
      >
        {/* Left side - X inputs */}
        <div className="flex flex-col justify-between bg-gray-900 h-full w-[5%] z-[5]">
          <BulbsAndButtons
            setXVariableValues={setXVariableValues}
            xVariableValues={xVariableValues}
            handleElementClick={handleElementClick}
            setMenuVisible={setMenuVisible}
            setCables={setCables}
            onLoad={onLoad}
          />
        </div>

        {/* Center - Draggable area */}
        <div
          className="draggable-area bg-gray-50 h-full w-[80%] relative"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <Gates
            elements={elements}
            handleElementClick={handleElementClick}
            handleDeleteElementClick={handleDeleteElementClick}
            handleDragElement={handleDragElement}
            onLoad={onLoad}
          />
        </div>

        {/* Right side - Y outputs + element palette */}
        <div className="flex h-full w-[15%]">
          <div className="flex flex-col justify-between bg-gray-900 h-full w-[30%] z-[5]">
            <OutputIndicator
              yVariableValues={yVariableValues}
              handleElementClick={handleElementClick}
              onLoad={onLoad}
              setCables={setCables}
            />
          </div>
          <div className="flex items-center h-full w-full bg-gray-900 border-l border-gray-700">
            <ScrollBox setFunctions={setFunctions} />
          </div>
        </div>
      </div>

      {/* Bottom control panel */}
      <div className="h-[12vh] w-full border-t border-gray-700">
        <ControlPanel
          setXVariableValues={setXVariableValues}
          xVariableValues={xVariableValues}
          setIsHelp={setIsHelp}
          setIsInfoVisible={setIsInfoVisible}
          setCables={setCables}
          cables={cables}
          setFunctions={setFunctions}
          allElements={allElements}
          setMenuVisible={setMenuVisible}
          setDeleteVisible={setDeleteVisible}
          newElement1={newElement1}
          setNewElement1={setNewElement1}
          setOnLoad={setOnLoad}
          setPinIndicatorPosition={setPinIndicatorPosition}
        />
      </div>

      {/* Overlays */}
      <SelectionMenu
        visible={menuVisible}
        position={menuPosition}
        cableOption={cableOption}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        setCables={setCables}
        setMenuVisible={setMenuVisible}
        cables={cables}
        newElement1={newElement1}
        setNewElement1={setNewElement1}
        setPinIndicatorPosition={setPinIndicatorPosition}
      />

      <DeleteMenu
        position={deletePosition}
        isVisible={deleteVisible}
        setIsVisible={setDeleteVisible}
        elementId={elementToDelete}
        deleteElement={deleteElement}
        setFunctions={setFunctions}
        setCables={setCables}
        setSelectedElement={setSelectedElement}
        setNewElement1={setNewElement1}
        cableToDelete={cableToDelete}
        setCableToDelete={setCableToDelete}
        deleteCable={deleteCable}
        cables={cables}
        isColorWheelVisible={isColorWheelVisible}
        setIsColorWheelVisible={setIsColorWheelVisible}
        jointPosition={jointPosition}
        setPinIndicatorPosition={setPinIndicatorPosition}
      />

      <InfoScreen
        visible={isInfoVisible}
        setIsInfoVisible={setIsInfoVisible}
        isHelp={isHelp}
      />

      <Cables
        cables={cables}
        handleDeleteCableClick={handleDeleteCableClick}
        handleJointDrag={handleJointDrag}
      />

      {pinIndicatorPosition.top != null &&
        pinIndicatorPosition.left != null && (
          <div
            className="absolute w-5 h-5 bg-green-400 rounded-[30%] z-0 shadow-lg shadow-green-400/50"
            style={{
              top: pinIndicatorPosition.top,
              left: pinIndicatorPosition.left,
            }}
          />
        )}
    </div>
  );
}

export default App;
