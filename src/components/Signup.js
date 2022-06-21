import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Signup = () => {
  const nav = useNavigate();
  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  // Handling the password_confirmation change
  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      password_confirmation === ""
    ) {
      setError(true);
    } else {
      addUser();
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setSubmitted(true);
      setError(false);
    }
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  //Sending the user to the users table in the db
  const addUser = async () => {
    let _data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };

    const response = await fetch("http://127.0.0.1:8000/api/v1/register", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    });
    const result = await response.json();
    localStorage.setItem("user_id", result["user"].id);
    nav("/ViewSurveys");
  };

  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>

      <div className="messages">{errorMessage()}</div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          placeholder={"Full Name"}
          type="text"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          placeholder={"Email"}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          placeholder={"Password"}
          type="password"
        />
        <label className="label">Confirm Password</label>
        <input
          onChange={handlePasswordConfirmation}
          className="input"
          value={password_confirmation}
          placeholder={"Confirm Password"}
          type="password"
        />

        <Button color={"purple"} text={"Signup"} onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default Signup;
