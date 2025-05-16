import React from "react";
import "../demuxm3Help/demuxm3Help";
import JKFlipFlopImage from "../../../../../../../images/JKflip-flop.png";

const JKFlipFlopHelp = () => {
  return (
    <div className="help-demuxm3-content">
      <h2>JK flip-flop</h2>
      <div className="demuxm3-help-container">
        <div className="demuxm3-grid-block">
          To ensure proper functionality of the JK flip-flop element, all input
          pins must be correctly connected:
          <br />
          <br />
          -VCC should be connected to logic level 1<br />
          <br />
          -GND should be connected to logic level 0<br />
          <br />
          -input J sets the output to 1 when 1 with a CP
          <br />
          <br />
          -input K resets the output to 0 when 1 with a CP
          <br />
          <br />
          -input CP triggers the flip-flop on a rising edge
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
            <img src={JKFlipFlopImage} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JKFlipFlopHelp;
