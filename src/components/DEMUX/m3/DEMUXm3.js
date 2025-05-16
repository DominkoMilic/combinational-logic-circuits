import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./DEMUXm3.css";

const DEMUXm3 = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handleDEMUXm3A0InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm3A1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input2",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm3A2InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input3",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm3U1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input4",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm3U2InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input5",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm3U3InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input6",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm3GNDInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input7",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm3VCCInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input8",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleDEMUXm3I0OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output0",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm3I1OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output1",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm3I2OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output2",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm3I3OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output3",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm3I4OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output4",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm3I5OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output5",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm3I6OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output6",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleDEMUXm3I7OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output7",
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
      <div className="DEMUXm3 handle" title={id} ref={draggableRef}>
        <div className="DEMUXm3-element">
          <div className="all-DEMUXm3-inputs">
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "input8",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3VCCInputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3I0OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[2] = {
                  element: el,
                  id: "output1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3I1OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[3] = {
                  element: el,
                  id: "output2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3I2OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[4] = {
                  element: el,
                  id: "output3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3I3OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[5] = {
                  element: el,
                  id: "output4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3I4OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[6] = {
                  element: el,
                  id: "output5",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3I5OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[7] = {
                  element: el,
                  id: "output6",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3I6OutputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="DEMUXm3-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-DEMUXm3-outputs">
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[8] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3A0InputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[9] = {
                  element: el,
                  id: "input2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3A1InputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[10] = {
                  element: el,
                  id: "input3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3A2InputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[11] = {
                  element: el,
                  id: "input4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3U1InputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[12] = {
                  element: el,
                  id: "input5",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3U2InputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[13] = {
                  element: el,
                  id: "input6",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3U3InputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[14] = {
                  element: el,
                  id: "output7",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3I7OutputCLick(e);
              }}
            ></div>
            <div
              className="DEMUXm3-input"
              ref={(el) =>
                (inputRefs.current[15] = {
                  element: el,
                  id: "input7",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleDEMUXm3GNDInputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DEMUXm3;
