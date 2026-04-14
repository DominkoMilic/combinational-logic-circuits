import { useState, useEffect } from "react";
import { createElementDisplayNameFromId, findElementSvgKey } from "../utils/controlPanel";
import { gateSvgs } from "./GateSvgs";
import type { SelectedElement } from "../types";

interface ElementDisplayBlockProps {
  newElement1: SelectedElement | null;
}

function ElementDisplayBlock({ newElement1 }: ElementDisplayBlockProps) {
  const [elementNameDisplay, setElementNameDisplay] = useState<string | null>(null);
  const [svgKey, setSvgKey] = useState<string | null>(null);
  const [elementIODisplay, setElementIODisplay] = useState<string | null>(null);

  useEffect(() => {
    if (!newElement1) {
      setElementNameDisplay(null);
      setElementIODisplay(null);
      setSvgKey(null);
    } else {
      const name = createElementDisplayNameFromId(newElement1.id);
      setSvgKey(findElementSvgKey(name[0]));
      setElementNameDisplay(name[0]);
      setElementIODisplay(name[1]);
    }
  }, [newElement1]);

  return (
    <div className="flex items-center gap-2 h-full px-2">
      <div className="text-xs text-white">
        <p>
          <span className="font-bold">Selected element ID: </span>
          <span className={elementNameDisplay?.startsWith("!") ? "overline" : ""}>
            {elementNameDisplay?.replace(/^!/, "")}
          </span>
          <br />
          <span className="font-bold">I/O: </span>
          {elementIODisplay ? (
            <>
              {elementIODisplay.split(" ")[0]}{" "}
              <span
                className={
                  elementIODisplay.split(" ")[1]?.startsWith("!") ? "overline" : ""
                }
              >
                {elementIODisplay.split(" ")[1]?.replace(/^!/, "")}
              </span>
            </>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="h-10 w-10 shrink-0">
        {svgKey && gateSvgs[svgKey] && (() => { const Svg = gateSvgs[svgKey]; return <Svg width={40} height={40} />; })()}
      </div>
    </div>
  );
}

export default ElementDisplayBlock;
