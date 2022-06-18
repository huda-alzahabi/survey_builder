import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import "./App.css";
import Surveys from "./components/Surveys";

function App() {
   // Initialize State
  const [surveys, setSurveys] = useState([]);
  const [showAddSurvey, setShowAddSurvey] = useState(false);


  // Initialize all surveys into state from backend at component load
  useEffect(() => {
    const getSurveys = async () => {
      const surveysFromServer = await fetchSurveys();
      console.log(surveysFromServer);
      setSurveys(surveysFromServer);
      console.log(surveys);
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
        </Routes> </div>
      </BrowserRouter>);
}

export default App;