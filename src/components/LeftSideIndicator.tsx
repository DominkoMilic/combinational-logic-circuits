interface LeftSideIndicatorProps {
  handleBulbButtonClick: (button: { value: string; id: string }) => void;
  button: { value: string; id: string };
}

function LeftSideIndicator({ handleBulbButtonClick, button }: LeftSideIndicatorProps) {
  const isOn = button.value === "1";
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={`w-3 h-3 rounded-full transition-colors ${
          isOn ? "bg-emerald-400 shadow-sm shadow-emerald-400/60" : "bg-rose-500"
        }`}
      />
      <button
        className="w-4 h-4 bg-gray-600 hover:bg-gray-500 rounded cursor-pointer border-none transition-colors"
        onClick={() => handleBulbButtonClick(button)}
      />
    </div>
  );
}

export default LeftSideIndicator;
