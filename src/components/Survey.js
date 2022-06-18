import React, { useState } from "react";

const Survey = ({survey}) => {
  return (
	  <div
      className="task"
    ><h3>{survey.title}{" "}</h3>
	</div>
  );
};

export default Survey;