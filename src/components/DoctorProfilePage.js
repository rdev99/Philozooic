import React, { useEffect, useState } from "react";
import { GetDoctorById, UpdateDoctorById } from "../apis/Doctor";
import { AddQuoteAPI } from "../apis/Quote";
import "../css/IndividualPage.css";

const DoctorProfilePage = (props) => {
  const { doctorId } = props;
  const [doctor, setDoctor] = useState({});
  const [doctorAfterUpdate, setDoctorAfterUpdate] = useState({});
  const [quote, setQuote] = useState({});
  const [updateMessage, setUpdateMessage] = useState({});
  const [quoteAddMessage, setQuoteAddMessage] = useState({});

  useEffect(() => {
    const fetchDoctor = async () => {
      await GetDoctorById(doctorId)
        .then(({ data: foundDoctor }) => {
          setDoctor(foundDoctor);
          setDoctorAfterUpdate(foundDoctor);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchDoctor();
  }, [doctorId]);

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
    await UpdateDoctorById(doctor.doctorId, {
      ...doctorAfterUpdate,
      charge: Number(doctorAfterUpdate.charge),
    })
      .then(({ data: updatedDoctor }) => {
        setDoctor(updatedDoctor);
        setDoctorAfterUpdate(updatedDoctor);
        setUpdateMessage({
          success: true,
          message: "Your doctor profile was successfully updated.",
        });
      })
      .catch((error) => console.error(error));
  };

  const onAddQuoteClick = async (e) => {
    await AddQuoteAPI({
      ...quote,
      type: "Doctor",
      quotedById: doctor.doctorId,
    })
      .then(({ data: addedQuote }) => {
        setQuoteAddMessage({
          success: true,
          message: "Your quote was successfully added!",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderDoctorImages = () => {
    let array = [];
    for (let i = 0; i < 6; i++) {
      array.push(
        <div key={i}>
          <img
            src={`/dr-${i + 1}.jpg`}
            alt={"DR"}
            className={
              doctorAfterUpdate.picturePath === `dr-${i + 1}.jpg`
                ? "type-image selected"
                : "type-image"
            }
            onClick={(e) =>
              setDoctorAfterUpdate({
                ...doctorAfterUpdate,
                picturePath: `dr-${i + 1}.jpg`,
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
      Object.keys(doctor).length === 0 ||
      Object.keys(doctorAfterUpdate).length === 0
    ) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return (
      <div className={"section"}>
        <div uk-grid={""}>
          <div className={"uk-width-2-5@l"}>
            <div>
              <img
                src={`/${doctorAfterUpdate.picturePath}`}
                alt={`Veterinary Doctor: ${doctor.firstName} ${doctor.lastName}`}
                title={`Veterinary Doctor: ${doctor.firstName} ${doctor.lastName}`}
              />
            </div>
            <div>
              <div
                className={
                  "uk-grid-match uk-child-width-1-3 uk-text-center type-page-image"
                }
                uk-grid={""}
              >
                {renderDoctorImages()}
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>
                  Get your quote featured:
                </label>
                <textarea
                  className={"uk-textarea"}
                  rows={2}
                  value={quote.quoteString}
                  onChange={(e) =>
                    setQuote({ ...quote, quoteString: e.target.value })
                  }
                />
              </div>
              {Object.keys(quoteAddMessage).length !== 0 &&
                quoteAddMessage.success && (
                  <div uk-alert={""} className={"uk-alert-success"}>
                    <p>{quoteAddMessage.message}</p>
                  </div>
                )}
              <div className={"uk-margin"}>
                <button
                  className={"submit-button"}
                  onClick={(e) => onAddQuoteClick(e)}
                >
                  Add Quote
                </button>
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
              Your Doctor ID: &nbsp;
              <span className={"user-email"}>{doctor.doctorId}</span>
            </h4>
            <form className={"user-form"}>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>First Name:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your first name"}
                    value={doctorAfterUpdate.firstName}
                    onChange={(e) =>
                      setDoctorAfterUpdate({
                        ...doctorAfterUpdate,
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
                    value={doctorAfterUpdate.lastName}
                    onChange={(e) =>
                      setDoctorAfterUpdate({
                        ...doctorAfterUpdate,
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
                    value={doctorAfterUpdate.charge}
                    onChange={(e) =>
                      setDoctorAfterUpdate({
                        ...doctorAfterUpdate,
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
                  value={doctorAfterUpdate.chargeDuration}
                  onChange={(e) =>
                    setDoctorAfterUpdate({
                      ...doctorAfterUpdate,
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
                <label className={"uk-form-label"}>Your specialty:</label>
                <select
                  className={"uk-select"}
                  value={doctorAfterUpdate.specialty}
                  onChange={(e) => {
                    setDoctorAfterUpdate({
                      ...doctorAfterUpdate,
                      specialty: e.target.value,
                    });
                  }}
                >
                  <option value={"Dogs"}>Dogs</option>
                  <option value={"Cats"}>Cats</option>
                  <option value={"Birds"}>Birds</option>
                  <option value={"Rabbits"}>Rabbits</option>
                  <option value={"Others"}>Others</option>
                </select>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Your Address:</label>
                <textarea
                  className={"uk-textarea"}
                  rows={5}
                  value={doctorAfterUpdate.address}
                  placeholder={"Your address"}
                  onChange={(e) =>
                    setDoctorAfterUpdate({
                      ...doctorAfterUpdate,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Your location:</label>
                <select
                  className={"uk-select"}
                  value={doctorAfterUpdate.location}
                  onChange={(e) =>
                    setDoctorAfterUpdate({
                      ...doctorAfterUpdate,
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
                  value={doctorAfterUpdate.about}
                  onChange={(e) =>
                    setDoctorAfterUpdate({
                      ...doctorAfterUpdate,
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
                  Update Doctor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  })();
};

export default DoctorProfilePage;
