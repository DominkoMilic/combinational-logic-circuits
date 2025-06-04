import { useEffect, useState } from "react";
import ControlPanel from "./components/controlPanel/controlPanel";
import BulbAndButtons from "./components/bulbsAndButtons/bulbsAndButtons";
import OutputIndicator from "./components/outputIndicator/outputIndicator";
import SelectionMenu from "./components/selectionMenu/selectionMenu";
import DeleteMenu from "./components/selectionMenu/deleteMenu";
import InfoScreen from "./components/controlPanel/controlPanelComponents/info/infoScreen/infoScreen";
import Cable from "./components/cables/cables";
import Gates from "./components/elements/gates";
import ScrollBox from "./components/elements/srollBox";
import {
  calculateCableSpawnPosition,
  updateCablesAndElements,
  updateYDiv,
} from "./utilis/utilis";
import {
  deleteElement,
  deleteCable,
  changeElementPosition,
} from "./utilis/elementMenagement";
import "./App.css";

function App() {
  const [xVariableValues, setXVariableValues] = useState(Array(8).fill("0"));
  const [yVariableValues, setYVariableValues] = useState(Array(24).fill("0"));

  const [notElements, setNotElements] = useState([]);
  const [bufferElements, setBufferElements] = useState([]);
  const [nor2InputsElements, setNor2InputsElements] = useState([]);
  const [nor3InputsElements, setNor3InputsElements] = useState([]);
  const [nor4InputsElements, setNor4InputsElements] = useState([]);
  const [nor8InputsElements, setNor8InputsElements] = useState([]);
  const [nand2InputsElements, setNand2InputsElements] = useState([]);
  const [nand3InputsElements, setNand3InputsElements] = useState([]);
  const [nand4InputsElements, setNand4InputsElements] = useState([]);
  const [nand8InputsElements, setNand8InputsElements] = useState([]);
  const [exNorElements, setExNorElements] = useState([]);
  const [exOrElements, setExOrElements] = useState([]);
  const [demuxm2Elements, setDemuxm2Elements] = useState([]);
  const [demuxm3Elements, setDemuxm3Elements] = useState([]);
  const [muxm1Elements, setMuxm1Elements] = useState([]);
  const [muxm2Elements, setMuxm2Elements] = useState([]);
  const [muxm3Elements, setMuxm3Elements] = useState([]);
  const [dFlipFlopElements, setDFlipFlopElements] = useState([]);
  const [jkFlipFlopElements, setJkFlipFlopElements] = useState([]);
  const [encoderElements, setEncoderElements] = useState([]);

  const [cables, setCables] = useState([]);
  const [selectedElement, setSelectedElement] = useState([]);
  const [newElement1, setNewElement1] = useState(null);
  const [jointPosition, setJointPosition] = useState(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [cableOption, setCableOption] = useState(0);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deletePosition, setDeletePosition] = useState({ top: 0, left: 0 });
  const [elementToDelete, setElementToDelete] = useState(null);
  const [cableToDelete, setCableToDelete] = useState(null);
  const [isColorWheelVisible, setIsColorWheelVisible] = useState(false);

  const [onLoad, setOnLoad] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isHelp, setIsHelp] = useState(false);

  const [pinIndicatorPosition, setPinIndicatorPosition] = useState([
    {
      top: null,
      left: null,
    },
  ]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 900) {
      setIsSmallScreen(true);
    }
  }, []);

  const handleElementClick = (element, event, cableOption, iNumber) => {
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
    setCableOption(cableOption);
    setSelectedElement((prev) => [
      ...prev,
      {
        ...element,
        position: { x: elementPosition[0], y: elementPosition[1] },
        inputNumber: iNumber,
      },
    ]);
  };

  const handleDeleteElementClick = (event, element) => {
    setCableToDelete(null);
    const { clientX, clientY } = event;
    const position =
      clientX > 1700
        ? { top: clientY, left: clientX - 130 }
        : { top: clientY, left: clientX };

    setElementToDelete(element);
    setMenuVisible(false);
    setDeletePosition(position);
    setDeleteVisible(true);
  };

  const handleDeleteCableClick = (event, cable) => {
    setSelectedElement([]);
    setPinIndicatorPosition({
      top: undefined,
      left: undefined,
    });
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
  };

  const handleDragElement = (element, positions, newElementPosition) => {
    setSelectedElement([]);
    setPinIndicatorPosition({
      top: undefined,
      left: undefined,
    });
    setNewElement1(null);
    setDeleteVisible(false);
    setIsColorWheelVisible(false);
    setMenuVisible(false);

    changeElementPosition(element, newElementPosition);

    setCables((prevCables) =>
      prevCables.map((cable) => {
        const updatedCable = { ...cable };

        if (
          cable.element1.id.split("-")[0] +
            "-" +
            cable.element1.id.split("-")[1] ===
          element.id
        ) {
          const newPosition = positions.find(
            (pos) => pos.id === cable.element1.id.split("-")[2]
          );
          // newPosition.x = newPosition.x + 3;
          // newPosition.y = newPosition.y + 2;
          updatedCable.element1.position = newPosition;
        } else if (
          cable.element2.id.split("-")[0] +
            "-" +
            cable.element2.id.split("-")[1] ===
          element.id
        ) {
          const newPosition = positions.find(
            (pos) => pos.id === cable.element2.id.split("-")[2]
          );
          // newPosition.x = newPosition.x + 2;
          // newPosition.y = newPosition.y + 2;
          updatedCable.element2.position = newPosition;
        }

        return updatedCable;
      })
    );
  };

  useEffect(() => {
    if (isDragging) return;

    const updatedCables = updateCablesAndElements(cables, xVariableValues);

    try {
      updateYDiv(
        updatedCables,
        setYVariableValues,
        dFlipFlopElements,
        jkFlipFlopElements
      );
    } catch (error) {
      console.error("Error updating output values: ", error);
    }
  }, [
    xVariableValues,
    cables,
    dFlipFlopElements,
    jkFlipFlopElements,
    isDragging,
  ]);

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

  const handleJointDrag = (event, cableId, jointIndex) => {
    setCables((prevCables) =>
      prevCables.map((cable) =>
        cable.id === cableId
          ? {
              ...cable,
              joints: cable.joints.map((joint, index) =>
                index === jointIndex
                  ? { x: event.clientX, y: event.clientY }
                  : joint
              ),
            }
          : cable
      )
    );
  };

  if (isSmallScreen) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Screen Too Small</h1>
        <p>
          We are sorry but app currently do not support small screen devices.
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <div
        className="main-part"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        onClick={() => handleMainPartClick()}
      >
        <div className="left-side">
          <BulbAndButtons
            setXVariableValues={setXVariableValues}
            xVariableValues={xVariableValues}
            handleElementClick={handleElementClick}
            setMenuVisible={setMenuVisible}
            setCables={setCables}
            onLoad={onLoad}
          />
        </div>
        <div className="draggable-area">
          <Gates
            notElements={notElements}
            bufferElements={bufferElements}
            nor2InputsElements={nor2InputsElements}
            nor3InputsElements={nor3InputsElements}
            nor4InputsElements={nor4InputsElements}
            nor8InputsElements={nor8InputsElements}
            nand2InputsElements={nand2InputsElements}
            nand3InputsElements={nand3InputsElements}
            nand4InputsElements={nand4InputsElements}
            nand8InputsElements={nand8InputsElements}
            exNorElements={exNorElements}
            exOrElements={exOrElements}
            demuxm2Elements={demuxm2Elements}
            demuxm3Elements={demuxm3Elements}
            muxm1Elements={muxm1Elements}
            muxm2Elements={muxm2Elements}
            muxm3Elements={muxm3Elements}
            dFlipFlopElements={dFlipFlopElements}
            jkFlipFlopElements={jkFlipFlopElements}
            encoderElements={encoderElements}
            handleElementClick={handleElementClick}
            handleDeleteElementClick={handleDeleteElementClick}
            handleDragElement={handleDragElement}
            onLoad={onLoad}
          />
        </div>
        <div className="right-side">
          <div className="indicators">
            <OutputIndicator
              yVariableValues={yVariableValues}
              handleElementClick={handleElementClick}
              onLoad={onLoad}
              setCables={setCables}
            />
          </div>
          <div className="add-elements-box">
            <ScrollBox
              setFunctions={{
                setNotElements,
                setBufferElements,
                setNor2InputsElements,
                setNor3InputsElements,
                setNor4InputsElements,
                setNor8InputsElements,
                setNand2InputsElements,
                setNand3InputsElements,
                setNand4InputsElements,
                setNand8InputsElements,
                setExNorElements,
                setExOrElements,
                setDemuxm2Elements,
                setDemuxm3Elements,
                setMuxm1Elements,
                setMuxm2Elements,
                setMuxm3Elements,
                setDFlipFlopElements,
                setJkFlipFlopElements,
                setEncoderElements,
              }}
            />
          </div>
        </div>
      </div>
      <div className="button-box">
        <ControlPanel
          setXVariableValues={setXVariableValues}
          xVariableValues={xVariableValues}
          setIsHelp={setIsHelp}
          setIsInfoVisible={setIsInfoVisible}
          setCables={setCables}
          cables={cables}
          setFunctions={{
            setNotElements,
            setBufferElements,
            setNor2InputsElements,
            setNor3InputsElements,
            setNor4InputsElements,
            setNor8InputsElements,
            setNand2InputsElements,
            setNand3InputsElements,
            setNand4InputsElements,
            setNand8InputsElements,
            setExNorElements,
            setExOrElements,
            setDemuxm2Elements,
            setDemuxm3Elements,
            setMuxm1Elements,
            setMuxm2Elements,
            setMuxm3Elements,
            setDFlipFlopElements,
            setJkFlipFlopElements,
            setEncoderElements,
          }}
          allElements={{
            notElements,
            bufferElements,
            nor2InputsElements,
            nor3InputsElements,
            nor4InputsElements,
            nor8InputsElements,
            nand2InputsElements,
            nand3InputsElements,
            nand4InputsElements,
            nand8InputsElements,
            exNorElements,
            exOrElements,
            demuxm2Elements,
            demuxm3Elements,
            muxm1Elements,
            muxm2Elements,
            muxm3Elements,
            dFlipFlopElements,
            jkFlipFlopElements,
            encoderElements,
          }}
          setMenuVisible={setMenuVisible}
          setDeleteVisible={setDeleteVisible}
          newElement1={newElement1}
          setNewElement1={setNewElement1}
          setOnLoad={setOnLoad}
          setPinIndicatorPosition={setPinIndicatorPosition}
        />
      </div>

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
        setFunctions={{
          setNotElements,
          setBufferElements,
          setNor2InputsElements,
          setNor3InputsElements,
          setNor4InputsElements,
          setNor8InputsElements,
          setNand2InputsElements,
          setNand3InputsElements,
          setNand4InputsElements,
          setNand8InputsElements,
          setExNorElements,
          setExOrElements,
          setDemuxm2Elements,
          setDemuxm3Elements,
          setMuxm1Elements,
          setMuxm2Elements,
          setMuxm3Elements,
          setDFlipFlopElements,
          setJkFlipFlopElements,
          setEncoderElements,
        }}
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

      <Cable
        cables={cables}
        handleDeleteCableClick={handleDeleteCableClick}
        handleJointDrag={handleJointDrag}
      />

      {pinIndicatorPosition.top && pinIndicatorPosition.left && (
        <div
          className="pin-indicator"
          style={{
            top: `${pinIndicatorPosition.top}px`,
            left: `${pinIndicatorPosition.left}px`,
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
