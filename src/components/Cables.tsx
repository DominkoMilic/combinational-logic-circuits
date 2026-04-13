import type { Cable } from "../types";

const CABLE_COLORS = [
  "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231",
  "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe",
  "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000",
  "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff",
];

interface CablesProps {
  cables: Cable[];
  handleDeleteCableClick: (event: React.MouseEvent, cable: Cable) => void;
  handleJointDrag: (
    event: { clientX: number; clientY: number },
    cableId: string,
    jointIndex: number
  ) => void;
}

function Cables({ cables, handleDeleteCableClick, handleJointDrag }: CablesProps) {
  const handleJointMove = (
    event: MouseEvent,
    areaRect: DOMRect,
    cableId: string,
    jointIndex: number
  ) => {
    const clampedX = Math.min(Math.max(event.clientX, areaRect.left), areaRect.right);
    const clampedY = Math.min(Math.max(event.clientY, areaRect.top), areaRect.bottom);
    handleJointDrag({ clientX: clampedX, clientY: clampedY }, cableId, jointIndex);
  };

  return (
    <div className="z-0">
      {cables.map((cable) => {
        const points = [
          cable.element1.position,
          ...(cable.joints || []),
          cable.element2.position,
        ];
        const pointsStr = points.map((p) => `${p.x},${p.y}`).join(" ");

        return (
          <svg
            key={cable.id}
            width="100%"
            height="100%"
            className="absolute top-0 left-0 pointer-events-none"
          >
            <polyline
              points={pointsStr}
              stroke="black"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <polyline
              points={pointsStr}
              stroke={CABLE_COLORS[cable.color]}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="cursor-pointer"
              style={{ pointerEvents: "visiblePainted" }}
              onContextMenu={(e) => {
                e.preventDefault();
                handleDeleteCableClick(e, cable);
              }}
            />
            {cable.joints?.map((joint, jointIndex) => (
              <circle
                key={jointIndex}
                cx={joint.x}
                cy={joint.y}
                r="5"
                fill={CABLE_COLORS[cable.color]}
                className="cursor-grab"
                style={{ pointerEvents: "all", filter: "brightness(50%)" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const draggableArea = document.querySelector(".draggable-area");
                  if (!draggableArea) return;
                  const areaRect = draggableArea.getBoundingClientRect();

                  const moveHandler = (event: MouseEvent) =>
                    handleJointMove(event, areaRect, cable.id, jointIndex);
                  const upHandler = () => {
                    document.removeEventListener("mousemove", moveHandler);
                    document.removeEventListener("mouseup", upHandler);
                  };
                  document.addEventListener("mousemove", moveHandler);
                  document.addEventListener("mouseup", upHandler);
                }}
              />
            ))}
          </svg>
        );
      })}
    </div>
  );
}

export default Cables;
