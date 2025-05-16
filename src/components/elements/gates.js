import React from "react";
import Buffer from "../buffer/buffer";
import NOT from "../NOT/NOT";
import NOR from "../NOR/NOR";
import NOR3Inputs from "../NOR/NOR3Inputs";
import NOR4Inputs from "../NOR/NOR4Inputs";
import NOR8Inputs from "../NOR/NOR8Inputs";
import NAND2Inputs from "../NAND/NAND2Inputs";
import NAND3Inputs from "../NAND/NAND3Inputs";
import NAND4Inputs from "../NAND/NAND4Inputs";
import NAND8Inputs from "../NAND/NAND8Inputs";
import EXNOR from "../EX/EXNOR";
import EXOR from "../EX/EXOR";
import DEMUXm2 from "../DEMUX/m2/DEMUXm2";
import DEMUXm3 from "../DEMUX/m3/DEMUXm3";
import MUXm1 from "../MUX/m1/MUXm1";
import MUXm2 from "../MUX/m2/MUXm2";
import MUXm3 from "../MUX/m3/MUXm3";
import DFlipFlop from "../dFlipFlop/dFlipFlop";
import JKFlipFlop from "../jkFlipFlop/jkFlipFlop";
import ENCODER from "../encoder/encoder";

const Gates = ({
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
  handleElementClick,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  return (
    <div>
      {notElements?.map((notElement) => (
        <NOT
          key={notElement.id}
          id={notElement.id}
          handleElementClick={handleElementClick}
          element={notElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {bufferElements?.map((bufferElement) => (
        <Buffer
          key={bufferElement.id}
          id={bufferElement.id}
          handleElementClick={handleElementClick}
          element={bufferElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {nor2InputsElements?.map((nor2InputElement) => (
        <NOR
          key={nor2InputElement.id}
          id={nor2InputElement.id}
          handleElementClick={handleElementClick}
          element={nor2InputElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {nor3InputsElements?.map((nor3InputElement) => (
        <NOR3Inputs
          key={nor3InputElement.id}
          id={nor3InputElement.id}
          handleElementClick={handleElementClick}
          element={nor3InputElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {nor4InputsElements?.map((nor4InputElement) => (
        <NOR4Inputs
          key={nor4InputElement.id}
          id={nor4InputElement.id}
          handleElementClick={handleElementClick}
          element={nor4InputElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {nor8InputsElements?.map((nor8InputElement) => (
        <NOR8Inputs
          key={nor8InputElement.id}
          id={nor8InputElement.id}
          handleElementClick={handleElementClick}
          element={nor8InputElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {nand2InputsElements?.map((nand2InputsElement) => (
        <NAND2Inputs
          key={nand2InputsElement.id}
          id={nand2InputsElement.id}
          handleElementClick={handleElementClick}
          element={nand2InputsElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {nand3InputsElements?.map((nand3InputsElement) => (
        <NAND3Inputs
          key={nand3InputsElement.id}
          id={nand3InputsElement.id}
          handleElementClick={handleElementClick}
          element={nand3InputsElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {nand4InputsElements?.map((nand4InputsElement) => (
        <NAND4Inputs
          key={nand4InputsElement.id}
          id={nand4InputsElement.id}
          handleElementClick={handleElementClick}
          element={nand4InputsElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {nand8InputsElements?.map((nand8InputsElement) => (
        <NAND8Inputs
          key={nand8InputsElement.id}
          id={nand8InputsElement.id}
          handleElementClick={handleElementClick}
          element={nand8InputsElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {exNorElements?.map((exNorElement) => (
        <EXNOR
          key={exNorElement.id}
          id={exNorElement.id}
          handleElementClick={handleElementClick}
          element={exNorElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {exOrElements?.map((exOrElement) => (
        <EXOR
          key={exOrElement.id}
          id={exOrElement.id}
          handleElementClick={handleElementClick}
          element={exOrElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {demuxm2Elements?.map((demuxm2Element) => (
        <DEMUXm2
          key={demuxm2Element.id}
          id={demuxm2Element.id}
          handleElementClick={handleElementClick}
          element={demuxm2Element}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {demuxm3Elements?.map((demuxm3Element) => (
        <DEMUXm3
          key={demuxm3Element.id}
          id={demuxm3Element.id}
          handleElementClick={handleElementClick}
          element={demuxm3Element}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {muxm1Elements?.map((muxm1Element) => (
        <MUXm1
          key={muxm1Element.id}
          id={muxm1Element.id}
          handleElementClick={handleElementClick}
          element={muxm1Element}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {muxm2Elements?.map((muxm2Element) => (
        <MUXm2
          key={muxm2Element.id}
          id={muxm2Element.id}
          handleElementClick={handleElementClick}
          element={muxm2Element}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {muxm3Elements?.map((muxm3Element) => (
        <MUXm3
          key={muxm3Element.id}
          id={muxm3Element.id}
          handleElementClick={handleElementClick}
          element={muxm3Element}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {dFlipFlopElements?.map((dFlipFlopElement) => (
        <DFlipFlop
          key={dFlipFlopElement.id}
          id={dFlipFlopElement.id}
          handleElementClick={handleElementClick}
          element={dFlipFlopElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {jkFlipFlopElements?.map((jkFlipFlopElement) => (
        <JKFlipFlop
          key={jkFlipFlopElement.id}
          id={jkFlipFlopElement.id}
          handleElementClick={handleElementClick}
          element={jkFlipFlopElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}

      {encoderElements?.map((encoderElement) => (
        <ENCODER
          key={encoderElement.id}
          id={encoderElement.id}
          handleElementClick={handleElementClick}
          element={encoderElement}
          handleDeleteElementClick={handleDeleteElementClick}
          handleDragElement={handleDragElement}
          onLoad={onLoad}
        />
      ))}
    </div>
  );
};

export default Gates;
