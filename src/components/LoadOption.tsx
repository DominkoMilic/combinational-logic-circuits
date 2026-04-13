import PremadeOption from "./PremadeOption";
import { loadFile } from "../utils/saveAndLoad";
import { premadeCircuits } from "../utils/premadeCircuits";
import type { Cable, SetFunctions } from "../types";

interface LoadOptionProps {
  setLoadOptionVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setCables: React.Dispatch<React.SetStateAction<Cable[]>>;
  setFunctions: SetFunctions;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setOnLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoadOption({
  setLoadOptionVisibility,
  setCables,
  setFunctions,
  setMenuVisible,
  setDeleteVisible,
  setOnLoad,
}: LoadOptionProps) {
  const handleLoadFromPC = async (file: string | null) => {
    try {
      await loadFile(setCables, setFunctions, setMenuVisible, setDeleteVisible, file);
    } catch (error) {
      console.error("Error loading file:", error);
      alert("An error occurred while loading the file. Please try again.");
    }
    setOnLoad((prev) => !prev);
    setLoadOptionVisibility(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
      <div className="bg-slate-800 rounded-lg p-6 max-w-3xl w-full mx-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {premadeCircuits.map((circuit, index) => (
            <PremadeOption
              key={index}
              image={circuit.image}
              title={circuit.title}
              file={circuit.file}
              handleLoadFromPC={handleLoadFromPC}
            />
          ))}
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => handleLoadFromPC(null)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded
                       cursor-pointer border-none transition-colors"
          >
            UPLOAD FILE
          </button>
          <button
            onClick={() => setLoadOptionVisibility(false)}
            className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded
                       cursor-pointer border-none transition-colors"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoadOption;
