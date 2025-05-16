import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./encoder.css";

const ENCODER = ({
  id,
  handleElementClick,
  element,
  handleDeleteElementClick,
  handleDragElement,
  onLoad,
}) => {
  const draggableRef = useRef(null);
  const inputRefs = useRef([]);

  const handleencoderU0InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input1",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderU1InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input2",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderU2InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input3",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderU3InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input4",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderU4InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input5",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderU5InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input6",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderU6InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input7",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderU7InputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input8",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderEUInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-input9",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderGNDInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-inputA",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderVCCInputCLick = (e) => {
    const inputNumber = 1;
    const newElement = {
      id: element.id + "-inputB",
      value: element.value,
    };
    handleElementClick(newElement, e, 0, inputNumber);
  };

  const handleencoderI0OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output0",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleencoderI1OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output1",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleencoderI2OutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output2",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleencoderEIOutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output3",
      value: element.value,
    };
    handleElementClick(newElement, e, 1, inputNumber);
  };

  const handleencoderGSOutputCLick = (e) => {
    const inputNumber = 8;
    const newElement = {
      id: element.id + "-output4",
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
      <div className="encoder handle" title={id} ref={draggableRef}>
        <div className="encoder-element">
          <div className="all-encoder-inputs">
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[0] = {
                  element: el,
                  id: "inputB",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderVCCInputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[1] = {
                  element: el,
                  id: "output3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderEIOutputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[2] = {
                  element: el,
                  id: "output4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderGSOutputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[3] = {
                  element: el,
                  id: "input5",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderU4InputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[4] = {
                  element: el,
                  id: "input6",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderU5InputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[5] = {
                  element: el,
                  id: "input7",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderU6InputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[6] = {
                  element: el,
                  id: "input8",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderU7InputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[7] = {
                  element: el,
                  id: "output0",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderI0OutputCLick(e);
              }}
            ></div>
          </div>
          <div
            className="encoder-image"
            onContextMenu={(e) => {
              e.preventDefault();
              handleDeleteClick(e);
            }}
          ></div>
          <div className="all-encoder-outputs">
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[8] = {
                  element: el,
                  id: "input4",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderU3InputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[9] = {
                  element: el,
                  id: "input3",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderU2InputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[10] = {
                  element: el,
                  id: "input2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderU1InputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[11] = {
                  element: el,
                  id: "input1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderU0InputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[12] = {
                  element: el,
                  id: "input9",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderEUInputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[13] = {
                  element: el,
                  id: "output2",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderI2OutputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[14] = {
                  element: el,
                  id: "output1",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderI1OutputCLick(e);
              }}
            ></div>
            <div
              className="encoder-input"
              ref={(el) =>
                (inputRefs.current[15] = {
                  element: el,
                  id: "inputA",
                })
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleencoderGNDInputCLick(e);
              }}
            ></div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ENCODER;
