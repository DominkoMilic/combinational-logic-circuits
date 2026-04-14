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
      Object.entries(elementRefs.current).forEach(([, el], index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (index % 2 === 0) {
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
    <div className="flex flex-col h-full">
      {xButtons.map((button, index) => (
        <div key={button.id} className={`flex items-center px-0.5 py-[2px] flex-1
                      hover:bg-gray-700 transition-colors ${index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}`}>
          <LeftSideIndicator handleBulbButtonClick={handleBulbButtonClick} button={button} />
          <div className="flex flex-col ml-auto h-full">
            <div
              className="flex-1 flex items-center text-[10px] text-gray-100 font-mono cursor-pointer select-none
                         bg-gray-700 px-2 rounded-t hover:bg-gray-600 transition-colors border border-gray-600"
              ref={(el) => { elementRefs.current[button.id] = el; }}
              onContextMenu={(e) => { e.preventDefault(); handleDivClick(button, e); }}
            >
              {button.id.split("-")[0] + button.id.split("-")[1]}
            </div>
            <div
              className="flex-1 flex items-center text-[10px] text-gray-100 font-mono cursor-pointer select-none
                         bg-gray-800 px-2 rounded-b hover:bg-gray-700 transition-colors border border-t-0 border-gray-600 overline"
              ref={(el) => { elementRefs.current[`${button.id}-NOTX`] = el; }}
              onContextMenu={(e) => { e.preventDefault(); handleNotDivClick(button, e); }}
            >
              {button.id.split("-")[0] + button.id.split("-")[1]}
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default BulbsAndButtons;
