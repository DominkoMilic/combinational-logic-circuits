const COLORS = [
  "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231",
  "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe",
  "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000",
  "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff",
];

interface ColorWheelProps {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

function ColorWheel({ selectedColor, setSelectedColor }: ColorWheelProps) {
  return (
    <div className="flex flex-wrap gap-1 p-2 max-w-[180px]">
      {COLORS.map((color) => (
        <div
          key={color}
          className={`w-5 h-5 rounded-full cursor-pointer border-2 transition-transform
                      ${color === selectedColor ? "border-white scale-125" : "border-transparent"}`}
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  );
}

export default ColorWheel;
