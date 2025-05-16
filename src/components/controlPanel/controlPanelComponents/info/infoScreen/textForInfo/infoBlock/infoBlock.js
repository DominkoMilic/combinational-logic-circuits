import React from "react";
import "./infoBlock.css";

const InfoBlock = () => {
  return (
    <div className="info-block-container">
      <h1>Welcome to Combinational Logical Circut app!</h1>
      <div className="body-text">
        This web application is part of my Bachelor's degree project at the
        Faculty of Electrical Engineering, Mechanical Engineering and Naval
        Architecture (FESB), University of Split, Croatia.
        <br /> <br />
        If you encounter any bugs, issues, or have suggestions, please don't
        hesitate to reach out. Your feedback is valuable!
        <br /> <br />
        📧 Contact me:{" "}
        <a
          href="https://mail.google.com/mail/?view=cm&to=dominkomilic@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          dominkomilic@gmail.com
        </a>
        <br />
        📄 Download my thesis: [Link to thesis PDF or Google Drive] <br />
        🌐 View my work on GitHub:{" "}
        <a
          href="https://github.com/DominkoMilic?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          DominkoMilic
        </a>
        <br />
        <br />
        Thank you for checking out my project!
      </div>
    </div>
  );
};

export default InfoBlock;
