import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../css/IndividualPage.css";
import { GetCaretakersByAvgReview } from "../apis/Caretaker";
import { GetUserByTargetUserIdAPI } from "../apis/User";
import { GetReviewsWithUserDataAPI } from "../apis/Review";
import AddReview from "./AddReview";
import Review from "./Review";
import { Link } from "react-router-dom";

const CaretakerPage = (props) => {
  const { caretakerId } = props.match.params;
  const [caretaker, setCaretaker] = useState(null);
  const [caretakerUser, setCaretakerUser] = useState(null);
  const [caretakerReviews, setCaretakerReviews] = useState([]);
  const [isCaretakerFound, setIsCaretakerFound] = useState(true);

  useEffect(() => {
    if (typeof props.location.state === "undefined") {
      fetchCaretaker(caretakerId);
    } else {
      let { tempCaretaker } = props.location.state;
      setCaretaker(tempCaretaker);
    }
    fetchCaretakerUser(caretakerId);
    fetchCaretakerReviews(caretakerId);
  }, [caretakerId, props.location]);

  const numberFormatter = new Intl.NumberFormat("en-In");

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const fetchCaretaker = async (caretakerID) => {
    await GetCaretakersByAvgReview([], caretakerID)
      .then(({ data: foundCaretaker }) => {
        setCaretaker(foundCaretaker?.[0]);
        setIsCaretakerFound(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsCaretakerFound(false);
        }
        console.error(error);
      });
  };

  const fetchCaretakerUser = async (targetUserId) => {
    await GetUserByTargetUserIdAPI(targetUserId)
      .then(({ data: foundUser }) => {
        setCaretakerUser(foundUser);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsCaretakerFound(false);
        }
        console.error(error);
      });
  };

  const fetchCaretakerReviews = async (reviewOfId) => {
    await GetReviewsWithUserDataAPI(reviewOfId, "Caretaker")
      .then(({ data: foundReviews }) => {
        setCaretakerReviews(foundReviews);
      })
      .catch((error) => {
        console.error(error);
        setCaretakerReviews([]);
      });
  };

  const renderReviews = () => {
    if (caretakerReviews.length === 0) {
      return <legend>There are no reviews, yet.</legend>;
    }
    return caretakerReviews.map((caretakerReview, index) => {
      return (
        <Review
          reviewUser={caretakerReview}
          key={caretakerReview.caretakerId ?? index}
          index={index}
          setReviews={setCaretakerReviews}
          reviews={caretakerReviews}
        />
      );
    });
  };

  const renderCaretakerContent = () => {
    if (!isCaretakerFound) {
      return (
        <p className={"not-found-message"}>
          404: Sorry, this page is not available!
        </p>
      );
    }
    if (caretaker === null || caretakerUser === null) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return (
      <div uk-grid={""} className={"section individual-grid"}>
        <div className={"uk-width-2-5@l"}>
          <img
            src={`/${caretaker.picturePath}`}
            alt={`Caretaker: ${caretaker.firstName} ${caretaker.lastName}`}
            title={`Caretaker: ${caretaker.firstName} ${caretaker.lastName}`}
            className={"profile-pic"}
          />
          <div className={"info-contact"}>
            <h3>Contact details:</h3>
            <div>
              <span className={"contact-span"}>
                <span uk-icon={"icon: mail; ratio: 2"} />
                &nbsp; &nbsp;
                <a href={`mailto:${caretakerUser.email}`}>
                  {caretakerUser.email}
                </a>
              </span>
              <span className={"contact-span"}>
                <span uk-icon={"icon: receiver; ratio: 2"} />
                &nbsp; &nbsp;
                <a href={`tel:${caretakerUser.phoneNumber}`}>
                  {caretakerUser.phoneNumber}
                </a>
              </span>
              <span className={"contact-span"}>
                <span uk-icon={"icon: location; ratio: 2"} />
                &nbsp; &nbsp;
                <span>{caretaker.address}</span>
              </span>
            </div>
            <hr />
          </div>
        </div>
        <div className={"uk-width-3-5@l"}>
          <h1 className={"info-name"}>
            Dr. {caretaker.firstName} {caretaker.lastName}{" "}
            {caretaker.reviewAvg > 4 && (
              <span className={"uk-label label"}>Highly Rated</span>
            )}
          </h1>
          <h3 className={"info-charge"}>
            {currencyFormatter.format(caretaker.charge)}/
            {caretaker.chargeDuration}
          </h3>
          <div className={"info-ratings"}>
            <StarRatings rating={Number(caretaker.reviewAvg)} />
          </div>
          <div>
            <h5 className={"info-ratings-num"}>
              {caretaker.reviewAvg?.toFixed(3)} (
              {numberFormatter.format(caretaker.reviewCount)} review
              {(caretaker.reviewCount === 0 || caretaker.reviewCount > 1) &&
                "s"}
              )
            </h5>
          </div>
          <hr />
          <h5>Location: {caretaker.location}</h5>
          <h4>About Dr. {caretaker.firstName}:</h4>
          <p>{caretaker.about}</p>
          <hr />
          <h4>Add a review:</h4>
          {(() => {
            let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser) {
              if (loggedInUser.user?.targetUserId === caretakerId) {
                return (
                  <legend>You cannot review your own caretaker profile.</legend>
                );
              }
              return (
                <AddReview
                  loggedUser={loggedInUser}
                  reviewType={"Caretaker"}
                  reviewOfId={caretakerId}
                  setReviews={setCaretakerReviews}
                  reviews={caretakerReviews}
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

  return renderCaretakerContent();
};

export default CaretakerPage;
