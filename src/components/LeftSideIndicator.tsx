interface LeftSideIndicatorProps {
  handleBulbButtonClick: (button: { value: string; id: string }) => void;
  button: { value: string; id: string };
}

function LeftSideIndicator({
  handleBulbButtonClick,
  button,
}: LeftSideIndicatorProps) {
  const isOn = button.value === "1";
  return (
    <div className="flex h-full w-full flex-col justify-center items-center gap-2">
      <div
        className="relative w-5 h-5 rounded-full border-2 border-slate-900 shrink-0 transition-colors"
        style={{ backgroundColor: isOn ? "#22c55e" : "#dc2626" }}
      >
        <div
          className="absolute top-[2px] left-[2px] w-[5px] h-[5px] rounded-full opacity-70"
          style={{ backgroundColor: isOn ? "#bbf7d0" : "#fecaca" }}
        />
      </div>
      <button
        className="bg-slate-600 border-2 border-slate-900 rounded cursor-pointer transition-all duration-150 hover:brightness-125 shrink-0 text-white font-bold text-[8px] leading-none flex items-center justify-center w-7 h-[18px]"
        onClick={() => handleBulbButtonClick(button)}
      >
        {isOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}

export default LeftSideIndicator;
