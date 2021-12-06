import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../css/IndividualPage.css";
import { GetDoctorsByAvgReview } from "../apis/Doctor";
import { GetUserByTargetUserIdAPI } from "../apis/User";
import { GetReviewsWithUserDataAPI } from "../apis/Review";
import AddReview from "./AddReview";
import Review from "./Review";
import { Link } from "react-router-dom";

const DoctorPage = (props) => {
  const { doctorId } = props.match.params;
  const [doctor, setDoctor] = useState(null);
  const [doctorUser, setDoctorUser] = useState(null);
  const [doctorReviews, setDoctorReviews] = useState([]);
  const [isDoctorFound, setIsDoctorFound] = useState(true);

  useEffect(() => {
    if (typeof props.location.state === "undefined") {
      fetchDoctor(doctorId);
    } else {
      let { tempDoctor } = props.location.state;
      setDoctor(tempDoctor);
    }
    fetchDoctorUser(doctorId);
    fetchDoctorReviews(doctorId);
  }, [doctorId, props.location]);

  const numberFormatter = new Intl.NumberFormat("en-IN");

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const fetchDoctor = async (doctorID) => {
    await GetDoctorsByAvgReview([], doctorID)
      .then(({ data: foundDoctor }) => {
        setDoctor(foundDoctor?.[0]);
        setIsDoctorFound(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsDoctorFound(false);
        }
        console.error(error);
      });
  };

  const fetchDoctorUser = async (targetUserId) => {
    await GetUserByTargetUserIdAPI(targetUserId)
      .then(({ data: foundUser }) => {
        setDoctorUser(foundUser);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsDoctorFound(false);
        }
        console.error(error);
      });
  };

  const fetchDoctorReviews = async (reviewOfId) => {
    await GetReviewsWithUserDataAPI(reviewOfId, "Doctor")
      .then(({ data: foundReviews }) => {
        setDoctorReviews(foundReviews);
      })
      .catch((error) => {
        console.error(error);
        setDoctorReviews([]);
      });
  };

  const renderReviews = () => {
    if (doctorReviews.length === 0) {
      return <legend>There are no reviews, yet.</legend>;
    }
    return doctorReviews.map((doctorReview, index) => {
      return (
        <Review
          reviewUser={doctorReview}
          key={doctorReview.doctorId}
          index={index}
          setReviews={setDoctorReviews}
          reviews={doctorReviews}
        />
      );
    });
  };

  const renderDoctorContent = () => {
    if (!isDoctorFound) {
      return (
        <p className={"not-found-message"}>
          404: Sorry, this page is not available!
        </p>
      );
    }
    if (doctor === null || doctorUser === null) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return (
      <div uk-grid={""} className={"section individual-grid"}>
        <div className={"uk-width-2-5@l"}>
          <img
            src={`/${doctor.picturePath}`}
            alt={`Veterinary Doctor: ${doctor.firstName} ${doctor.lastName}`}
            title={`Veterinary Doctor: ${doctor.firstName} ${doctor.lastName}`}
            className={"profile-pic"}
          />
          <div className={"info-contact"}>
            <h3>Contact details:</h3>
            <div>
              <span className={"contact-span"}>
                <span uk-icon={"icon: mail; ratio: 2"} />
                &nbsp; &nbsp;
                <a href={`mailto:${doctorUser.email}`}>{doctorUser.email}</a>
              </span>
              <span className={"contact-span"}>
                <span uk-icon={"icon: receiver; ratio: 2"} />
                &nbsp; &nbsp;
                <a href={`tel:${doctorUser.phoneNumber}`}>
                  {doctorUser.phoneNumber}
                </a>
              </span>
              <span className={"contact-span"}>
                <span uk-icon={"icon: location; ratio: 2"} />
                &nbsp; &nbsp;
                <span>{doctor.address}</span>
              </span>
            </div>
            <hr />
          </div>
        </div>
        <div className={"uk-width-3-5@l"}>
          <h1 className={"info-name"}>
            Dr. {doctor.firstName} {doctor.lastName}{" "}
            {doctor.reviewAvg > 4 && (
              <span className={"uk-label label"}>Highly Rated</span>
            )}
          </h1>
          <h3 className={"info-charge"}>
            {currencyFormatter.format(doctor.charge)}/{doctor.chargeDuration}
          </h3>
          <div className={"info-ratings"}>
            <StarRatings rating={Number(doctor.reviewAvg)} />
          </div>
          <div>
            <h5 className={"info-ratings-num"}>
              {doctor.reviewAvg?.toFixed(3)} (
              {numberFormatter.format(doctor.reviewCount)} review
              {(doctor.reviewCount === 0 || doctor.reviewCount > 1) && "s"})
            </h5>
          </div>
          <hr />
          <h5>
            Specialty: {doctor.specialty} | Location: {doctor.location}
          </h5>
          <h4>About Dr. {doctor.firstName}:</h4>
          <p>{doctor.about}</p>
          <hr />
          <h4>Add a review:</h4>
          {(() => {
            let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser) {
              if (loggedInUser.user?.targetUserId === doctorId) {
                return (
                  <legend>You cannot review your own doctor profile.</legend>
                );
              }
              return (
                <AddReview
                  loggedUser={loggedInUser}
                  reviewType={"Doctor"}
                  reviewOfId={doctorId}
                  setReviews={setDoctorReviews}
                  reviews={doctorReviews}
                />
              );
            }
            return (
              <legend>
                You're not logged in. <Link to={"/login"}>Login here</Link>
              </legend>
            );
          })()}
          <hr />
          <h4>Reviews:</h4>
          {renderReviews()}
        </div>
      </div>
    );
  };

  return renderDoctorContent();
};

export default DoctorPage;
