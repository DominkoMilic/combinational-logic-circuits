interface PremadeOptionProps {
  image: string;
  title: string;
  file: string;
  handleLoadFromPC: (file: string | null) => void;
}

function PremadeOption({ image, title, file, handleLoadFromPC }: PremadeOptionProps) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700
                 rounded-lg cursor-pointer transition-colors border border-gray-700 hover:border-gray-600"
      onClick={() => handleLoadFromPC(file)}
    >
      <img src={image} alt={title} className="w-24 h-24 object-contain rounded" />
      <span className="text-white text-sm text-center">{title}</span>
    </div>
  );
}

export default PremadeOption;
