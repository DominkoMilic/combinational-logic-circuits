import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./MUXm3.css";

const MUXm3 = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handleMUXm3U0InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3U1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input2",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3U2InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input3",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3U3InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input4",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3U4InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input5",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3U5InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input6",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3U6InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input7",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3U7InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input8",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3EInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input9",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3GNDInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-inputA",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3VCCInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-inputB",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3A0InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-inputC",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3A1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-inputD",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3A2InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-inputE",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleMUXm3I0OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output0",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleMUXm3I1OutputCLick = (e) => {
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
      <div className="MUXm3 handle" title={id} ref={draggableRef}>
        <div className="MUXm3-element">
          <div className="all-MUXm3-inputs">
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "inputB",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3VCCInputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "input5",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3U4InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[2] = {
                  element: el,
                  id: "input6",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3U5InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[3] = {
                  element: el,
                  id: "input7",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3U6InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[4] = {
                  element: el,
                  id: "input8",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3U7InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[5] = {
                  element: el,
                  id: "inputC",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3A0InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[6] = {
                  element: el,
                  id: "inputD",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3A1InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[7] = {
                  element: el,
                  id: "inputE",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3A2InputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="MUXm3-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-MUXm3-outputs">
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[8] = {
                  element: el,
                  id: "input4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3U3InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[9] = {
                  element: el,
                  id: "input3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3U2InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[10] = {
                  element: el,
                  id: "input2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3U1InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[11] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3U0InputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[12] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3I0OutputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[13] = {
                  element: el,
                  id: "output1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3I1OutputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[14] = {
                  element: el,
                  id: "input9",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3EInputCLick(e);
              }}
            ></div>
            <div
              className="MUXm3-input"
              ref={(el) =>
                (inputRefs.current[15] = {
                  element: el,
                  id: "inputA",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleMUXm3GNDInputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default MUXm3;
