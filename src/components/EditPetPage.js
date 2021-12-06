import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GetPetByIdAPI, UpdatePetByIdAPI } from "../apis/Pet";
import "../css/IndividualPage.css";

const EditReactPage = (props) => {
  const { user } = props;
  const [userPet, setUserPet] = useState({});
  const [userPetAfterUpdate, setUserPetAfterUpdate] = useState({});
  const [fetchMessage, setFetchMessage] = useState({});
  const [updateMessage, setUpdateMessage] = useState({});

  const history = useHistory();
  const { userId: pathUserId, petId: pathPetId } = useParams();

  const isEmpty = (val) => {
    return val === undefined || val == null || val.length <= 0 ? true : false;
  };

  useEffect(() => {
    if (user === null || pathUserId !== user.userId) {
      history.push("/");
    } else {
      const fetchPet = async () => {
        await GetPetByIdAPI(pathPetId)
          .then(({ data: foundPet }) => {
            setUserPet(foundPet);
            setUserPetAfterUpdate(foundPet);
            setFetchMessage({
              success: true,
              message: `Pet with ID: ${pathPetId} was successfully found!`,
            });
          })
          .catch((error) => {
            if (error.response.stats === 404) {
              setFetchMessage({
                success: false,
                message: `Pet with ID: ${pathPetId} was not found.`,
              });
            }
          });
      };
      fetchPet();
    }
  }, [history, pathPetId, pathUserId, user]);

  const onSubmitClick = async (e) => {
    e.preventDefault();
    if (
      isEmpty(userPetAfterUpdate.name) ||
      isEmpty(userPetAfterUpdate.medicalHistory) ||
      isEmpty(userPetAfterUpdate.breed) ||
      isEmpty(userPetAfterUpdate.picturePath) ||
      isEmpty(userPetAfterUpdate.mateStatus) ||
      isEmpty(userPetAfterUpdate.gender) ||
      isEmpty(userPetAfterUpdate.age)
    ) {
      setUpdateMessage({ success: false, message: "Please fill all fields." });
    } else {
      await UpdatePetByIdAPI(userPet.petId, {
        ...userPetAfterUpdate,
        age: Number(userPetAfterUpdate.age),
      })
        .then(({ data: updatedPet }) => {
          console.info(updatedPet);
          setUserPet(updatedPet);
          setUserPetAfterUpdate(updatedPet);
          setUpdateMessage({
            success: true,
            message: "Your pet was successfully updated.",
          });
        })
        .catch((error) => console.error(error));
    }
  };

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

  const renderEditPage = () => {
    return (
      <>
        <div className={"uk-section hero-section"}>
          <div className={"uk-container"}>
            <h1 className={"hero-heading-text"}>{userPet.name}</h1>
          </div>
        </div>
        <div className={"section"}>
          <div className={"pet-card individual-grid"} uk-grid={""}>
            <div className={"uk-width-2-5@l"}>
              <div className={"pet-image-box"}>
                <img
                  src={`/${userPetAfterUpdate.picturePath}`}
                  alt={userPetAfterUpdate.name}
                />
              </div>
              <div
                className={"uk-position-relative uk-visible-toggle uk-light"}
                tabIndex={"-1"}
                uk-slider={"center: true"}
              >
                <ul className={"uk-slider-items uk-grid"}>
                  {(() => {
                    let array = [];
                    for (let i = 0; i < 12; i++) {
                      array.push(
                        <li key={i} className={"uk-width-3-4"}>
                          <div className={"uk-panel"}>
                            <img
                              className={
                                userPetAfterUpdate.picturePath ===
                                  `pet-${i + 1}.jpg` && "pet-image"
                              }
                              src={`/pet-${i + 1}.jpg`}
                              alt={"Pet"}
                              onClick={(e) =>
                                setUserPetAfterUpdate({
                                  ...userPetAfterUpdate,
                                  picturePath: `pet-${i + 1}.jpg`,
                                })
                              }
                            />
                          </div>
                        </li>
                      );
                    }
                    return array;
                  })()}
                </ul>
                <div
                  className={"uk-position-center-left uk-position-small uk-hidden-hover"}
                  uk-slidenav-previous={""}
                  uk-slider-item={"previous"}
                />
                <diva
                  className={"uk-position-center-right uk-position-small uk-hidden-hover"}
                  uk-slidenav-next={""}
                  uk-slider-item={"next"}
                />
              </div>
            </div>
            <div className={"uk-width-3-5@l"}>
              <form>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Pet Name:</label>
                  <div className={"uk-form-controls"}>
                    <input
                      className={"uk-input"}
                      type={"text"}
                      placeholder={"Pet Name"}
                      value={userPetAfterUpdate.name}
                      onChange={(e) =>
                        setUserPetAfterUpdate({
                          ...userPetAfterUpdate,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>
                    Which animal is your pet?
                  </label>
                  <div className={"uk-form-controls"}>
                    <select
                      className={"uk-select"}
                      onChange={(e) =>
                        setUserPetAfterUpdate({
                          ...userPetAfterUpdate,
                          animalType: e.target.value,
                        })
                      }
                      value={userPetAfterUpdate.animalType}
                    >
                      <option value={"Dog"}>Dog</option>
                      <option value={"Cat"}>Cat</option>
                      <option value={"Bird"}>Bird</option>
                      <option value={"Rabbit"}>Rabbit</option>
                      <option value={"Other"}>Other</option>
                    </select>
                  </div>
                </div>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Pet Breed:</label>
                  <div className={"uk-form-controls"}>
                    <input
                      className={"uk-input"}
                      type={"text"}
                      placeholder={"Pet Breed"}
                      value={userPetAfterUpdate.breed}
                      onChange={(e) =>
                        setUserPetAfterUpdate({
                          ...userPetAfterUpdate,
                          breed: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Medical History:</label>
                  <div className={"uk-form-controls"}>
                    <textarea
                      className={"uk-textarea"}
                      rows={"5"}
                      placeholder={"Medical History"}
                      value={userPetAfterUpdate.medicalHistory}
                      onChange={(e) =>
                        setUserPetAfterUpdate({
                          ...userPetAfterUpdate,
                          medicalHistory: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={"uk-margin"}>
                    <label className={"uk-class-label"}>
                      Age <small>(in years)</small>:
                    </label>
                    <input
                      className={"uk-input"}
                      type={"number"}
                      value={userPetAfterUpdate.age}
                      onChange={(e) =>
                        setUserPetAfterUpdate({
                          ...userPetAfterUpdate,
                          age: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Location:</label>
                  <div className={"uk-form-controls"}>
                    <select
                      className={"uk-select"}
                      value={userPetAfterUpdate.location}
                      onChange={(e) =>
                        setUserPetAfterUpdate({
                          ...userPetAfterUpdate,
                          location: e.target.value,
                        })
                      }
                    >
                      {renderCityOptions()}
                    </select>
                  </div>
                </div>
                <div className={"uk-margin"}>
                  <div className={"uk-form-label"}>Is ready to mate/date?</div>
                  <div className={"uk-form-controls"}>
                    <label>
                      <input
                        className={"uk-radio"}
                        type={"radio"}
                        name={"mateStatus"}
                        value={true}
                        checked={userPetAfterUpdate.mateStatus === true}
                        onChange={(e) =>
                          setUserPetAfterUpdate({
                            ...userPetAfterUpdate,
                            mateStatus: true,
                          })
                        }
                      />
                      {" Yes"}
                    </label>
                    <br />
                    <label>
                      <input
                        className={"uk-radio"}
                        type={"radio"}
                        name={"mateStatus"}
                        value={false}
                        checked={userPetAfterUpdate.mateStatus === false}
                        onChange={(e) =>
                          setUserPetAfterUpdate({
                            ...userPetAfterUpdate,
                            mateStatus: false,
                          })
                        }
                      />
                      {" No"}
                    </label>
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
                        checked={userPetAfterUpdate.gender === "Male"}
                        onChange={(e) =>
                          setUserPetAfterUpdate({
                            ...userPetAfterUpdate,
                            gender: "Male",
                          })
                        }
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
                        checked={userPetAfterUpdate.gender === "Female"}
                        onChange={(e) =>
                          setUserPetAfterUpdate({
                            ...userPetAfterUpdate,
                            gender: "Female",
                          })
                        }
                      />
                      {" Female"}
                    </label>
                  </div>
                </div>
                {Object.keys(updateMessage).length > 0 &&
                  (!updateMessage.success ? (
                    <div className={"uk-alert-danger"} uk-alert={""} key={1}>
                      <p>{updateMessage.message}</p>
                    </div>
                  ) : (
                    <div className={"uk-alert-success"} uk-alert={""} key={2}>
                      <p>{updateMessage.message}</p>
                    </div>
                  ))}
                <div className={"uk-margin"}>
                  <button
                    className={"submit-button"}
                    onClick={(e) => onSubmitClick(e)}
                  >
                    Update Pet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    if (
      Object.keys(userPet).length > 0 &&
      Object.keys(userPetAfterUpdate).length > 0 &&
      fetchMessage.success
    ) {
      return renderEditPage();
    } else if (Object.keys(fetchMessage).length > 0 && !fetchMessage.success) {
      return <h1>Not found</h1>;
    } else {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
  };

  return renderContent();
};

export default EditReactPage;
