import React from 'react';
import Survey from './Survey';

const Surveys = ({surveys}) => {
    return ( <> {
        surveys.map((survey) => (<Survey key={survey.id} survey={survey}/>))
    } </>
  );
};

export default Surveys;