import { useState } from "react";

import bufferImage from "./images/buffer.png";
import NOTImage from "./images/NOT.png";
import NORImage from "./images/NOR.png";
import NANDImage from "./images/NAND.png";
import EXORImage from "./images/EXOR.png";
import EXNORImage from "./images/EXNOR.png";
import DEMUXm2Image from "./images/DEMUXm2.png";
import DEMUXm3Image from "./images/DEMUXm3.png";
import MUXm1Image from "./images/MUXm1.png";
import MUXm2Image from "./images/MUXm2.png";
import MUXm3Image from "./images/MUXm3.png";
import DFlipFlopImage from "./images/Dflip-flop.png";
import JKFlipFlopImage from "./images/JKflip-flop.png";
import encoderImage from "./images/encoder.png";

const helpPages = [
  // Page 1: Basic Help
  () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-3">How to use the app</h2>
      <ul className="text-gray-200 space-y-3 list-disc pl-5">
        <li><strong>Create an element:</strong> Select an item from the scrollbar menu and click to add it to the workspace.</li>
        <li><strong>Delete an element:</strong> Right-click on an element to open delete option.</li>
        <li><strong>Drag and drop:</strong> Move elements freely by holding and dragging them.</li>
        <li><strong>Add a cable:</strong> Right-click on a pin to start connecting elements with cables. Right click on it for editing.</li>
        <li><strong>Clear all:</strong> Use the <span className="bg-slate-600 px-1 rounded text-sm">CLEAR</span> button to remove all elements from the workspace.</li>
        <li><strong>Reset generator:</strong> Press the <span className="bg-slate-600 px-1 rounded text-sm">RESET</span> button to reset the generator.</li>
        <li><strong>Increment generator:</strong> Click the <span className="bg-slate-600 px-1 rounded text-sm">CP</span> button to increment the generator by binary 1.</li>
        <li><strong>Reset Selected Element:</strong> Click the <span className="bg-slate-600 px-1 rounded text-sm">RESET SELECTED ELEMENT</span> button to clear previously selected pin.</li>
      </ul>
    </div>
  ),

  // Page 2: Basic Elements
  () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-3">Basic elements</h2>
      <ul className="text-gray-200 space-y-2">
        {[
          ["BUFFER", bufferImage],
          ["NOT", NOTImage],
          ["NOR(2, 3, 4, 8 inputs)", NORImage],
          ["NAND(2, 3, 4, 8 inputs)", NANDImage],
          ["EXOR(2 inputs)", EXORImage],
          ["EXNOR(2 inputs)", EXNORImage],
        ].map(([label, img]) => (
          <li key={label as string} className="flex items-center gap-3">
            {label} <img src={img as string} alt="" className="w-10 h-10 object-contain" />
          </li>
        ))}
      </ul>
      <p className="text-gray-300 mt-3">
        In order for those components to work properly all input pins need to be connected.
      </p>
    </div>
  ),

  // Page 3: DEMUX
  () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-3">DEMUX (m=2, m=3)</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-200">
        <div className="space-y-2">
          <p>To ensure proper functionality of the Demux element, all input pins must be correctly connected:</p>
          <p>-VCC should be connected to logic level 1</p>
          <p>-GND should be connected to logic level 0</p>
          <p>-enable pins (U1-U3) must be set such that their combined AND operation outputs 1</p>
          <p>-address inputs (A0-A2) determine the output selection</p>
        </div>
        <div className="space-y-2">
          <p>-outputs (I0-I7) are inverted and serve as connections to other elements</p>
          <div className="flex gap-3 mt-3">
            <img src={DEMUXm2Image} alt="DEMUX m=2" className="w-20 h-20 object-contain" />
            <img src={DEMUXm3Image} alt="DEMUX m=3" className="w-20 h-20 object-contain" />
          </div>
        </div>
      </div>
    </div>
  ),

  // Page 4: MUX
  () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-3">MUX (m=1, m=2, m=3)</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-200">
        <div className="space-y-2">
          <p>To ensure proper functionality of the Mux element, all input pins must be correctly connected:</p>
          <p>-VCC should be connected to logic level 1</p>
          <p>-GND should be connected to logic level 0</p>
          <p>-enable pin (E) must be set to 1 to activate the multiplexer</p>
          <p>-address inputs (A0-A2) determine the output selection</p>
        </div>
        <div className="space-y-2">
          <p>-inputs (U0-U7) serve as data inputs</p>
          <p>-output I and inverted I serve as connections to other elements</p>
          <div className="flex gap-2 mt-3">
            <img src={MUXm1Image} alt="MUX m=1" className="w-16 h-16 object-contain" />
            <img src={MUXm2Image} alt="MUX m=2" className="w-16 h-16 object-contain" />
            <img src={MUXm3Image} alt="MUX m=3" className="w-16 h-16 object-contain" />
          </div>
        </div>
      </div>
    </div>
  ),

  // Page 5: D Flip-Flop
  () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-3">D flip-flop</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-200">
        <div className="space-y-2">
          <p>To ensure proper functionality of the D flip-flop element:</p>
          <p>-VCC should be connected to logic level 1</p>
          <p>-GND should be connected to logic level 0</p>
          <p>-input D is transferred to Q on the clock edge</p>
          <p>-input CP captures D on the rising edge</p>
          <p>-input R forces Q = 0 when 0</p>
        </div>
        <div className="space-y-2">
          <p>-input S forces Q = 1 when 0</p>
          <p>-outputs Q and inverted Q serve as connections to other elements</p>
          <div className="flex justify-center mt-3">
            <img src={DFlipFlopImage} alt="D Flip-Flop" className="w-24 h-24 object-contain" />
          </div>
        </div>
      </div>
    </div>
  ),

  // Page 6: JK Flip-Flop
  () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-3">JK flip-flop</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-200">
        <div className="space-y-2">
          <p>To ensure proper functionality of the JK flip-flop element:</p>
          <p>-VCC should be connected to logic level 1</p>
          <p>-GND should be connected to logic level 0</p>
          <p>-input J sets the output to 1 when 1 with a CP</p>
          <p>-input K resets the output to 0 when 1 with a CP</p>
          <p>-input CP triggers the flip-flop on a rising edge</p>
          <p>-input R forces Q = 0 when 0</p>
        </div>
        <div className="space-y-2">
          <p>-input S forces Q = 1 when 0</p>
          <p>-outputs Q and inverted Q serve as connections to other elements</p>
          <div className="flex justify-center mt-3">
            <img src={JKFlipFlopImage} alt="JK Flip-Flop" className="w-24 h-24 object-contain" />
          </div>
        </div>
      </div>
    </div>
  ),

  // Page 7: Priority Encoder
  () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-3">Priority encoder</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-200">
        <div className="space-y-2">
          <p>To ensure proper functionality of the Priority encoder element:</p>
          <p>-VCC should be connected to logic level 1</p>
          <p>-GND should be connected to logic level 0</p>
          <p>-enable pin (EU) must be set to 1 to activate the encoder</p>
          <p>-inputs (U0-U7) serve as data inputs</p>
          <p>-output GS returns 0 when any input is active and the encoder is enabled</p>
        </div>
        <div className="space-y-2">
          <p>-output EI is used for cascading multiple encoders</p>
          <p>-outputs (I0-I2) serve as connections to other elements</p>
          <div className="flex justify-center mt-3">
            <img src={encoderImage} alt="Priority Encoder" className="w-24 h-24 object-contain" />
          </div>
        </div>
      </div>
    </div>
  ),
];

function HelpBlock() {
  const [pageNumber, setPageNumber] = useState(0);

  const isFirstPage = pageNumber === 0;
  const isLastPage = pageNumber === helpPages.length - 1;
  const Page = helpPages[pageNumber];

  return (
    <div className="relative h-full">
      <Page />

      {/* Navigation buttons */}
      {!isLastPage && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-600 hover:bg-slate-500
                     text-white w-8 h-8 rounded-full flex items-center justify-center
                     cursor-pointer border-none transition-colors text-lg"
          onClick={() => setPageNumber((p) => Math.min(p + 1, helpPages.length - 1))}
        >
          &gt;
        </button>
      )}
      {!isFirstPage && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-600 hover:bg-slate-500
                     text-white w-8 h-8 rounded-full flex items-center justify-center
                     cursor-pointer border-none transition-colors text-lg"
          onClick={() => setPageNumber((p) => Math.max(p - 1, 0))}
        >
          &lt;
        </button>
      )}
    </div>
  );
}

export default HelpBlock;
