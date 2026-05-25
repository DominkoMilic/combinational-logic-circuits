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
  handleToggleElement?: (elementId: string) => void;
  onLoad: boolean;
}

function CircuitElement({
  config,
  element,
  handleElementClick,
  handleDeleteElementClick,
  handleDragElement,
  handleToggleElement,
  onLoad,
}: CircuitElementProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<({ element: Element; id: string } | null)[]>([]);

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

  const handlePinContextMenu = useCallback(
    (pin: PinConfig, e: React.MouseEvent) => {
      e.preventDefault();
      handleElementClick(
        { id: element.id + "-" + pin.refId, value: element.value },
        e,
        pin.cableOption,
        pin.inputNumber
      );
    },
    [element, handleElementClick]
  );

  const handlePinRef = useCallback(
    (refIndex: number, refId: string, el: Element | null) => {
      if (el) {
        inputRefs.current[refIndex] = { element: el, id: refId };
      }
    },
    []
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleDeleteElementClick(e, element.id);
    },
    [element.id, handleDeleteElementClick]
  );

  const GateSvgComponent = gateSvgs[config.name];
  const defaultPos =
    config.layout === "horizontal" ? element.position : { x: 0, y: 0 };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      cancel=".xvar-toggle"
      defaultPosition={defaultPos}
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
          {GateSvgComponent && (
            <GateSvgComponent
              width={config.imageWidth}
              height={config.imageHeight}
              topPins={config.topPins}
              bottomPins={config.bottomPins}
              onPinContextMenu={handlePinContextMenu}
              pinRef={handlePinRef}
              onBodyContextMenu={handleDeleteClick}
              value={element.value}
              onToggle={
                handleToggleElement
                  ? () => handleToggleElement(element.id)
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </Draggable>
  );
}

export default CircuitElement;
