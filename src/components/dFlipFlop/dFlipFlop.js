import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./dFlipFlop.css";

const DFlipFlop = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handledFlipFlopRInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handledFlipFlopDInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input2",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handledFlipFlopCPInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input3",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handledFlipFlopSInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input4",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handledFlipFlopGNDInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input5",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handledFlipFlopVCCInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input6",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handledFlipFlopQ0OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output0",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handledFlipFlopQ1OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output1",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDeleteClick = (e) => {
    handleDeleteElementClick(e, element.id);
  };

  const handleDrag = () => {
    const positions = inputRefs.current.map((input) => {
      if (input) {
        const rect = input.element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, id: input.id };
      }
      return null;
    });

    handleDragElement(element, positions);
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
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      scale={1}
      onDrag={handleDrag}
      bounds=".draggable-area"
      nodeRef={draggableRef}
    >
      <div className="dFlipFlop handle" title={id} ref={draggableRef}>
        <div className="dFlipFlop-element">
          <div className="all-dFlipFlop-inputs">
            <div
              className="dFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "input6",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handledFlipFlopVCCInputCLick(e);
              }}
            ></div>
            <div
              className="dFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "input4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handledFlipFlopSInputCLick(e);
              }}
            ></div>
            <div
              className="dFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[2] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handledFlipFlopQ0OutputCLick(e);
              }}
            ></div>
            <div
              className="dFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[3] = {
                  element: el,
                  id: "output1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handledFlipFlopQ1OutputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="dFlipFlop-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-dFlipFlop-outputs">
            <div
              className="dFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[4] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handledFlipFlopRInputCLick(e);
              }}
            ></div>
            <div
              className="dFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[5] = {
                  element: el,
                  id: "input2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handledFlipFlopDInputCLick(e);
              }}
            ></div>
            <div
              className="dFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[6] = {
                  element: el,
                  id: "input3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handledFlipFlopCPInputCLick(e);
              }}
            ></div>
            <div
              className="dFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[7] = {
                  element: el,
                  id: "input5",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handledFlipFlopGNDInputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DFlipFlop;
