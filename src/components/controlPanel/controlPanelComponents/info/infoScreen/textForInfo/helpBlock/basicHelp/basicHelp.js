import React from "react";
import "./basicHelp.css";

const BasicHelp = () => {
  return (
    <div className="help-content">
      <h2>How to use the app</h2>
      <ul>
        <li>
          <strong>Create an element:</strong> Select an item from the scrollbar
          menu and click to add it to the workspace.
        </li>
        <br />
        <li>
          <strong>Delete an element:</strong> Right-click on an element to open
          delete option.
        </li>
        <br />
        <li>
          <strong>Drag and drop:</strong> Move elements freely by holding and
          dragging them.
        </li>
        <br />
        <li>
          <strong>Add a cable:</strong> Right-click on a pin to start connecting
          elements with cables. Right click on it for editing.
        </li>
        <br />
        <li>
          <strong>Clear all:</strong> Use the{" "}
          <span className="button-name">CLEAR</span> button to remove all
          elements from the workspace.
        </li>
        <br />
        <li>
          <strong>Reset generator:</strong> Press the{" "}
          <span className="button-name">RESET</span> button to reset the
          generator.
        </li>
        <br />
        <li>
          <strong>Increment generator:</strong> Click the{" "}
          <span className="button-name">CP</span> button to increment the
          generator by binary 1.
        </li>
        <br />
        <li>
          <strong>Reset Selected Element:</strong> Click the{" "}
          <span className="button-name">RESET SELECTED ELEMET</span> button to
          clear previously selected pin.
        </li>
      </ul>
    </div>
  );
};

export default BasicHelp;
