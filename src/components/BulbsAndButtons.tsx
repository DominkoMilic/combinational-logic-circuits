import { useState, useEffect, useRef } from "react";
import LeftSideIndicator from "./LeftSideIndicator";
import { adjustCablePositionOnScreenSizeChange } from "../utils/circuitEngine";
import type { Cable } from "../types";

interface BulbsAndButtonsProps {
  setXVariableValues: React.Dispatch<React.SetStateAction<string[]>>;
  xVariableValues: string[];
  handleElementClick: (
    element: { id: string; value: string },
    event: React.MouseEvent,
    cableOption: number,
    inputNumber: number
  ) => void;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>;
  onLoad: boolean;
}

function BulbsAndButtons({
  setXVariableValues,
  xVariableValues,
  handleElementClick,
  setMenuVisible,
  setCables,
  onLoad,
}: BulbsAndButtonsProps) {
  const elementRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [xButtons, setXButtons] = useState(
    Array.from({ length: 8 }, (_, i) => ({ value: xVariableValues[i], id: `X-${i}` }))
  );

  const constantX = [
    { value: "0", id: "X-8-constant" },
    { value: "1", id: "X-9-constant" },
  ];

  useEffect(() => {
    setXButtons(
      Array.from({ length: 8 }, (_, i) => ({
        value: xVariableValues?.[i] ?? "0",
        id: `X-${i}`,
      }))
    );
  }, [xVariableValues]);

  const handleBulbButtonClick = (button: { value: string; id: string }) => {
    setMenuVisible(false);
    const buttonIndex = parseInt(button.id.split("-")[1]);
    const newValue = button.value === "1" ? "0" : "1";

    setXButtons((prev) => {
      const updated = [...prev];
      updated[buttonIndex] = { ...updated[buttonIndex], value: newValue };
      return updated;
    });

    setXVariableValues((prev) => {
      const updated = [...prev];
      updated[buttonIndex] = newValue;
      return updated;
    });
  };

  const handleDivClick = (button: { id: string; value: string }, e: React.MouseEvent) => {
    handleElementClick(button, e, 1, 0);
  };

  const handleNotDivClick = (button: { id: string; value: string }, e: React.MouseEvent) => {
    handleElementClick({ id: button.id + "-NOTX", value: button.value }, e, 1, 0);
  };

  useEffect(() => {
    function handleResize() {
      Object.entries(elementRefs.current).forEach(([key, el], index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (key === "X-8-constant") {
          adjustCablePositionOnScreenSizeChange(setCables, rect, { value: "0", id: "X-8-constant" } as never, "x");
        } else if (key === "X-9-constant") {
          adjustCablePositionOnScreenSizeChange(setCables, rect, { value: "1", id: "X-9-constant" } as never, "x");
        } else if (index % 2 === 0) {
          const btnIdx = index / 2;
          if (xButtons[btnIdx]) {
            adjustCablePositionOnScreenSizeChange(
              setCables, rect,
              { value: xButtons[btnIdx].value, id: xButtons[btnIdx].id } as never, "x"
            );
          }
        } else {
          const btnIdx = (index - 1) / 2;
          if (xButtons[btnIdx]) {
            adjustCablePositionOnScreenSizeChange(
              setCables, rect,
              { value: xButtons[btnIdx].value === "0" ? "1" : "0", id: xButtons[btnIdx].id + "-NOTX" } as never, "x"
            );
          }
        }
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [onLoad]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col justify-between h-full py-1">
      {xButtons.map((button) => (
        <div key={button.id} className="flex items-center gap-1 px-0.5">
          <LeftSideIndicator handleBulbButtonClick={handleBulbButtonClick} button={button} />
          <div className="flex flex-col gap-0.5">
            <div
              className="text-[10px] text-white font-mono cursor-pointer select-none
                         bg-slate-600 px-1 rounded hover:bg-slate-500 transition-colors"
              ref={(el) => { elementRefs.current[button.id] = el; }}
              onContextMenu={(e) => { e.preventDefault(); handleDivClick(button, e); }}
            >
              {button.id.split("-")[0] + button.id.split("-")[1]}
            </div>
            <div
              className="text-[10px] text-white font-mono cursor-pointer select-none
                         bg-slate-700 px-1 rounded hover:bg-slate-600 transition-colors overline"
              ref={(el) => { elementRefs.current[`${button.id}-NOTX`] = el; }}
              onContextMenu={(e) => { e.preventDefault(); handleNotDivClick(button, e); }}
            >
              {button.id.split("-")[0] + button.id.split("-")[1]}
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-1 px-1 mt-1">
        <div
          className="text-[10px] text-white font-mono cursor-pointer select-none
                     bg-red-800 px-1.5 py-0.5 rounded hover:bg-red-700 transition-colors"
          ref={(el) => { elementRefs.current["X-8-constant"] = el; }}
          onContextMenu={(e) => { e.preventDefault(); handleDivClick(constantX[0], e); }}
        >
          0
        </div>
        <div
          className="text-[10px] text-white font-mono cursor-pointer select-none
                     bg-green-800 px-1.5 py-0.5 rounded hover:bg-green-700 transition-colors"
          ref={(el) => { elementRefs.current["X-9-constant"] = el; }}
          onContextMenu={(e) => { e.preventDefault(); handleDivClick(constantX[1], e); }}
        >
          1
        </div>
      </div>
    </div>
  );
}

export default BulbsAndButtons;
