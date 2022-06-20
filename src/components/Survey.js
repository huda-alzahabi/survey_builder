/*Survey Component To Include in the list of Surveys*/

import React, { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Survey = ({ survey, getSurvey }) => {
  const nav = useNavigate();
  return (
    <div
      className="survey"
      onClick={() => {
        getSurvey(survey.id);
        nav("/DisplaySurvey");
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
