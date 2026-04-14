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
    <div className="flex h-full w-full flex-col justify-center items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full shrink-0 transition-colors ${
          isOn ? "bg-green-400 shadow-sm shadow-green-400/60" : "bg-red-500"
        }`}
      />
      <button
        className="w-6 h-4 bg-gray-600 hover:bg-gray-500 rounded cursor-pointer border-none transition-colors shrink-0"
        onClick={() => handleBulbButtonClick(button)}
      />
    </div>
  );
}

export default LeftSideIndicator;
