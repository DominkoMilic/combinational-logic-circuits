import React from "react";

const Cable = ({ cables, handleDeleteCableClick, handleJointDrag }) => {
  const colors = [
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
    "#e6beff",
    "#9a6324",
    "#fffac8",
    "#800000",
    "#aaffc3",
    "#808000",
    "#ffd8b1",
    "#000075",
    "#808080",
    "#ffffff",
  ];

  const handleCableClick = (e, cable) => {
    e.preventDefault();
    handleDeleteCableClick(e, cable);
  };

  const handleJointMove = (event, areaRect, cableId, jointIndex) => {
    const clampedX = Math.min(
      Math.max(event.clientX, areaRect.left),
      areaRect.right
    );
    const clampedY = Math.min(
      Math.max(event.clientY, areaRect.top),
      areaRect.bottom
    );

    handleJointDrag(
      { clientX: clampedX, clientY: clampedY },
      cableId,
      jointIndex
    );
  };

  const addDragListeners = (moveHandler, upHandler) => {
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  };

  const removeDragListeners = (moveHandler, upHandler) => {
    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", upHandler);
  };

  return (
    <div className="cables-container" style={{ zIndex: 0 }}>
      {cables.map((cable, index) => {
        const points = [
          cable.element1.position,
          ...(cable.joints || []),
          cable.element2.position,
        ];

        return (
          <svg
            key={cable.id}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            <polyline
              points={points.map((p) => `${p.x},${p.y}`).join(" ")}
              stroke="black"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />

            <polyline
              points={points.map((p) => `${p.x},${p.y}`).join(" ")}
              stroke={colors[cable.color]}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              style={{
                cursor: "pointer",
                pointerEvents: "visiblePainted",
              }}
              onContextMenu={(e) => handleCableClick(e, cable)}
            />

            {cable.joints?.map((joint, jointIndex) => (
              <circle
                key={jointIndex}
                cx={joint.x}
                cy={joint.y}
                r="5"
                fill={colors[cable.color]}
                style={{
                  cursor: "grab",
                  pointerEvents: "all",
                  filter: "brightness(50%)",
                }}
                onMouseDown={(e) => {
                  e.preventDefault();

                  const draggableArea =
                    document.querySelector(".draggable-area");
                  if (!draggableArea) return;

                  const areaRect = draggableArea.getBoundingClientRect();

                  const moveHandler = (event) =>
                    handleJointMove(event, areaRect, cable.id, jointIndex);
                  const upHandler = () =>
                    removeDragListeners(moveHandler, upHandler);

                  addDragListeners(moveHandler, upHandler);
                }}
              />
            ))}
          </svg>
        );
      })}
    </div>
  );
};

export default Cable;
