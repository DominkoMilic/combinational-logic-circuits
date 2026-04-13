interface PremadeOptionProps {
  image: string;
  title: string;
  file: string;
  handleLoadFromPC: (file: string | null) => void;
}

function PremadeOption({ image, title, file, handleLoadFromPC }: PremadeOptionProps) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-3 bg-slate-700 hover:bg-slate-600
                 rounded cursor-pointer transition-colors border border-slate-500"
      onClick={() => handleLoadFromPC(file)}
    >
      <img src={image} alt={title} className="w-24 h-24 object-contain rounded" />
      <span className="text-white text-sm text-center">{title}</span>
    </div>
  );
}

export default PremadeOption;
