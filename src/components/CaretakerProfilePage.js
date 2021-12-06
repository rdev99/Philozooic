import React, { useEffect, useState } from "react";
import { GetCaretakerByIdAPI, UpdateCaretakerByIdAPI } from "../apis/Caretaker";
import "../css/IndividualPage.css";

const CaretakerProfilePage = (props) => {
  const { caretakerId } = props;
  const [caretaker, setCaretaker] = useState({});
  const [caretakerAfterUpdate, setCaretakerAfterUpdate] = useState({});
  const [updateMessage, setUpdateMessage] = useState({});

  useEffect(() => {
    const fetchCaretaker = async () => {
      await GetCaretakerByIdAPI(caretakerId)
        .then(({ data: foundCaretaker }) => {
          setCaretaker(foundCaretaker);
          setCaretakerAfterUpdate(foundCaretaker);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCaretaker();
  }, [caretakerId]);

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

  const renderCityOptions = () => {
    let array = [];
    for (let i = 0; i < cityArray.length; i++) {
      array.push(
        <option key={i} value={cityArray[i]}>
          {cityArray[i]}
        </option>
      );
    }
    return array;
  };

  const onUpdateClick = async (e) => {
    e.preventDefault();
    await UpdateCaretakerByIdAPI(caretaker.caretakerId, {
      ...caretakerAfterUpdate,
      charge: Number(caretakerAfterUpdate.charge),
    })
      .then(({ data: updatedCaretaker }) => {
        setCaretaker(updatedCaretaker);
        setCaretakerAfterUpdate(updatedCaretaker);
        setUpdateMessage({
          success: true,
          message: "Your caretaker profile was successfully updated.",
        });
      })
      .catch((error) => console.error(error));
  };

  const renderCaretakerImages = () => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(
        <div key={i}>
          <img
            src={`/ctr-${i + 1}.jpg`}
            alt={"Caretaker"}
            className={
              caretakerAfterUpdate.picturePath === `ctr-${i + 1}.jpg`
                ? "type-image selected"
                : "type-image"
            }
            onClick={(e) =>
              setCaretakerAfterUpdate({
                ...caretakerAfterUpdate,
                picturePath: `ctr-${i + 1}.jpg`,
              })
            }
          />
        </div>
      );
    }
    return array;
  };

  return (() => {
    if (
      Object.keys(caretaker).length === 0 ||
      Object.keys(caretakerAfterUpdate).length === 0
    ) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return (
      <div className={"section"}>
        <div uk-grid={""}>
          <div className={"uk-width-2-5@l"}>
            <div>
              <img
                src={`/${caretakerAfterUpdate.picturePath}`}
                alt={`Caretaker: ${caretaker.firstName} ${caretaker.lastName}`}
                title={`Caretaker: ${caretaker.firstName} ${caretaker.lastName}`}
              />
            </div>
            <div>
              <div
                className={
                  "uk-grid-match uk-child-width-1-3 uk-text-center type-page-image"
                }
                uk-grid={""}
              >
                {renderCaretakerImages()}
              </div>
            </div>
          </div>
          <div className={"uk-width-3-5@l"}>
            {Object.keys(updateMessage).length > 0 && updateMessage.success && (
              <div className={"uk-alert-success"} uk-alert={""}>
                <p>{updateMessage.message}</p>
              </div>
            )}
            <h4 className={"user-info-med"}>
              Your Caretaker ID: &nbsp;
              <span className={"user-email"}>{caretaker.caretakerId}</span>
            </h4>
            <form className={"user-form"}>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>First Name:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your first name"}
                    value={caretakerAfterUpdate.firstName}
                    onChange={(e) =>
                      setCaretakerAfterUpdate({
                        ...caretakerAfterUpdate,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Last Name:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your last name"}
                    value={caretakerAfterUpdate.lastName}
                    onChange={(e) =>
                      setCaretakerAfterUpdate({
                        ...caretakerAfterUpdate,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Charge:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"number"}
                    placeholder={"Your charge"}
                    value={caretakerAfterUpdate.charge}
                    onChange={(e) =>
                      setCaretakerAfterUpdate({
                        ...caretakerAfterUpdate,
                        charge: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Your charges are per:</label>
                <select
                  className={"uk-select"}
                  value={caretakerAfterUpdate.chargeDuration}
                  onChange={(e) =>
                    setCaretakerAfterUpdate({
                      ...caretakerAfterUpdate,
                      chargeDuration: e.target.value,
                    })
                  }
                >
                  <option value={"hr"}>Hourly</option>
                  <option value={"session"}>Per Session</option>
                  <option value={"week"}>Weekly</option>
                  <option value={"month"}>Monthly</option>
                </select>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Your Address:</label>
                <textarea
                  className={"uk-textarea"}
                  rows={5}
                  placeholder={"Your Address"}
                  value={caretakerAfterUpdate.address}
                  onChange={(e) =>
                    setCaretakerAfterUpdate({
                      ...caretakerAfterUpdate,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Your location:</label>
                <select
                  className={"uk-select"}
                  value={caretakerAfterUpdate.location}
                  onChange={(e) =>
                    setCaretakerAfterUpdate({
                      ...caretakerAfterUpdate,
                      location: e.target.value,
                    })
                  }
                >
                  {renderCityOptions()}
                </select>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>About:</label>
                <textarea
                  className={"uk-textarea"}
                  rows={"5"}
                  placeholder={"About You"}
                  value={caretakerAfterUpdate.about}
                  onChange={(e) =>
                    setCaretakerAfterUpdate({
                      ...caretakerAfterUpdate,
                      about: e.target.value,
                    })
                  }
                />
              </div>
              <div className={"uk-margin"}>
                <button
                  className={"submit-button"}
                  onClick={(e) => onUpdateClick(e)}
                >
                  Update Caretaker Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  })();
};

export default CaretakerProfilePage;
