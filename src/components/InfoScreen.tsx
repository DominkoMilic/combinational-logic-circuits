import InfoBlock from "./InfoBlock";
import HelpBlock from "./HelpBlock";

interface InfoScreenProps {
  visible: boolean;
  setIsInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isHelp: boolean;
}

function InfoScreen({ visible, setIsInfoVisible, isHelp }: InfoScreenProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
      <div className="bg-gray-900 rounded-xl w-[700px] max-w-[90vw] max-h-[80vh] overflow-y-auto relative border border-gray-700 shadow-2xl">
        <button
          className="absolute top-3 right-3 bg-rose-600 hover:bg-rose-500 text-white w-7 h-7
                     rounded-full flex items-center justify-center cursor-pointer border-none
                     transition-colors text-sm font-bold z-10"
          onClick={() => setIsInfoVisible(false)}
        >
          X
        </button>
        {isHelp ? <HelpBlock /> : <InfoBlock />}
      </div>
    </div>
  );
}

export default InfoScreen;
