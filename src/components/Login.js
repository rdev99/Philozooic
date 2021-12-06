import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginAPI } from "../apis/Auth";
import { useHistory } from "react-router-dom";
import "../css/Auth.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { setUser } = props;

  useEffect(() => {
    JSON.parse(localStorage.getItem("loggedInUser")) !== null &&
      history.push("/");
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Please fill in your credentials");
    } else {
      LoginAPI(email, password)
        .then(({ data }) => {
          localStorage.setItem("loggedInUser", JSON.stringify(data));
          setUser(data.user);
          history.push("/");
        })
        .catch((error) => {
          console.error(error.response.data);
          setErrorMessage(error.response.data);
        });
    }
  };

  return (
    <div className={"login-form"}>
      <form>
        <h1 className={"login-text"}>Login to Philozooic</h1>
        <div className={"uk-margin"}>
          <input
            className={"uk-input uk-form-width-large"}
            type={"email"}
            placeholder=" "
            name="email"
            align="center"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <label for="email" class="form_label">Email</label>
        </div>
        <div className={"uk-margin"}>
          <input
            className={"uk-input uk-form-width-large"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type={"password"}
            placeholder=" "
            name="pass"
            id="pass"
            value={password}
          />
          <label for="pass" class="form_label">Password</label>

        </div>
        <h5 className={"error-mssg"}>{errorMessage}</h5>
        <button
            className={"login-button"}
            onClick={(event) => {
              onFormSubmit(event);
            }}
          >
            Login
          </button>
          <div className={"uk-margin"}>
        </div>

        <h4 className={"signup-mssg"}>
          Don't have an account?{" "}</h4>
          <Link className={"login-button"} to="/signup">
            SignUp
          </Link>
        
        <div className={"uk-margin"}>
        </div>
      </form>
      
    </div>
  );
};

export default Login;
