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

  const handleAddNOT = () => {
    setNotElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NOT-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddBuffer = () => {
    setBufferElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `buffer-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddNOR2Inputs = () => {
    setNor2InputsElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NOR2Inputs-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddNOR3Inputs = () => {
    setNor3InputsElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NOR3Inputs-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddNOR4Inputs = () => {
    setNor4InputsElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NOR4Inputs-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddNOR8Inputs = () => {
    setNor8InputsElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NOR8Inputs-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddNAND2Inputs = () => {
    setNand2InputsElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NAND2Inputs-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddNAND3Inputs = () => {
    setNand3InputsElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NAND3Inputs-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddNAND4Inputs = () => {
    setNand4InputsElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NAND4Inputs-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddNAND8Inputs = () => {
    setNand8InputsElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `NAND8Inputs-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddEXNOR = () => {
    setExNorElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `EXNOR-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddEXOR = () => {
    setExOrElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `EXOR-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddDEMUXm2 = () => {
    setDemuxm2Elements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `DEMUXm2-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddDEMUXm3 = () => {
    setDemuxm3Elements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `DEMUXm3-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddMUXm3 = () => {
    setMuxm3Elements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `MUXm3-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddMUXm2 = () => {
    setMuxm2Elements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `MUXm2-${nextId}`, value: "0", position: { x: 0, y: 0 } },
      ];
    });
  };

  const handleAddMUXm1 = () => {
    setMuxm1Elements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        { id: `MUXm1-${nextId}`, value: "0", position: { x: 0, y: 0 } },
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

  const handleAddEncoder = () => {
    setEncoderElements((prev) => {
      const existingIds = prev.map((el) => parseInt(el.id.split("-")[1], 10));
      const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 0;

      return [
        ...prev,
        {
          id: `PriorityEncoder-${nextId}`,
          value: "0",
          position: { x: 0, y: 0 },
        },
      ];
    });
  };

  const components = [
    { key: "buffer", label: "Buffer", handler: handleAddBuffer },
    { key: "NOT", label: "NOT", handler: handleAddNOT },
    { key: "NOR2Inputs", label: "NOR 2 inputs", handler: handleAddNOR2Inputs },
    { key: "NOR3Inputs", label: "NOR 3 inputs", handler: handleAddNOR3Inputs },
    { key: "NOR4Inputs", label: "NOR 4 inputs", handler: handleAddNOR4Inputs },
    { key: "NOR8Inputs", label: "NOR 8 inputs", handler: handleAddNOR8Inputs },
    {
      key: "NAND2Inputs",
      label: "NAND 2 inputs",
      handler: handleAddNAND2Inputs,
    },
    {
      key: "NAND3Inputs",
      label: "NAND 3 inputs",
      handler: handleAddNAND3Inputs,
    },
    {
      key: "NAND4Inputs",
      label: "NAND 4 inputs",
      handler: handleAddNAND4Inputs,
    },
    {
      key: "NAND8Inputs",
      label: "NAND 8 inputs",
      handler: handleAddNAND8Inputs,
    },
    { key: "EXOR", label: "EXOR", handler: handleAddEXOR },
    { key: "EXNOR", label: "EXNOR", handler: handleAddEXNOR },
    { key: "DEMUXm2", label: "DEMUX m=2", handler: handleAddDEMUXm2 },
    { key: "DEMUXm3", label: "DEMUX m=3", handler: handleAddDEMUXm3 },
    { key: "MUXm1", label: "MUX m=1", handler: handleAddMUXm1 },
    { key: "MUXm2", label: "MUX m=2", handler: handleAddMUXm2 },
    { key: "MUXm3", label: "MUX m=3", handler: handleAddMUXm3 },
    { key: "DFlipFlop", label: "D flip-flop", handler: handleAddDFlipFlop },
    { key: "JKFlipFlop", label: "JK flip-flop", handler: handleAddJKFlipFlop },
    { key: "encoder", label: "Priority encoder", handler: handleAddEncoder },
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
