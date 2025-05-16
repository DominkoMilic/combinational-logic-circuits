import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./DEMUXm2.css";

const DEMUXm2 = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handleDEMUXm2A0InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm2A1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input2",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm2UInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input3",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm2GNDInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input4",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm2VCCInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input5",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm2I0OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output0",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm2I1OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output1",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm2I2OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output2",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm2I3OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output3",
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
      <div className="DEMUXm2 handle" title={id} ref={draggableRef}>
        <div className="DEMUXm2-element">
          <div className="all-DEMUXm2-inputs">
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "input5",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2VCCInputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2I0OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[2] = {
                  element: el,
                  id: "output1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2I1OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[3] = {
                  element: el,
                  id: "output2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2I2OutputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="DEMUXm2-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-DEMUXm2-outputs">
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[4] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2A0InputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[5] = {
                  element: el,
                  id: "input2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2A1InputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[6] = {
                  element: el,
                  id: "input3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2UInputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[7] = {
                  element: el,
                  id: "output3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2I3OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm2-input"
              ref={(el) =>
                (inputRefs.current[8] = {
                  element: el,
                  id: "input4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm2GNDInputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DEMUXm2;
