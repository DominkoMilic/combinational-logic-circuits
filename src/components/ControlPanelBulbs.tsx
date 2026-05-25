import { useState, useEffect } from "react";

interface ControlPanelBulbsProps {
  setXVariableValues: React.Dispatch<React.SetStateAction<string[]>>;
  xVariableValues: string[];
}

function ControlPanelBulbs({
  setXVariableValues,
  xVariableValues,
}: ControlPanelBulbsProps) {
  const [xButtons, setXButtons] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      value: xVariableValues[i],
      id: `X-${i}`,
    })),
  );

  useEffect(() => {
    setXButtons(
      Array.from({ length: 8 }, (_, i) => ({
        value: xVariableValues?.[i] ?? "0",
        id: `X-${i}`,
      })),
    );
  }, [xVariableValues]);

  const handleBulbButtonClick = (button: { value: string; id: string }) => {
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

  return (
    <div className="flex items-center h-full px-2">
      <div className="flex gap-2">
        {xButtons
          .slice()
          .reverse()
          .map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-1">
              <div
                className="relative w-4 h-4 rounded-full border-2 border-slate-900 transition-colors"
                style={{
                  backgroundColor: item.value === "1" ? "#22c55e" : "#dc2626",
                }}
              >
                <div
                  className="absolute top-[1px] left-[1px] w-[4px] h-[4px] rounded-full opacity-70"
                  style={{
                    backgroundColor: item.value === "1" ? "#bbf7d0" : "#fecaca",
                  }}
                />
              </div>
              <button
                className="bg-slate-600 border-2 border-slate-900 rounded cursor-pointer transition-all duration-150 hover:brightness-125 text-white font-bold text-[8px] leading-none flex items-center justify-center w-7 h-5"
                onClick={() => handleBulbButtonClick(item)}
              >
                {item.value === "1" ? "ON" : "OFF"}
              </button>
              <span className="text-[10px] text-white font-mono">
                {"X" + item.id.split("-")[1]}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ControlPanelBulbs;
