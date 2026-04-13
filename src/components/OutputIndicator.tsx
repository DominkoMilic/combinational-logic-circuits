import { useEffect, useState, useRef } from "react";
import { adjustCablePositionOnScreenSizeChange } from "../utils/circuitEngine";
import type { Cable } from "../types";

interface OutputIndicatorProps {
  yVariableValues: string[];
  handleElementClick: (
    element: { id: string; value: string },
    event: React.MouseEvent,
    cableOption: number,
    inputNumber: number
  ) => void;
  onLoad: boolean;
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>;
}

function OutputIndicator({
  yVariableValues,
  handleElementClick,
  onLoad,
  setCables,
}: OutputIndicatorProps) {
  const elementRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1300);
  const [yDiv, setYDiv] = useState(
    Array.from({ length: 24 }, (_, i) => ({ value: "0", id: `Y-${i}` }))
  );

  useEffect(() => {
    setYDiv(yVariableValues.map((y, i) => ({ value: y, id: `Y-${i}` })));
  }, [yVariableValues]);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1300);
      Object.entries(elementRefs.current).forEach(([key, el]) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          adjustCablePositionOnScreenSizeChange(
            setCables, rect, { value: "0", id: key } as never, "y"
          );
        }
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [onLoad]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col h-full justify-between py-0.5">
      {yDiv.map((div) => (
        <div
          key={div.id}
          className="flex items-center gap-1 px-1 cursor-pointer select-none text-[10px] text-white font-mono"
          ref={(el) => { elementRefs.current[div.id] = el; }}
          onContextMenu={(e) => {
            e.preventDefault();
            handleElementClick(div, e, 0, 1);
          }}
          style={{ justifyContent: isSmallScreen ? "center" : undefined }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: div.value === "1" ? "green" : "red" }}
          />
          {!isSmallScreen && div.id}
        </div>
      ))}
    </div>
  );
}

export default OutputIndicator;
