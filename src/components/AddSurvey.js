/*AddSurvey Component to add a new survey to the database*/

import React, { useState } from "react";
import Button from "./Button";
const template = { items: [{ question: "", options: [""] }] };
const optionsCount = { items: [{ options: [1] }] };
const AddSurvey = ({
  onAdd,
  question_count,
  option_count,
  showAddQuestion,
  showAddOption,
}) => {
  // Initialize Input State
  const [title, setTitle] = useState("");
  const [state, setState] = useState(template);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [totalCount, setTotalCount] = useState(optionsCount);

  //Add Data to Backend on Submit
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, ...state });
    setState(template);
    setTotalCount(optionsCount);
    setTitle("");
    setQuestions([]);
    setOptions([]);
  };
  const handleAddQuestion = () => {
    const newTotalCount = { ...totalCount };
    const newCount = { options: [1] };
    newTotalCount.items.push(newCount);
    setTotalCount(newTotalCount);
    const newState = { ...state };
    const newQuestion = { question: "", options: [""] };
    newState.items.push(newQuestion);
    console.log(newState);
    setState(newState);
  };
  const handleAddOption = (i) => {
    const newTotalCount = { ...totalCount };
    newTotalCount.items[i].options.push(1);
    setTotalCount(newTotalCount);
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
  };
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
          value={title}
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
      {totalCount.items.map((c, index) => {
        return (
          <div className="form-control">
            <input
              key={c}
              id={index}
              type="text"
              placeholder={"Text field"}
              value={c.question}
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
            {totalCount.items[index].options.map((c, index2) => {
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
