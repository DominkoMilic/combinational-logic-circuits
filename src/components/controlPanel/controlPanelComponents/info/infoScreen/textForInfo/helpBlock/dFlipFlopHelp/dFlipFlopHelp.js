import React from "react";
import "../demuxm3Help/demuxm3Help";
import DFlipFlopImage from "../../../../../../../images/Dflip-flop.png";

const DFlipFlopHelp = () => {
  return (
    <div className="help-demuxm3-content">
      <h2>D flip-flop</h2>
      <div className="demuxm3-help-container">
        <div className="demuxm3-grid-block">
          To ensure proper functionality of the D flip-flop element, all input
          pins must be correctly connected:
          <br />
          <br />
          -VCC should be connected to logic level 1<br />
          <br />
          -GND should be connected to logic level 0<br />
          <br />
          -input D is transferred to Q on the clock edge
          <br />
          <br />
          -input CP captures D on the rising edge
          <br />
          <br />
          -input R forces Q = 0 when 0, regardless of other inputs
        </div>
        <div className="demuxm3-grid-block">
          -input S forces Q = 1 when 0, regardless of other inputs
          <br />
          <br />
          -outputs Q and inverted Q serve as connections to other elements
          <br />
          <br />
          <div className="demux-img-container">
            <img src={DFlipFlopImage} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DFlipFlopHelp;
