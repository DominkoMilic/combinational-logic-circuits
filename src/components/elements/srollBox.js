import React, { useRef } from "react";
import "./scrollBox.css";
import { images } from "../../utilis/controlPanel";

const ScrollBox = ({ setFunctions }) => {
  const scrollRef = useRef(null);

  const {
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
  } = setFunctions;

  const elementSetters = {
    NOT: setNotElements,
    buffer: setBufferElements,
    NOR2Inputs: setNor2InputsElements,
    NOR3Inputs: setNor3InputsElements,
    NOR4Inputs: setNor4InputsElements,
    NOR8Inputs: setNor8InputsElements,
    NAND2Inputs: setNand2InputsElements,
    NAND3Inputs: setNand3InputsElements,
    NAND4Inputs: setNand4InputsElements,
    NAND8Inputs: setNand8InputsElements,
    EXNOR: setExNorElements,
    EXOR: setExOrElements,
    DEMUXm2: setDemuxm2Elements,
    DEMUXm3: setDemuxm3Elements,
    MUXm1: setMuxm1Elements,
    MUXm2: setMuxm2Elements,
    MUXm3: setMuxm3Elements,
    encoder: setEncoderElements,
  };

  const handleAddElement = (type) => {
    const setFunction = elementSetters[type];
    if (!setFunction) {
      console.error(`No setter found for element type: ${type}`);
      return;
    }

    setFunction((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;
      return [
        ...prev,
        { id: `${type}-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddDFlipFlop = () => {
    setDFlipFlopElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        {
          id: `DFlipFlop-${nextId}`,
          value: "0",
          prevQValue: "0",
          position: { x: 0, y: 0 },
        },
      ];
    });
  };

  const handleAddJKFlipFlop = () => {
    setJkFlipFlopElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        {
          id: `JKFlipFlop-${nextId}`,
          value: "0",
          prevQValue: "0",
          position: { x: 0, y: 0 },
        },
      ];
    });
  };

  const components = [
    {
      key: "buffer",
      label: "Buffer",
      handler: () => handleAddElement("buffer"),
    },
    { key: "NOT", label: "NOT", handler: () => handleAddElement("NOT") },
    {
      key: "NOR2Inputs",
      label: "NOR 2 inputs",
      handler: () => handleAddElement("NOR2Inputs"),
    },
    {
      key: "NOR3Inputs",
      label: "NOR 3 inputs",
      handler: () => handleAddElement("NOR3Inputs"),
    },
    {
      key: "NOR4Inputs",
      label: "NOR 4 inputs",
      handler: () => handleAddElement("NOR4Inputs"),
    },
    {
      key: "NOR8Inputs",
      label: "NOR 8 inputs",
      handler: () => handleAddElement("NOR8Inputs"),
    },
    {
      key: "NAND2Inputs",
      label: "NAND 2 inputs",
      handler: () => handleAddElement("NAND2Inputs"),
    },
    {
      key: "NAND3Inputs",
      label: "NAND 3 inputs",
      handler: () => handleAddElement("NAND3Inputs"),
    },
    {
      key: "NAND4Inputs",
      label: "NAND 4 inputs",
      handler: () => handleAddElement("NAND4Inputs"),
    },
    {
      key: "NAND8Inputs",
      label: "NAND 8 inputs",
      handler: () => handleAddElement("NAND8Inputs"),
    },
    { key: "EXOR", label: "EXOR", handler: () => handleAddElement("EXOR") },
    { key: "EXNOR", label: "EXNOR", handler: () => handleAddElement("EXNOR") },
    {
      key: "DEMUXm2",
      label: "DEMUX m=2",
      handler: () => handleAddElement("DEMUXm2"),
    },
    {
      key: "DEMUXm3",
      label: "DEMUX m=3",
      handler: () => handleAddElement("DEMUXm3"),
    },
    {
      key: "MUXm1",
      label: "MUX m=1",
      handler: () => handleAddElement("MUXm1"),
    },
    {
      key: "MUXm2",
      label: "MUX m=2",
      handler: () => handleAddElement("MUXm2"),
    },
    {
      key: "MUXm3",
      label: "MUX m=3",
      handler: () => handleAddElement("MUXm3"),
    },
    {
      key: "encoder",
      label: "Priority encoder",
      handler: () => handleAddElement("encoder"),
    },
    { key: "DFlipFlop", label: "D flip-flop", handler: handleAddDFlipFlop },
    { key: "JKFlipFlop", label: "JK flip-flop", handler: handleAddJKFlipFlop },
  ];

  return (
    <div className="scroll-box-container">
      <div className="scrollable-box" ref={scrollRef}>
        {components.map(({ key, label, handler }) => (
          <button key={key} onClick={handler}>
            <img src={images[key]} alt={label} />
            <br />
            {label}
            <br />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollBox;
