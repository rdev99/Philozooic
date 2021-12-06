import React, { useState } from "react";
import { useHistory } from "react-router";
import { AddNGOAPI } from "../apis/NGO";
import { UpdateUserById } from "../apis/User";

const NGORegistrationForm = (props) => {
  const { user, setUser, setFormType } = props;

  let userName = user === null ? "" : user.name;
  let userPhone = user === null ? "" : user.phoneNumber;

  const [name, setName] = useState(userName);
  const [phoneNumber, setPhoneNumber] = useState(userPhone);
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [picturePath, setPicturePath] = useState("");

  const history = useHistory();

  let cityArray = [
    "New Delhi",
    "Kolkata",
    "Bengaluru",
    "Pune",
    "Mumbai",
    "Chennai",
    "Hyderabad",
    "Indore",
    "Patna",
    "Ranchi",
    "Lucknow",
    "Prayagraj",
    "Ahmedabad",
    "Agra",
    "Kanpur",
    "Jamshedpur",
    "Srinagar",
    "Gandhinagar",
    "Thiruvananthapuram",
  ];

  const handleSubmitClick = async (e) => {
    if (
      name === "" ||
      phoneNumber === "" ||
      location === "" ||
      address === "" ||
      about === "" ||
      upiId === "" ||
      bankIFSC === "" ||
      accountNumber === "" ||
      picturePath === ""
    ) {
      setErrorMessage("Please fill all required fields.");
    }
    e.preventDefault();
    let ngo = {
      name,
      phoneNumber,
      about,
      location,
      address,
      upiId,
      bankIFSC,
      accountNumber,
      picturePath,
    };
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    await AddNGOAPI(ngo)
      .then(async ({ data: createdNGO }) => {
        loggedInUser = { ...loggedInUser, targetUser: createdNGO };
        await UpdateUserById(
          user.userId,
          {
            ...user,
            targetUser: "Caretaker",
            targetUserId: createdNGO.ngoId,
          },
          loggedInUser.token
        )
          .then(({ data: updatedUser }) => {
            loggedInUser = { ...loggedInUser, user: updatedUser };
            setUser(updatedUser);
          })
          .catch((error) => {
            console.error("Could not update user!", error);
          });
      })
      .catch((error) => {
        console.error("Could not create caretaker", error);
      });
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    history.push("/");
  };

  const renderNGOImages = () => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(
        <div key={i}>
          <img
            src={`/ngo-${i + 1}.jpg`}
            alt={"NGO"}
            className={
              picturePath === `ngo-${i + 1}.jpg`
                ? "type-image selected"
                : "type-image"
            }
            onClick={(e) => setPicturePath(`ngo-${i + 1}.jpg`)}
          />
        </div>
      );
    }
    return array;
  };

  const renderCityOptions = () => {
    let array = [
      <option key={-1} value={""}>
        Select your location
      </option>,
    ];
    for (let i = 0; i < cityArray.length; i++) {
      array.push(
        <option key={i} value={cityArray[i]}>
          {cityArray[i]}
        </option>
      );
    }
    return array;
  };

  return (
    <>
      <div className={"login-form"}>
        <h1 className={"login-text"}>Animals love your contribution.</h1>
        <h4 className={"radio-select"}>
          Please provide your additional details:
        </h4>
        <div className={"uk-margin"}>
          <input
            className={"uk-input uk-form-width-large"}
            type={"text"}
            placeholder={"Enter NGO Name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={"uk-margin"}>
          <input
            className={"uk-input uk-form-width-large"}
            type={"number"}
            placeholder={"Enter NGO Number"}
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>
        <div className={"uk-margin"}>
          <textarea
            className={"uk-textarea uk-form-width-large"}
            rows={"5"}
            placeholder={"Tell us something about yourself"}
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
        </div>
        <div className={"uk-margin"}>
          <textarea
            className={"uk-textarea uk-form-width-large"}
            rows={"3"}
            placeholder={"Enter your NGO Address"}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className={"uk-margin"}>
          <select
            className={"uk-select uk-form-width-large"}
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            {renderCityOptions()}
          </select>
        </div>
        <h4 className={"radio-select"}>Donation details:</h4>
        <div className={"uk-margin"}>
          <input
            className={"uk-input uk-form-width-large"}
            type={"number"}
            placeholder={"Enter NGO Account Number"}
            onChange={(e) => setAccountNumber(e.target.value)}
            value={accountNumber}
          />
        </div>
        <div className={"uk-margin"}>
          <input
            className={"uk-input uk-form-width-large"}
            type={"text"}
            placeholder={"Enter NGO Account IFSC"}
            onChange={(e) => setBankIFSC(e.target.value)}
            value={bankIFSC}
          />
        </div>
        <div className={"uk-margin"}>
          <input
            className={"uk-input uk-form-width-large"}
            type={"text"}
            placeholder={"Enter NGO UPI ID"}
            onChange={(e) => setUpiId(e.target.value)}
            value={upiId}
          />
        </div>
        <div>
          <h4 className={"radio-select"}>Choose your Image:</h4>
          <div
            className={"uk-grid-match uk-child-width-expand@s uk-text-center"}
            uk-grid={""}
          >
            {renderNGOImages()}
          </div>
        </div>
        <h4 className={"signup-mssg"}>
          Changed your mind? {/* eslint-disable-next-line */}
          <a className={"signup-link"} onClick={() => setFormType("User")}>
            Go Back
          </a>
        </h4>
        <div className={"uk-margin"}>
          <button
            className={"login-button"}
            onClick={(e) => handleSubmitClick(e)}
          >
            Register
          </button>
        </div>
        <h5 className={"error-mssg"}>{errorMessage}</h5>
      </div>
    </>
  );
};

export default NGORegistrationForm;
