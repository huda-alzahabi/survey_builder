/*AddSurvey Component to add a new survey to the database*/

import React, {useState} from "react";
import Button from "./Button";

const AddSurvey = ({
    onAdd,
    question_count,
    option_count,
    onAddQuestion,
    showAddQuestion,
    showAddOption,
    onAddOption
}) => {
    // Initialize Input State
    const [title,
        setTitle] = useState("");
    const [questions,
        setQuestions] = useState([]);
    const [options,
        setOptions] = useState([]);

    //Add Data to Backend on Submit
    const onSubmit = (e) => {
        e.preventDefault();
        if (!title || !questions || !options) {
            alert("Please fill all the fields!");
            return;
        }
    onAdd({title, questions, options});
    setTitle("");
    setQuestions([]);
    setOptions([]);};
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Survey Title</label>
                <input
                    type="text"
                    placeholder="Add Survey"
                    onChange={(e) => {
                    setTitle(e.target.value);
                }}/>
            </div>
            <Button
                color={showAddQuestion
                ? "red"
                : "purple"}
                text={showAddQuestion
                ? "Done"
                : "Add Question"}
                onClick={onAddQuestion}/> {Array
                .from(Array(question_count))
                .map((c, index) => {
                    return (
                        <div className="form-control">
                            <input
                                key={c}
                                id
                                ={index}
                                type="text"
                                placeholder={"Text field"}
                                onChange={(e) => {
                                setQuestions([
                                    ...questions,
                                      e.target.value
                                ]);
                            }}/>
                            <br/>
                        </div >
                    );
                })}
            <Button
                color={showAddOption
                ? "red"
                : "purple"}
                text={showAddOption
                ? "Done"
                : "Add Choice"}
                onClick={onAddOption}/>{Array
                .from(Array(option_count))
                .map((c, index) => {
                    return (
                        <div className="form-control">
                            <input
                                key={c}
                                id
                                ={index}
                                type="text"
                                placeholder={"Text field"}
                                onChange={(e) => {
                                setOptions([
                                    ...options,
                                    e.target.value
                                ]);
                            }}/>
                            <br/>
                        </div >
                    );
                })}
            <input type={"submit"} value="Save Survey" className="btn btn-block"/>
        </form>
    );
};
export default AddSurvey;