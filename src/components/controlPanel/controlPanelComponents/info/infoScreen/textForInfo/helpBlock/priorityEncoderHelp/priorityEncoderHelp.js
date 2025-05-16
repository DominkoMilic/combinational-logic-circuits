import React from "react";
import "../demuxm3Help/demuxm3Help";
import PriorityEncoderImage from "../../../../../../../images/encoder.png";

const PriorityEncoderHelp = () => {
  return (
    <div className="help-demuxm3-content">
      <h2>Priority encoder</h2>
      <div className="demuxm3-help-container">
        <div className="demuxm3-grid-block">
          To ensure proper functionality of the Priority encoder element, all
          input pins must be correctly connected:
          <br />
          <br />
          -VCC should be connected to logic level 1<br />
          <br />
          -GND should be connected to logic level 0<br />
          <br />
          -enable pin (EU) must be set to 1 to activate the encoder
          <br />
          <br />
          -inputs (U0–U7) serve as data inputs
          <br />
          <br />
          -output GS returns 0 when any input is active and the encoder is
          enabled
        </div>
        <div className="demuxm3-grid-block">
          -output EI is used for cascading multiple encoders, it returns 0 when
          the encoder is enabled and no inputs are active
          <br />
          <br />
          -outputs (I0-I2) serve as connections to other elements
          <br />
          <br />
          <div className="demux-img-container">
            <img src={PriorityEncoderImage} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityEncoderHelp;
