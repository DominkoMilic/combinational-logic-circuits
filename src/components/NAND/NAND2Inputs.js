import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./NAND.css";

const NAND2Inputs = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handleNAND1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleNAND2InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input2",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleNAND1OutputCLick = (e) => {
    const inputNumber = 2;
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
      <div className="NAND handle" title={id} ref={draggableRef}>
        <div className="NAND-element">
          <div className="all-NAND-inputs">
            <div
              className="NAND-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleNAND1InputCLick(e);
              }}
            ></div>
            <div
              className="NAND-input"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "input2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleNAND2InputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="NAND-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-NAND-outputs">
            <div
              className="NAND-output"
              ref={(el) =>
                (inputRefs.current[2] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleNAND1OutputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default NAND2Inputs;
