interface LeftSideIndicatorProps {
  handleBulbButtonClick: (button: { value: string; id: string }) => void;
  button: { value: string; id: string };
}

function LeftSideIndicator({ handleBulbButtonClick, button }: LeftSideIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: button.value === "1" ? "green" : "red" }}
      />
      <button
        className="w-4 h-4 bg-slate-500 hover:bg-slate-400 rounded cursor-pointer border-none transition-colors"
        onClick={() => handleBulbButtonClick(button)}
      />
    </div>
  );
}

export default LeftSideIndicator;
