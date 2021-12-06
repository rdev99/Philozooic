import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../css/AllPage.css";
import { GetDoctorsByAvgReview } from "../apis/Doctor";

let locationSet = new Set();
let locationToSearchSet = new Set();

const AllDoctorPage = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [fetchMessage, setFetchMessage] = useState({});

  const fetchDoctorsByLocation = async (locationArray) => {
    await GetDoctorsByAvgReview(locationArray)
      .then(({ data: foundDoctors }) => {
        setDoctorList(foundDoctors);
        setFetchMessage({
          success: true,
          message: "Doctors were successfully fetched.",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setFetchMessage({
            success: false,
            message: "404! No doctors have registered yet.",
          });
          setDoctorList([]);
        }
      });
  };

  const setLocationToSearchSet = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      locationToSearchSet.add(value);
      console.log(locationToSearchSet);
      fetchDoctorsByLocation([...locationToSearchSet]);
    } else if (locationToSearchSet.has(value)) {
      locationToSearchSet.delete(value);
      fetchDoctorsByLocation([...locationToSearchSet]);
    }
  };

  const numberFormatter = new Intl.NumberFormat("en-IN");

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    fetchDoctorsByLocation([]);
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

  const renderDoctorCards = () => {
    if (doctorList.length === 0) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return doctorList.map((doctor) => {
      locationSet.add(doctor.location);
      return (
        <div key={doctor.doctorId}>
          <div className={"uk-card uk-card-default uk-card-hover"}>
            {doctor.reviewAvg > 4 && (
              <div className={"uk-card-badge uk-label label"}>Highly Rated</div>
            )}
            <div className={"uk-card-media-top"}>
              <img
                className={"card-image"}
                src={`/${doctor.picturePath}`}
                alt={`Veterinary Doctor: ${doctor.firstName} ${doctor.lastName}`}
                title={`Veterinary Doctor: ${doctor.firstName} ${doctor.lastName}`}
              />
            </div>
            <div className={"uk-card-body card-body"}>
              <h3 className={"uk-card-title name"}>
                Dr. {doctor.firstName} {doctor.lastName}
              </h3>
              <h4 className={"charge-box"}>
                {currencyFormatter.format(doctor.charge)}/
                {doctor.chargeDuration}
              </h4>
              <h6 className={"miscellaneous-info"}>
                Location: {doctor.location}
              </h6>
              <h6 className={"miscellaneous-info"}>
                Specialty: {doctor.specialty}
              </h6>
              <div className={"star-section"}>
                <StarRatings
                  rating={Number(doctor.reviewAvg)}
                  starDimension={"20px"}
                />
              </div>
              <div>
                <small className={"review-box"}>
                  {doctor.reviewAvg?.toFixed(3)} (
                  {numberFormatter.format(doctor.reviewCount)} review
                  {(doctor.reviewCount === 0 || doctor.reviewCount > 1) && "s"})
                </small>
              </div>
              <p className={"about-box"}>{doctor.about}</p>
              <div className={"button-box"}>
                <Link
                  to={{
                    pathname: `/doctor/${doctor.doctorId}`,
                    state: {
                      tempDoctor: doctor,
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
          <h1 className={"hero-heading-text"}>Veterinary Doctors</h1>
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
                  {renderDoctorCards()}
                </div>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default AllDoctorPage;
