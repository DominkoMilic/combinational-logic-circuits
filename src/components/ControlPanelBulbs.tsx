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
                className={`w-4 h-4 rounded-full transition-colors ${
                  item.value === "1"
                    ? "bg-green-400 shadow-sm shadow-green-400/60"
                    : "bg-red-500"
                }`}
              />
              <button
                className="w-5 h-5 bg-gray-600 hover:bg-gray-500 rounded cursor-pointer
                           border-none transition-colors"
                onClick={() => handleBulbButtonClick(item)}
              />
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
