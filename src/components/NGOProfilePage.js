import React, { useEffect, useState } from "react";
import { GetNGOByIdAPI, UpdateNGOByIdAPI } from "../apis/NGO";
import { AddQuoteAPI } from "../apis/Quote";
import "../css/IndividualPage.css";

const NGOProfilePage = (props) => {
  const { ngoId } = props;
  const [ngo, setNgo] = useState({});
  const [ngoAfterUpdate, setNgoAfterUpdate] = useState({});
  const [quote, setQuote] = useState({});
  const [updateMessage, setUpdateMessage] = useState({});
  const [quoteAddMessage, setQuoteAddMessage] = useState({});

  useEffect(() => {
    const fetchNgo = async () => {
      await GetNGOByIdAPI(ngoId)
        .then(({ data: foundNgo }) => {
          setNgo(foundNgo);
          setNgoAfterUpdate(foundNgo);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchNgo();
  }, [ngoId]);

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
    await UpdateNGOByIdAPI(ngo.ngoId, {
      ...ngoAfterUpdate,
      phoneNumber: Number(ngoAfterUpdate.phoneNumber),
    })
      .then(({ data: updatedNgo }) => {
        setNgo(updatedNgo);
        setNgoAfterUpdate(updatedNgo);
        setUpdateMessage({
          success: true,
          message: "Your NGO profile was successfully updated.",
        });
      })
      .catch((error) => console.error(error));
  };

  const onAddQuoteClick = async (e) => {
    await AddQuoteAPI({
      ...quote,
      type: "NGO",
      quotedById: ngo.ngoId,
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

  const renderNgoImages = () => {
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push(
        <div key={i}>
          <img
            src={`/ngo-${i + 1}.jpg`}
            alt={"NGO"}
            className={
              ngoAfterUpdate.picturePath === `ngo-${i + 1}.jpg`
                ? "type-image selected"
                : "type-image"
            }
            onClick={(e) =>
              setNgoAfterUpdate({
                ...ngoAfterUpdate,
                picturePath: `ngo-${i + 1}.jpg`,
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
      Object.keys(ngo).length === 0 ||
      Object.keys(ngoAfterUpdate).length === 0
    ) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return (
      <div className={"section"}>
        <div uk-grid={""}>
          <div className={"uk-width-2-5@l"}>
            <div>
              <img
                src={`/${ngoAfterUpdate.picturePath}`}
                alt={`NGO: ${ngo.name}`}
                title={`NGO: ${ngo.name}`}
              />
            </div>
            <div>
              <div
                className={
                  "uk-grid-match uk-child-width-1-3 uk-text-center type-page-image"
                }
                uk-grid={""}
              >
                {renderNgoImages()}
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
              Your NGO ID: &nbsp;
              <span className={"user-email"}>{ngo.ngoId}</span>
            </h4>
            <form className={"user-form"}>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>NGO Name:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your NGO name"}
                    value={ngoAfterUpdate.name}
                    onChange={(e) =>
                      setNgoAfterUpdate({
                        ...ngoAfterUpdate,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Phone Number</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your last name"}
                    value={ngoAfterUpdate.phoneNumber}
                    onChange={(e) =>
                      setNgoAfterUpdate({
                        ...ngoAfterUpdate,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>About your NGO:</label>
                <textarea
                  className={"uk-textarea"}
                  rows={"5"}
                  placeholder={"About Your NGO"}
                  value={ngoAfterUpdate.about}
                  onChange={(e) =>
                    setNgoAfterUpdate({
                      ...ngoAfterUpdate,
                      about: e.target.value,
                    })
                  }
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>NGO Address:</label>
                <textarea
                  className={"uk-textarea"}
                  rows={"3"}
                  placeholder={"NGO Address"}
                  value={ngoAfterUpdate.address}
                  onChange={(e) =>
                    setNgoAfterUpdate({
                      ...ngoAfterUpdate,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Your NGO Location:</label>
                <select
                  className={"uk-select"}
                  value={ngoAfterUpdate.location}
                  onChange={(e) => {
                    setNgoAfterUpdate({
                      ...ngoAfterUpdate,
                      location: e.target.value,
                    });
                  }}
                >
                  {renderCityOptions()}
                </select>
              </div>
              <hr />
              <h4>NGO Donation Details:</h4>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>NGO Account Number:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your NGO Account Number"}
                    value={ngoAfterUpdate.accountNumber}
                    onChange={(e) =>
                      setNgoAfterUpdate({
                        ...ngoAfterUpdate,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>NGO Account IFSC:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your NGO Account IFSC"}
                    value={ngoAfterUpdate.bankIFSC}
                    onChange={(e) =>
                      setNgoAfterUpdate({
                        ...ngoAfterUpdate,
                        bankIFSC: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>NGO UPI ID:</label>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"text"}
                    placeholder={"Your NGO Account Number"}
                    value={ngoAfterUpdate.upiId}
                    onChange={(e) =>
                      setNgoAfterUpdate({
                        ...ngoAfterUpdate,
                        upiId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <button
                  className={"submit-button"}
                  onClick={(e) => onUpdateClick(e)}
                >
                  Update NGO Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  })();
};

export default NGOProfilePage;
