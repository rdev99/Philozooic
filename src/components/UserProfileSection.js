import React, { useState } from "react";
import { UpdateUserById } from "../apis/User";
import "../css/IndividualPage.css";

const UserProfileSection = (props) => {
  const { user, setUser } = props;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [picturePath, setPicturePath] = useState(user.picturePath);
  const [gender, setGender] = useState(user.gender);
  const [updateMessage, setUpdateMessage] = useState({ success: true });

  const onUpdateClick = async (e) => {
    e.preventDefault();
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let userAfterUpdate = {
      ...user,
      name,
      phoneNumber,
      gender,
      picturePath,
    };
    await UpdateUserById(user.userId, userAfterUpdate, loggedInUser.token)
      .then(({ data: updatedUser }) => {
        console.info(updatedUser);
        setUpdateMessage({
          success: true,
          message: "User was successfully updated.",
        });
        setUser(updatedUser);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            ...loggedInUser,
            user: updatedUser,
          })
        );
      })
      .catch((error) => {
        error.response.status === 401 &&
          setUpdateMessage({
            success: false,
            message: "Session timed out! Please login again.",
          });
      });
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
              ? "uk-border-circle choose-img photo-selected"
              : "uk-border-circle choose-img"
          }
          onClick={(e) => setPicturePath(`pp-${i + 1}.jpg`)}
        />
      );
    }
    return array;
  };

  const renderUpdateMessage = () => {
    if (Object.keys(updateMessage).length > 1) {
      if (updateMessage.success) {
        return (
          <div className={"uk-alert-success"} uk-alert={""}>
            <p>{updateMessage.message}</p>
          </div>
        );
      }
      return (
        <div className={"uk-alert-danger"} uk-alert={""}>
          <p>{updateMessage.message}</p>
        </div>
      );
    }
  };

  const renderUserContent = () => {
    return (
      <div className={"section"}>
        <div uk-grid={""} className={"user-section"}>
          <div className={"uk-width-2-5@l"}>
            <div>
              <img
                src={`/${picturePath}`}
                alt={`User: ${user.name}`}
                title={`User: ${user.name}`}
              />
              <span
                uk-icon={"icon: pencil; ratio: 1"}
                onClick={() => setIsImageModalOpen(true)}
              />
              <div id={"myModal"} className={"modal"} hidden={!isImageModalOpen}>
                <div className={"modal-content"}>
                  <span
                    className={"close"}
                    onClick={() => setIsImageModalOpen(false)}
                  >
                    &times;
                  </span>
                  <div className={"img-grid"}>{renderImageGrid()}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={"uk-width-3-5@l"}>
            {renderUpdateMessage()}
            <h4 className={"user-info-med"}>
              Registered Email: &nbsp;
              <span className={"user-email"}>{user.email}</span>
            </h4>
            <h4 className={"user-info-med"}>
              Your User Id: &nbsp;
              <span className={"user-email"}>{user.userId}</span>
            </h4>
            <form className={"user-form"}>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Name:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Phone Number:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"number"}
                    placeholder={"Your name"}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <div className={"uk-form-label"}>Gender:</div>
                <div className={"uk-form-controls"}>
                  <label>
                    <input
                      className={"uk-radio"}
                      type={"radio"}
                      name={"gender"}
                      value={"Male"}
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    {" Male"}
                  </label>
                  <br />
                  <label>
                    <input
                      className={"uk-radio"}
                      type={"radio"}
                      name={"gender"}
                      value={"Female"}
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    {" Female"}
                  </label>
                </div>
              </div>
              <div className={"uk-margin"}>
                <button
                  className={"submit-button"}
                  onClick={(e) => onUpdateClick(e)}
                >
                  Update Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return renderUserContent();
};

export default UserProfileSection;
