/*AddSurvey Component to add a new survey to the database*/

import React, { useState } from "react";
import Button from "./Button";
const template = { items: [{ question: "", options: [""] }] };
const AddSurvey = ({
  onAdd,
  question_count,
  option_count,
  onAddQuestion,
  showAddQuestion,
  showAddOption,
  onAddOption,
}) => {
  // Initialize Input State
  const [title, setTitle] = useState("");
  const [state, setState] = useState(template);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);

  //Add Data to Backend on Submit
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, questions, options });
    setTitle("");
    setQuestions([]);
    setOptions([]);
  };
  const handleAddQuestion = () => {
    const newState = { ...state };
    const newQuestion = { question: "", options: [""] };
    newState.items.push(newQuestion);
    console.log(newState);
    setState(newState);
  };
  const handleAddOption = (i) => {
    const newState = { ...state };
    newState.items[i].options.push("");
    setState(newState);
  };
  const handleChangeQuestion = (value, i) => {
    const newState = { ...state };
    const item = { ...newState.items[i] };
    item.question = value;
    newState.items[i] = item;
    setState(newState);
    console.log(state);
  };
  const handleChangeOption = (value, i, j) => {
    const newState = { ...state };
    const item = { ...newState.items[i] };
    item.options[j] = value;
    newState.items[i].options[j] = item.options[j];
    setState(newState);
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Survey Title</label>
        <input
          type="text"
          placeholder="Add Survey"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <Button
        color={showAddQuestion ? "red" : "purple"}
        text={showAddQuestion ? "Done" : "Add Question"}
        onClick={handleAddQuestion}
      />
      {state.items.map((c, index) => {
        return (
          <div className="form-control">
            <input
              key={c}
              id={index}
              type="text"
              placeholder={"Text field"}
              onChange={(e) => {
                handleChangeQuestion(e.target.value, index);
              }}
            />
            <br />
            <Button
              color={showAddOption ? "red" : "purple"}
              text={showAddOption ? "Done" : "Add Choice"}
              onClick={() => {
                handleAddOption(index);
              }}
            />
            {state.items[index].options.map((c, index2) => {
              return (
                <div className="form-control option-control">
                  <input
                    key={c}
                    id={index2}
                    type="text"
                    placeholder={"Text field"}
                    onChange={(e) => {
                      handleChangeOption(e.target.value, index, index2);
                    }}
                  />
                  <br />
                </div>
              );
            })}
          </div>
        );
      })}

      <input type={"submit"} value="Save Survey" className="btn btn-block" />
    </form>
  );
};
export default AddSurvey;
