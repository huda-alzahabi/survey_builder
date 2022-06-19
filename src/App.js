import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import "./App.css";
import Surveys from "./components/Surveys";
import AddSurvey from "./components/AddSurvey";

function App() {
   // Initialize State
  const [surveys, setSurveys] = useState([]);
  const [showAddSurvey, setShowAddSurvey] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const [options, setOptions] = useState([]);
  const [showAddOption, setShowAddOption] = useState(false);

  const [question_count, setQCount] = useState(1);
  const [option_count, setOCount] = useState(1);

  // Initialize all surveys into state from backend at component load
  useEffect(() => {
    const getSurveys = async () => {
      const surveysFromServer = await fetchSurveys();
      console.log(surveysFromServer);
      setSurveys(surveysFromServer);
    };
    getSurveys();
  }, []);

  //Fetch All Surveys from Backend
  const fetchSurveys = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/user/get_surveys");
      const data = await res.json();
      console.log(data.surveys);
      return data.surveys;

    } catch (err) {
      console.log(err);
    }
  };

  //Adding a Survey
  const addSurvey = async (survey) => {
    const res = await fetch("http://127.0.0.1:8000/api/v1/admin/add_survey", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(
       { survey,
        question_count:question_count,
        option_count:option_count})
    });
    const data = await res.json();
    console.log(JSON.stringify(
       { survey,
        question_count:question_count,
        option_count:option_count}));
    setSurveys([...surveys, data]);
  };


  //Fetch one survey from backend
  const fetchSurvey = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/user/get_survey?survey_id=${id}`);
    const data = await res.json();
    return data;
  };

    return(
     <BrowserRouter><div className = "container">
      <Header
      title={"Survey Builder"}
      onAddSurvey={()=>{
        setShowAddSurvey(!showAddSurvey);
      }}
      showAddSurvey={showAddSurvey}
      />
      <Routes>
          <Route
            path="/" element={
              <>
                {showAddSurvey }
                {surveys.length > 0 ? (
                  <Surveys
                    surveys={surveys}

                  />
                ) : (
                  "No Surveys To Show"
                )}
              </>}
              ></Route>
              <Route
                path="/AddSurvey"
                element={
                <AddSurvey
                onAdd={addSurvey}
                  question_count={question_count}
                  option_count={option_count}
                  onAddQuestion={(e)=>{
                  e.preventDefault();
                  setQCount(question_count + 1);
                  // console.log(question_count);
                }

              }
                  showAddQuestion={showAddQuestion}
                  onAddOption={(e)=>{
                  e.preventDefault();
                  setOCount(option_count + 1);
                  //setShowAddOption(!showAddOption);
                  console.log(option_count);
                }}
                  showAddOption={showAddOption}/>}>
              </Route>
        </Routes> </div>
      </BrowserRouter>);
}

export default App;