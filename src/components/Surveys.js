/*Surveys Component that includes all Surveys*/

import React from "react";
import Survey from "./Survey";

const Surveys = ({ surveys, getSurvey }) => {
  return (
    <>
      {" "}
      {surveys.map((survey) => (
        <Survey key={survey.id} survey={survey} getSurvey={getSurvey} />
      ))}{" "}
    </>
  );
};

export default Surveys;
