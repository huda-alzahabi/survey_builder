/*Survey Component To Include in the list of Surveys*/

import React, { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const Survey = ({ survey, getSurvey }) => {
  return (
    <div
      className="survey"
      onClick={() => {
        getSurvey(survey.id);
      }}
    >
      <h3>
        {" "}
        {survey.title} <FaArrowCircleRight />
      </h3>
    </div>
  );
};

export default Survey;
