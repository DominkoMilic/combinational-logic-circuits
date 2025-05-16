import React from "react";
import "./basicElementsHelp.css";
import NORImage from "../../../../../../../images/NOR.png";
import NANDImage from "../../../../../../../images/NAND.png";
import BUFFERImage from "../../../../../../../images/buffer.png";
import NOTImage from "../../../../../../../images/NOT.png";
import EXORImage from "../../../../../../../images/EXOR.png";
import EXNORImage from "../../../../../../../images/EXNOR.png";

const BasicElementsHelp = () => {
  return (
    <div className="help-basic-element-content">
      <h2>Basic elements</h2>
      <div className="element-display-container">
        <ul>
          <li className="element">
            BUFFER <img src={BUFFERImage} alt=""></img>
          </li>
          <li className="element">
            NOT <img src={NOTImage} alt=""></img>
          </li>
          <li className="element">
            NOR(2, 3, 4, 8 inputs) <img src={NORImage} alt=""></img>
          </li>
          <li className="element">
            NAND(2, 3, 4, 8 inputs) <img src={NANDImage} alt=""></img>
          </li>
          <li className="element">
            EXOR(2 inputs) <img src={EXORImage} alt=""></img>
          </li>
          <li className="element">
            EXNOR(2 inputs) <img src={EXNORImage} alt=""></img>
          </li>
        </ul>
      </div>
      In order for those components to work properly all input pins need to be
      conected.
    </div>
  );
};

export default BasicElementsHelp;
