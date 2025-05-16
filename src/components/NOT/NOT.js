import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./NOT.css";

const NOT = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handleNOT1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleNOT1OutputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-output0",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDeleteClick = (e) => {
    handleDeleteElementClick(e, element.id);
  };

  const handleDrag = (e, data) => {
    const newPositionForElement = { x: data.x, y: data.y };
    const positions = inputRefs.current.map((input) => {
      if (input) {
        const rect = input.element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, id: input.id };
      }
      return null;
    });

    handleDragElement(element, positions, newPositionForElement);
  };

  useEffect(() => {
    function handleResize() {
      handleDrag(null, element.position);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [onLoad]);

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={element.position}
      position={null}
      scale={1}
      onDrag={handleDrag}
      bounds=".draggable-area"
      nodeRef={draggableRef}
    >
      <div className="NOT handle" title={id} ref={draggableRef}>
        <div className="NOT-element">
          <div className="all-NOT-inputs">
            <div
              className="NOT-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleNOT1InputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="NOT-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-NOT-outputs">
            <div
              className="NOT-output"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleNOT1OutputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default NOT;
