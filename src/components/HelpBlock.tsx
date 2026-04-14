import React, { useState } from "react";
import { gateSvgs } from "./GateSvgs";

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
          ["BUFFER", "buffer"],
          ["NOT", "NOT"],
          ["NOR(2, 3, 4, 8 inputs)", "NOR2Inputs"],
          ["NAND(2, 3, 4, 8 inputs)", "NAND2Inputs"],
          ["EXOR(2 inputs)", "EXOR"],
          ["EXNOR(2 inputs)", "EXNOR"],
        ].map(([label, key]) => {
          const Svg = gateSvgs[key];
          return (
            <li key={label} className="flex items-center gap-3">
              {label} {Svg && <Svg width={40} height={40} />}
            </li>
          );
        })}
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
            {React.createElement(gateSvgs.DEMUXm2, { width: 80, height: 80 })}
            {React.createElement(gateSvgs.DEMUXm3, { width: 80, height: 80 })}
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
            {React.createElement(gateSvgs.MUXm1, { width: 64, height: 64 })}
            {React.createElement(gateSvgs.MUXm2, { width: 64, height: 64 })}
            {React.createElement(gateSvgs.MUXm3, { width: 64, height: 64 })}
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
            {React.createElement(gateSvgs.DFlipFlop, { width: 96, height: 96 })}
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
            {React.createElement(gateSvgs.JKFlipFlop, { width: 96, height: 96 })}
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
            {React.createElement(gateSvgs.encoder, { width: 96, height: 96 })}
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
