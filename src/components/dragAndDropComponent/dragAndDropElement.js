import React from "react";
import Draggable from "react-draggable";

const DragAndDropElement = () => {
  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      scale={1}
      bounds=".draggable-area"
      onStart={this?.handleStart}
      onDrag={this?.handleDrag}
      onStop={this?.handleStop}
    >
      <div
        className="handle"
        style={{ backgroundColor: "white", width: "100px", height: "100px" }}
      >
        <div>Drag from here</div>
      </div>
    </Draggable>
  );
};

export default DragAndDropElement;
