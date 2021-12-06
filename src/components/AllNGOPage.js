import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../css/AllPage.css";
import { GetNGOsByAvgReviewAPI } from "../apis/NGO";

let locationSet = new Set();
let locationToSearchSet = new Set();

const AllNGOPage = () => {
  const [NGOList, setNGOList] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [fetchMessage, setFetchMessage] = useState({});

  const fetchNGOsByLocation = async (locationArray) => {
    await GetNGOsByAvgReviewAPI(locationArray)
      .then(({ data: foundNGOs }) => {
        setNGOList(foundNGOs);
        setFetchMessage({
          success: true,
          message: "NGOs were successfully fetched.",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setFetchMessage({
            success: false,
            message: "404! No NGOs have registered yet.",
          });
          setNGOList([]);
        }
      });
  };

  const setLocationToSearchSet = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      locationToSearchSet.add(value);
      console.log(locationToSearchSet);
      fetchNGOsByLocation([...locationToSearchSet]);
    } else if (locationToSearchSet.has(value)) {
      locationToSearchSet.delete(value);
      fetchNGOsByLocation([...locationToSearchSet]);
    }
  };

  const numberFormatter = new Intl.NumberFormat("en-IN");

  useEffect(() => {
    fetchNGOsByLocation([]);
  }, []);

  const renderLocationCheckboxes = () => {
    return [...locationSet].map((location, index) => {
      return (
        <div key={index}>
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

  const renderNGOCards = () => {
    if (NGOList.length === 0) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return NGOList.map((NGO) => {
      locationSet.add(NGO.location);
      return (
        <div key={NGO.NGOId}>
          <div className={"uk-card uk-card-default uk-card-hover"}>
            {NGO.reviewAvg > 4 && (
              <div className={"uk-card-badge uk-label label"}>Highly Rated</div>
            )}
            <div className={"uk-card-media-top"}>
              <img
                className={"card-image"}
                src={`/${NGO.picturePath}`}
                alt={`NGO: ${NGO.name}`}
                title={`NGO: ${NGO.name}`}
              />
            </div>
            <div className={"uk-card-body card-body"}>
              <h3 className={"uk-card-title name"}>{NGO.name}</h3>
              <h6 className={"miscellaneous-info"}>Location: {NGO.location}</h6>
              <div className={"star-section"}>
                <StarRatings
                  rating={Number(NGO.reviewAvg)}
                  starDimension={"20px"}
                />
              </div>
              <div>
                <small className={"review-box"}>
                  {NGO.reviewAvg?.toFixed(3)} (
                  {numberFormatter.format(NGO.reviewCount)} review
                  {(NGO.reviewCount === 0 || NGO.reviewCount > 1) && "s"})
                </small>
              </div>
              <p className={"about-box"}>{NGO.about}</p>
              <div className={"button-box"}>
                <Link
                  to={{
                    pathname: `/ngo/${NGO.ngoId}`,
                    state: {
                      tempNGO: NGO,
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
          <h1 className={"hero-heading-text"}>NGOs</h1>
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
                  {renderNGOCards()}
                </div>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default AllNGOPage;
