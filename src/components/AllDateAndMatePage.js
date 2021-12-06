import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/AllPage.css";
import "../css/General.css";
import { GetPetsByAvgReviewsAPI } from "../apis/Pet";

let locationSet = new Set();
let locationToSearchSet = new Set();
let mateStatusToSearch;

const AllDateAndMatePage = () => {
  const [petList, setPetList] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [fetchMessage, setFetchMessage] = useState({});

  const fetchPetsByLocation = async (locationArray, mateStatusBoolean) => {
    await GetPetsByAvgReviewsAPI(locationArray, mateStatusBoolean)
      .then(({ data: foundPets }) => {
        setPetList(foundPets);
        setFetchMessage({
          success: true,
          message: "Pets were found with the given filters!",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setFetchMessage({
            success: false,
            message: "404: No pets were found with the given filters!",
          });
          setPetList([]);
        }
      });
  };

  const setLocationToSearchSet = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      locationToSearchSet.add(value);
      console.log(locationToSearchSet);
      fetchPetsByLocation([...locationToSearchSet], mateStatusToSearch);
    } else if (locationToSearchSet.has(value)) {
      locationToSearchSet.delete(value);
      fetchPetsByLocation([...locationToSearchSet], mateStatusToSearch);
    }
  };

  const setMateStatusToSearch = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      mateStatusToSearch = value === "true";
    } else {
      mateStatusToSearch = undefined;
    }
    fetchPetsByLocation([...locationToSearchSet], mateStatusToSearch);
  };

  useEffect(() => {
    document.title = "Pets for Date & Mate | Philozooic";
    fetchPetsByLocation([]);
  }, []);

  const renderLocationCheckboxes = () => {
    return (
      <>
        <legend>Location:</legend>
        {[...locationSet].map((location) => {
          return (
            <div>
              <label>
                <input
                  className={"uk-checkbox"}
                  type={"checkbox"}
                  value={location}
                  onChange={(e) => setLocationToSearchSet(e)}
                />
                {` ${location}`}
              </label>
            </div>
          );
        })}
        <br />
        <legend>Mate Status:</legend>
        <div onClick={(e) => setMateStatusToSearch(e)}>
          <div>
            <label>
              <input
                className={"uk-radio"}
                type={"radio"}
                value={true}
                name={"mateStatus"}
              />
              {" Available"}
            </label>
          </div>
          <div>
            <label>
              <input
                className={"uk-radio"}
                type={"radio"}
                value={false}
                name={"mateStatus"}
              />
              {" Unavailable"}
            </label>
          </div>
        </div>
      </>
    );
  };

  const renderPetCards = () => {
    if (Object.keys(fetchMessage).length === 0) {
      return <span uk-spinner={"ratio: 4.5"} />;
    } else if (!fetchMessage.success) {
      return <p className={"not-found-message"}>{fetchMessage.message}</p>;
    }
    return (
      <div className={"uk-child-width-1-3@l uk-grid-match all-page-grid"} uk-grid={""}>
        {petList.map((pet) => {
          locationSet.add(pet.location);
          return (
            <div key={pet.petId}>
              <div className={"uk-card uk-card-default uk-card-hover"}>
                {pet.reviewAvg > 4 && (
                  <div className={"uk-card-badge uk-label label"}>
                    Highly Rated
                  </div>
                )}
                <div className={"uk-card-media-top"}>
                  <img
                    className={"card-image"}
                    src={`/${pet.picturePath}`}
                    alt={`Pet: ${pet.animalType} ${pet.breed}`}
                    title={`Pet: ${pet.animalType} ${pet.breed}`}
                  />
                </div>
                <div className={"uk-card-body card-body"}>
                  <h3 className={"uk-card-title name"}>
                    {pet.animalType} ({pet.breed})
                  </h3>
                  <h6 className={"miscellaneous-info"}>
                    Location: {pet.location}
                  </h6>
                  <h6 className={"miscellaneous-info"}>
                    {pet.mateStatus
                      ? "Available to Mate"
                      : "Unavailable to Mate"}
                  </h6>
                  <small className={"review-box"}>
                    {pet.reviewAvg} ({pet.reviewCount} review
                    {(pet.reviewCount === 0 || pet.reviewCount > 1) && "s"})
                  </small>
                  <br />
                  <div className={"button-box"}>
                    <Link
                      to={{
                        pathname: `/date-mate/${pet.petId}`,
                        state: {
                          tempPet: pet,
                        },
                      }}
                    >
                      <button className={"section-button"}>Visit</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className={"uk-section hero-section"}>
        <div className={"uk-container"}>
          <h1 className={"hero-heading-text"}>Pets for date</h1>
        </div>
      </div>
      <div uk-grid={""} className={"section all-page-grid"}>
        <div className={"uk-width-1-4@l"}>
          <div className={"location-filter-section"}>
            <h6>
              Filter:
              <span
                uk-icon={"icon: chevron-down"}
                className={"collapse-icon"}
                onClick={(e) => setShowFilter(!showFilter)}
                style={showFilter ? { transform: "rotate(180deg)" } : {}}
              />
            </h6>
            {showFilter && renderLocationCheckboxes()}
          </div>
        </div>
        <div className={"uk-width-3-4@l all-page-card-section"}>
          {renderPetCards()}
        </div>
      </div>
    </>
  );
};

export default AllDateAndMatePage;
