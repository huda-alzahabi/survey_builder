import React, { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const Survey = ({ survey }) => {
    return ( <div className = "task" >
              <h3 > { survey.title } <FaArrowCircleRight/></h3>
              </div>
            );
};

export default Survey;