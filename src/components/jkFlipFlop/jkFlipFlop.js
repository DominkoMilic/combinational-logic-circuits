import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./jkFlipFlop.css";

const JKFlipFlop = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handlejkFlipFlopRInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handlejkFlipFlopCPInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input2",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handlejkFlipFlopKInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input3",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handlejkFlipFlopJInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input4",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handlejkFlipFlopSInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input5",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handlejkFlipFlopGNDInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input6",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handlejkFlipFlopVCCInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input7",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handlejkFlipFlopQ0OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output0",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handlejkFlipFlopQ1OutputCLick = (e) => {
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
      <div className="jkFlipFlop handle" title={id} ref={draggableRef}>
        <div className="jkFlipFlop-element">
          <div className="all-jkFlipFlop-inputs">
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "input7",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopVCCInputCLick(e);
              }}
            ></div>
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "input5",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopSInputCLick(e);
              }}
            ></div>
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[2] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopQ0OutputCLick(e);
              }}
            ></div>
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[3] = {
                  element: el,
                  id: "output1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopQ1OutputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="jkFlipFlop-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-jkFlipFlop-outputs">
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[4] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopRInputCLick(e);
              }}
            ></div>
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[5] = {
                  element: el,
                  id: "input2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopCPInputCLick(e);
              }}
            ></div>
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[6] = {
                  element: el,
                  id: "input3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopKInputCLick(e);
              }}
            ></div>
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[7] = {
                  element: el,
                  id: "input4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopJInputCLick(e);
              }}
            ></div>
            <div
              className="jkFlipFlop-input"
              ref={(el) =>
                (inputRefs.current[8] = {
                  element: el,
                  id: "input6",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handlejkFlipFlopGNDInputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default JKFlipFlop;
