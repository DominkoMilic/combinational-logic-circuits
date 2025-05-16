import React, { useState } from "react";
import "./helpBlock.css";
import BasicHelp from "./basicHelp/basicHelp";
import BasicElementsHelp from "./basicElementsHelp/basicElementsHelp";
import Demuxm3Help from "./demuxm3Help/demuxm3Help";
import Muxm3Help from "./muxm3Help/muxm3Help";
import PriorityEncoderHelp from "./priorityEncoderHelp/priorityEncoderHelp";
import DFlipFlopHelp from "./dFlipFlopHelp/dFlipFlopHelp";
import JKFlipFlopHelp from "./jkFlipFlopHelp/jkFlipFlopHelp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const HelpBlock = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const handlePreviousPageButtonClick = () => {
    setPageNumber((prevPage) => {
      if (prevPage > 0) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const handleNextPageButtonClick = (pages) => {
    setPageNumber((prevPage) => {
      if (prevPage < pages.length) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };

  const pages = [
    <BasicHelp />,
    <BasicElementsHelp />,
    <Demuxm3Help />,
    <Muxm3Help />,
    <DFlipFlopHelp />,
    <JKFlipFlopHelp />,
    <PriorityEncoderHelp />,
  ];

  const isFirstPage = pageNumber === 0;
  const isLastPage = pageNumber === pages.length - 1;

  return (
    <div className="main-help-block">
      {pages[pageNumber]}
      <button
        className={`next-page-button ${
          isLastPage ? "last-page" : "not-last-page"
        }`}
        onClick={() => {
          handleNextPageButtonClick(pages);
        }}
      >
        <ArrowForwardIcon />
      </button>
      <button
        className={`prev-page-button ${
          isFirstPage ? "first-page" : "not-first-page"
        }`}
        onClick={handlePreviousPageButtonClick}
      >
        <ArrowBackIcon />
      </button>
    </div>
  );
};

export default HelpBlock;
