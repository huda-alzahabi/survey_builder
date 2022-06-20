import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import "./App.css";
import Surveys from "./components/Surveys";
import AddSurvey from "./components/AddSurvey";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  // Initialize State
  const [surveys, setSurveys] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [question_count, setQCount] = useState(1);
  const [option_count, setOCount] = useState(1);

  const [questions_arr, setQuestionsArr] = useState([]);

  // Initialize all surveys into state from backend at component load
  useEffect(() => {
    const getSurveys = async () => {
      const surveysFromServer = await fetchSurveys();
      // console.log(surveysFromServer);
      setSurveys(surveysFromServer);
    };
    getSurveys();
  }, []);

  //Fetch All Surveys from Backend
  const fetchSurveys = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/user/get_surveys");
      const data = await res.json();
      //console.log(data.surveys);
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
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        survey,
      }),
    });
    const data = await res.json();
    setSurveys([...surveys, data]);
  };

  //Fetch one survey from backend
  const fetchSurvey = async (id) => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/user/get_survey?survey_id=${id}`
    );
    const data = await res.json();
    return data;
  };
  const getSurvey = async (id) => {
    const surveyToDisplay = await fetchSurvey(id);
    console.log(surveyToDisplay);
    setQuestionsArr(surveyToDisplay["questions"]);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route
            path="/AddSurvey"
            element={
              <AddSurvey
                onAdd={addSurvey}
                question_count={question_count}
                option_count={option_count}
                onAddQuestion={(e) => {
                  e.preventDefault();
                  setQCount(question_count + 1);
                }}
                onAddOption={(e) => {
                  e.preventDefault();
                  setOCount(option_count + 1);
                  console.log(option_count);
                }}
              />
            }
          ></Route>
          <Route
            path="/ViewSurveys"
            element={
              <>
                <Header title={"Survey Builder"} onAddSurvey={() => {}} />
                {surveys.length > 0 ? (
                  <Surveys surveys={surveys} getSurvey={getSurvey} />
                ) : (
                  "No Surveys To Show"
                )}
              </>
            }
          ></Route>{" "}
          <Route
            path="/DisplaySurvey"
            element={questions_arr.map((ques, c, index) => {
              return (
                <>
                  <h1 id={ques.id}>{ques.text}</h1>
                  <input
                    className="input"
                    key={c}
                    id={index}
                    type="text"
                    placeholder={"Answer"}
                    value={c.question}
                    onChange={(e) => {
                      setAnswers([...answers, e.target.value]);
                    }}
                  />
                </>
              );
            })}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
