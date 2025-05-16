import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./MUXm2.css";

const MUXm2 = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handleMUXm2A0InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2A1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input2",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2EInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input3",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2U0InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input4",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2U1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input5",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2U2InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input6",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2U3InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input7",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2GNDInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input8",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2VCCInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input9",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm2IOutputCLick = (e) => {
    const inputNumber = 9;
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
      <div className="MUXm2 handle" title={id} ref={draggableRef}>
        <div className="MUXm2-element">
          <div className="all-MUXm2-inputs">
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "input9",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2VCCInputCLick(e);
              }}
            ></div>
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "input4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2U0InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[2] = {
                  element: el,
                  id: "input5",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2U1InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[3] = {
                  element: el,
                  id: "input6",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2U2InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[4] = {
                  element: el,
                  id: "input7",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2U3InputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="MUXm2-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-MUXm2-outputs">
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[5] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2A0InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[6] = {
                  element: el,
                  id: "input2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2A1InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[7] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2IOutputCLick(e);
              }}
            ></div>
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[8] = {
                  element: el,
                  id: "input3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2EInputCLick(e);
              }}
            ></div>
            <div
              className="MUXm2-input"
              ref={(el) =>
                (inputRefs.current[9] = {
                  element: el,
                  id: "input8",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm2GNDInputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default MUXm2;
