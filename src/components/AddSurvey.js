/*AddSurvey Component to add a new survey to the database*/

import React, { useState } from "react";
import Button from "./Button";

const template = { items: [{ question: "", type: "", options: [""] }] };
const optionsCount = { items: [{ options: [1] }] };

const AddSurvey = ({ onAdd }) => {
  // Initialize Input State
  const [title, setTitle] = useState("");
  const [state, setState] = useState(template);
  const [totalCount, setTotalCount] = useState(optionsCount);

  //Add Data to Backend on Submit
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, ...state });
    setTotalCount(optionsCount);
  };

  // Handle button click on Add Question, increment question count
  const handleAddQuestion = () => {
    const newTotalCount = { ...totalCount };
    const newCount = { options: [1] };
    newTotalCount.items.push(newCount);
    setTotalCount(newTotalCount);
    const newState = { ...state };
    const newQuestion = { question: "", type: "", options: [""] };
    newState.items.push(newQuestion);
    setState(newState);
  };

  // Handle Change Question, set value of question according to the admin's input
  const handleChangeQuestion = (value, i) => {
    const newState = { ...state };
    const item = { ...newState.items[i] };
    item.question = value;
    newState.items[i] = item;
    setState(newState);
  };

  // Handle Change Question Type,set value of question type according to the admin's input
  const handleChangeQuestionType = (value, i) => {
    const newState = { ...state };
    const item = { ...newState.items[i] };
    item.type = value;
    newState.items[i] = item;
    setState(newState);
    console.log(newState);
  };

  // Handle button click on Add Option, increment option count
  const handleAddOption = (i) => {
    const newTotalCount = { ...totalCount };
    newTotalCount.items[i].options.push(1);
    setTotalCount(newTotalCount);
    const newState = { ...state };
    newState.items[i].options.push("");
    setState(newState);
  };

  // Handle Change Option,set value of option according to the admin's input
  const handleChangeOption = (value, i, j) => {
    const newState = { ...state };
    const items = [...newState.items];
    const item = { ...items[i] };
    item.options[j] = value;
    newState.items[i].options[j] = item.options[j];
    console.log(newState);
    setTimeout(() => {
      setState(newState);
    }, 10);
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
        color={"purple"}
        text={"Add Question"}
        onClick={handleAddQuestion}
      />
      {totalCount.items.map((c, index) => {
        return (
          <div className="form-control" key={c}>
            <input
              id={index}
              type="text"
              placeholder={"Question text"}
              value={c.question}
              onChange={(e) => {
                handleChangeQuestion(e.target.value, index);
              }}
            />
            <div
              onChange={(e) => {
                handleChangeQuestionType(e.target.value, index);
              }}
            >
              <input
                id="text"
                type="radio"
                value="Text"
                name="type"
                className="radios"
              />
              <label htmlFor="text" className="radios">
                Text
              </label>
              <input
                id="mcq"
                type="radio"
                value="MCQ"
                name="type"
                className="radios"
              />{" "}
              <label htmlFor="mcq" className="radios">
                MCQ
              </label>
              <input
                id="dropdown"
                type="radio"
                value="Dropdown"
                name="type"
                className="radios"
              />{" "}
              <label htmlFor="dropdown" className="radios">
                Dropdown
              </label>
            </div>
            <br />
            {state.items[index].type !== "Text" && (
              <>
                <Button
                  color={"purple"}
                  text={"Add Choice"}
                  onClick={() => {
                    handleAddOption(index);
                  }}
                />
                {totalCount.items[index].options.map((c, index2) => {
                  return (
                    <div className="form-control option-control">
                      <input
                        key={c}
                        id={index2}
                        type="text"
                        placeholder={"Choice field"}
                        onChange={(e) => {
                          handleChangeOption(e.target.value, index, index2);
                        }}
                      />
                      <br />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        );
      })}

      <input type={"submit"} value="Save Survey" className="btn btn-block" />
    </form>
  );
};
export default AddSurvey;
