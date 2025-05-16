import React from "react";
import "./demuxm3Help.css";
import DEMUXM3Image from "../../../../../../../images/DEMUXm3.png";
import DEMUXM2Image from "../../../../../../../images/DEMUXm2.png";

const Demuxm3Help = () => {
  return (
    <div className="help-demuxm3-content">
      <h2>DEMUX (m=2, m=3)</h2>
      <div className="demuxm3-help-container">
        <div className="demuxm3-grid-block">
          To ensure proper functionality of the Demux element, all input pins
          must be correctly connected:
          <br />
          <br />
          -VCC should be connected to logic level 1<br />
          <br />
          -GND should be connected to logic level 0<br />
          <br />
          -enable pins (U1-U3) must be set such that their combined AND
          operation outputs 1 to activate the demultiplexer
          <br />
          <br />
          -address inputs (A0-A2) determine the output selection, with A2 having
          the highest priority in the addressing scheme
        </div>
        <div className="demuxm3-grid-block">
          -outputs (I0–I7) are inverted and serve as connections to other
          elements
          <br />
          <br />
          <div className="demux-img-container">
            <img src={DEMUXM2Image} alt=""></img>
            <img src={DEMUXM3Image} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demuxm3Help;
