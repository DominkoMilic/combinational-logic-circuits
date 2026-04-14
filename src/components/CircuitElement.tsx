import { useRef, useEffect, useCallback } from "react";
import Draggable from "react-draggable";
import type { CircuitElement as CircuitElementType, CircuitElementConfig, PinConfig } from "../types";
import { gateSvgs } from "./GateSvgs";

interface CircuitElementProps {
  config: CircuitElementConfig;
  element: CircuitElementType;
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

function CircuitElement({
  config,
  element,
  handleElementClick,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}: CircuitElementProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<({ element: HTMLDivElement; id: string } | null)[]>([]);

  const getPositions = useCallback(() => {
    return inputRefs.current.map((input) => {
      if (input?.element) {
        const rect = input.element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, id: input.id };
      }
      return null;
    });
  }, []);

  const handleDrag = useCallback(
    (_e: unknown, data?: { x: number; y: number }) => {
      const positions = getPositions();
      const newPos = data ? { x: data.x, y: data.y } : undefined;
      handleDragElement(element, positions, newPos);
    },
    [element, getPositions, handleDragElement]
  );

  useEffect(() => {
    function handleResize() {
      handleDrag(null, element.position);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [onLoad]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePinClick = (pin: PinConfig, e: React.MouseEvent) => {
    e.preventDefault();
    const newElement = {
      id: element.id + "-" + pin.refId,
      value: element.value,
    };
    handleElementClick(newElement, e, pin.cableOption, pin.inputNumber);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDeleteElementClick(e, element.id);
  };

  const renderPin = (pin: PinConfig) => (
    <div
      key={pin.refId}
      className={`relative cursor-pointer bg-black ${
        config.layout === "horizontal"
          ? "w-2.5 h-[5px]"
          : "w-2.5 h-[15px]"
      }`}
      ref={(el) => {
        if (el) {
          inputRefs.current[pin.refIndex] = { element: el, id: pin.refId };
        }
      }}
      onContextMenu={(e) => handlePinClick(pin, e)}
      style={{
        // Enlarged click target via pseudo-element equivalent padding
      }}
    >
      {/* Enlarged click target */}
      <div
        className="absolute bg-transparent pointer-events-auto"
        style={
          config.layout === "horizontal"
            ? config.eightInput
              ? { top: -1, left: -15, width: 40, height: 7 }
              : { top: -8, left: -15, width: 40, height: 20 }
            : { top: -15, left: -3, width: 15, height: 40 }
        }
        onContextMenu={(e) => handlePinClick(pin, e)}
      />
    </div>
  );

  const GateSvgComponent = gateSvgs[config.name];

  if (config.layout === "horizontal") {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={element.position}
        position={undefined}
        scale={1}
        onDrag={(e, data) => handleDrag(e, data)}
        bounds=".draggable-area"
        nodeRef={draggableRef}
      >
        <div
          className="handle absolute cursor-grab"
          title={element.id}
          ref={draggableRef}
          style={{ width: config.width, height: config.height }}
        >
          <div className="flex justify-center items-center h-full">
            {/* Input pins column */}
            <div
              className={`flex flex-col justify-between items-center ${
                config.eightInput ? "h-[80px]" : "h-[60px]"
              }`}
            >
              {config.topPins.map(renderPin)}
            </div>

            {/* Element image */}
            <div
              style={{ width: config.imageWidth, height: config.imageHeight }}
              onContextMenu={handleDeleteClick}
            >
              {GateSvgComponent && (
                <GateSvgComponent width={config.imageWidth} height={config.imageHeight} />
              )}
            </div>

            {/* Output pins column */}
            <div
              className={`flex flex-col justify-between items-center ${
                config.eightInput ? "h-[80px]" : "h-[60px]"
              }`}
            >
              {config.bottomPins.map(renderPin)}
            </div>
          </div>
        </div>
      </Draggable>
    );
  }

  // IC layout (DEMUXm2/m3, MUXm1/m2/m3, DFlipFlop, JKFlipFlop, encoder)
  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={undefined}
      scale={1}
      onDrag={(e, data) => handleDrag(e, data)}
      bounds=".draggable-area"
      nodeRef={draggableRef}
    >
      <div
        className="handle absolute cursor-grab"
        title={element.id}
        ref={draggableRef}
        style={{ width: config.width, height: config.height }}
      >
        <div className="relative w-full h-full">
          {/* Top pin row */}
          <div
            className="grid absolute"
            style={{
              gridTemplateColumns: `repeat(${config.topGridCols}, 1fr)`,
              ...config.topStyle,
            }}
          >
            {config.topPins.map(renderPin)}
          </div>

          {/* Element image */}
          <div
            className="flex"
            style={{ width: config.imageWidth, height: config.imageHeight }}
            onContextMenu={handleDeleteClick}
          >
            {GateSvgComponent && (
              <GateSvgComponent width={config.imageWidth} height={config.imageHeight} />
            )}
          </div>

          {/* Bottom pin row */}
          <div
            className="grid absolute"
            style={{
              gridTemplateColumns: `repeat(${config.bottomGridCols}, 1fr)`,
              ...config.bottomStyle,
            }}
          >
            {config.bottomPins.map(renderPin)}
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default CircuitElement;
