import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Auth.css";
import { SignUpAPI } from "../apis/Auth";
import { useHistory } from "react-router-dom";
import DoctorRegistrationForm from "./DoctorRegistration";
import CaretakerRegistrationForm from "./CaretakerRegistration";
import NGORegistrationForm from "./NGORegistration";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formType, setFormType] = useState("User");
  const [picturePath, setPicturePath] = useState("pp-default.jpg");
  const history = useHistory();

  const { user, setUser } = props;

  useEffect(() => {
    if (user !== null) {
      if (user.userType === "User" || user?.targetUserId !== null) {
        history.push("/");
      } else {
        user && setFormType(user.userType);
      }
    }
  }, [user, history]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      name === "" ||
      password === "" ||
      confirmPassword === "" ||
      phoneNumber === "" ||
      userType === "" ||
      gender === ""
    ) {
      setErrorMessage("Please fill up all mandatory fields");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else {
      let userToAdd = {
        email,
        name,
        password,
        confirmPassword,
        phoneNumber,
        userType,
        gender,
        picturePath,
      };
      await SignUpAPI(userToAdd)
        .then(({ data }) => {
          localStorage.setItem("loggedInUser", JSON.stringify(data));
          setUser(data.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderImageGrid = () => {
    let array = [];
    for (let i = 0; i < 50; i++) {
      array.push(
        <img
          key={i}
          src={`/pp-${i + 1}.jpg`}
          alt={"PP"}
          className={
            picturePath === `pp-${i + 1}.jpg`
              ? "uk-border-circle photo-selected"
              : "uk-border-circle"
          }
          onClick={(e) => setPicturePath(`pp-${i + 1}.jpg`)}
        />
      );
    }
    return array;
  };

  const renderForm = () => {
    switch (formType) {
      case "Doctor":
        return (
          <DoctorRegistrationForm
            user={user}
            setUser={setUser}
            setFormType={setFormType}
          />
        );

      case "Caretaker":
        return (
          <CaretakerRegistrationForm
            user={user}
            setUser={setUser}
            setFormType={setFormType}
          />
        );

      case "NGO":
        return (
          <NGORegistrationForm
            user={user}
            setUser={setUser}
            setFormType={setFormType}
          />
        );

      default:
        return (
          <>
                <div className={"login-s-form"}>
                  <form>
                  <h1 className={"login-text"}>Sign Up on Philozooic</h1>
                    <div className={"uk-margin"}>
                      <input
                        className={"uk-input uk-form-width-large"}
                        type={"text"}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder=" "
                        name="name"
                        id="name"
                      />
                                <label for="name" class="form_label">Name</label>
                    </div>
                    <div className={"uk-margin"}>
                      <input
                        className={"uk-input uk-form-width-large"}
                        type={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder=" "
                        name="emails"
                        id="emails"
                      />
                                <label for="emails" class="form_label">Email</label>
                    </div>
                    <div className={"uk-margin"}>
                      <input
                        className={"uk-input uk-form-width-large"}
                        type={"password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder=" "
                        name="passs"
                        id="passs"
                      />
                                <label for="passs" class="form_label">Password</label>
                    </div>
                    <div className={"uk-margin"}>
                      <input
                        className={"uk-input uk-form-width-large"}
                        type={"password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder=" "
                        name="repass"
                        id="repass"
                      />
                                <label for="repass" class="form_label">Re-enter Password</label>
                    </div>
                    <div className={"uk-margin"}>
                      <input
                        className={"uk-input uk-form-width-large"}
                        type={"number"}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        placeholder=" "
                        name="phonen"
                        id="phonen"
                      />
                                <label for="phonen" class="form_label">Phone number</label>
                    </div>
                    <h4 className={"radio-select"}>
                      Choose your Profile Type:
                    </h4>
                    <div
                      className={
                        "uk-margin uk-grid-small uk-child-width-auto uk-grid radio-section"
                      }
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <label>
                        <input
                          type={"radio"}
                          value={"Doctor"}
                          name={"userType"}
                        />
                        Doctor
                      </label>
                      <label>
                        <input
                          type={"radio"}
                          value={"Caretaker"}
                          name={"userType"}
                        />
                        Caretaker
                      </label>
                      <label>
                        <input type={"radio"} value={"NGO"} name={"userType"} />
                        NGO
                      </label>
                      <label>
                        <input
                          type={"radio"}
                          value={"User"}
                          name={"userType"}
                        />
                        User
                      </label>
                    </div>
                    <h4 className={"radio-select"}>Choose Your Gender:</h4>
                    <div
                      className={
                        "uk-margin uk-grid-small uk-child-width-auto uk-grid radio-section"
                      }
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <label>
                        <input type={"radio"} value={"Male"} name={"gender"} />
                        Male
                      </label>
                      <label>
                        <input
                          type={"radio"}
                          value={"Female"}
                          name={"gender"}
                        />
                        Female
                      </label>
                    </div>
                    <h5 className={"error-mssg"}>{errorMessage}</h5>
                    <button
                          className={"login-button"}
                          onClick={(e) => handleClick(e)}
                        >
                          {userType === "" || userType === "User"
                            ? "SignUp"
                            : "Next"}
                        </button>
                        <div className={"uk-margin"}>
                      </div>
                    <div className={"desktop-signup-section"}>
                      <h4 className={"signup-mssg"}>
                        Already have an account?{" "}<br></br>                      </h4>
                        <Link className={"login-button"} to="/login">
                          Login
                        </Link>
                    
                      <div className={"uk-margin"}>
                      </div>
                    </div>
                  </form>
                </div>
          </>
        );
    }
  };

  return renderForm();
};

export default SignUp;
