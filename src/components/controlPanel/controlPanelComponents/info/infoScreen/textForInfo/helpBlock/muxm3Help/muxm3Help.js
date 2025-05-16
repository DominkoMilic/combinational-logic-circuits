import React from "react";
import "../demuxm3Help/demuxm3Help";
import MUXM3Image from "../../../../../../../images/MUXm3.png";
import MUXM2Image from "../../../../../../../images/MUXm2.png";
import MUXM1Image from "../../../../../../../images/MUXm1.png";

const Muxm3Help = () => {
  return (
    <div className="help-demuxm3-content">
      <h2>MUX (m=1, m=2, m=3)</h2>
      <div className="demuxm3-help-container">
        <div className="demuxm3-grid-block">
          To ensure proper functionality of the Mux element, all input pins must
          be correctly connected:
          <br />
          <br />
          -VCC should be connected to logic level 1<br />
          <br />
          -GND should be connected to logic level 0<br />
          <br />
          -enable pin (E) must be set to 1 to activate the multiplexer
          <br />
          <br />
          -address inputs (A0-A2) determine the output selection, with A2 having
          the highest priority in the addressing scheme
        </div>
        <div className="demuxm3-grid-block">
          -inputs (U0–U7) serve as data inputs
          <br />
          <br />
          -output I and inverted I serve as connections to other elements
          <br />
          <br />
          <div className="mux-img-container">
            <img src={MUXM1Image} alt=""></img>
            <img src={MUXM2Image} alt=""></img>
            <img src={MUXM3Image} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Muxm3Help;
