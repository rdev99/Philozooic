import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../css/AllPage.css";
import { GetCaretakersByAvgReview } from "../apis/Caretaker";

let locationSet = new Set();
let locationToSearchSet = new Set();

const AllCaretakerPage = () => {
  const [caretakerList, setCaretakerList] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [fetchMessage, setFetchMessage] = useState({});

  const fetchCaretakersByLocation = async (locationArray) => {
    await GetCaretakersByAvgReview(locationArray)
      .then(({ data: foundCaretakers }) => {
        setCaretakerList(foundCaretakers);
        setFetchMessage({
          success: true,
          message: "Doctors were successfully fetched.",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setFetchMessage({
            success: false,
            message: "404! No caretakers have registered yet.",
          });
          setCaretakerList([]);
        }
      });
  };

  const setLocationToSearchSet = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      locationToSearchSet.add(value);
      console.log(locationToSearchSet);
      fetchCaretakersByLocation([...locationToSearchSet]);
    } else if (locationToSearchSet.has(value)) {
      locationToSearchSet.delete(value);
      fetchCaretakersByLocation([...locationToSearchSet]);
    }
  };

  const numberFormatter = new Intl.NumberFormat("en-IN");

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    fetchCaretakersByLocation([]);
  }, []);

  const renderLocationCheckboxes = () => {
    return [...locationSet].map((location) => {
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
    });
  };

  const renderCaretakerCards = () => {
    if (caretakerList.length === 0) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return caretakerList.map((caretaker) => {
      locationSet.add(caretaker.location);
      return (
        <div key={caretaker.caretakerId}>
          <div className={"uk-card uk-card-default uk-card-hover"}>
            {caretaker.reviewAvg > 4 && (
              <div className={"uk-card-badge uk-label label"}>Highly Rated</div>
            )}
            <div className={"uk-card-media-top"}>
              <img
                className={"card-image"}
                src={`/${caretaker.picturePath}`}
                alt={`Caretaker: ${caretaker.firstName} ${caretaker.lastName}`}
                title={`Caretaker: ${caretaker.firstName} ${caretaker.lastName}`}
              />
            </div>
            <div className={"uk-card-body card-body"}>
              <h3 className={"uk-card-title name"}>
                Dr. {caretaker.firstName} {caretaker.lastName}
              </h3>
              <h4 className={"charge-box"}>
                {currencyFormatter.format(caretaker.charge)}/
                {caretaker.chargeDuration}
              </h4>
              <h6 className={"miscellaneous-info"}>
                Location: {caretaker.location}
              </h6>
              <div className={"star-section"}>
                <StarRatings
                  rating={Number(caretaker.reviewAvg)}
                  starDimension={"20px"}
                />
              </div>
              <div>
                <small className={"review-box"}>
                  {caretaker.reviewAvg?.toFixed(3)} (
                  {numberFormatter.format(caretaker.reviewCount)} review
                  {(caretaker.reviewCount === 0 || caretaker.reviewCount > 1) &&
                    "s"}
                  )
                </small>
              </div>
              <p className={"about-box"}>{caretaker.about}</p>
              <div className={"button-box"}>
                <Link
                  to={{
                    pathname: `/caretaker/${caretaker.caretakerId}`,
                    state: {
                      tempCaretaker: caretaker,
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
    });
  };

  return (
    <>
      <div className={"uk-section hero-section"}>
        <div className={"uk-container"}>
          <h1 className={"hero-heading-text"}>Caretakers</h1>
        </div>
      </div>

      <div uk-grid={""} className={"section all-page-grid"}>
        <div className={"uk-width-1-4@l"}>
          <div className={"location-filter-section"}>
            <h6>
              Filter by location:
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
          {(() => {
            if (Object.keys(fetchMessage).length === 0) {
              return <span uk-spinner={"ratio: 4.5"} />;
            } else if (!fetchMessage.success) {
              return (
                <p className={"not-found-message"}>{fetchMessage.message}</p>
              );
            } else {
              return (
                <div
                  className={"uk-child-width-1-3@l uk-grid-match all-page-grid"}
                  uk-grid={""}
                >
                  {renderCaretakerCards()}
                </div>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default AllCaretakerPage;
