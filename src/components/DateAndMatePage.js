import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../css/IndividualPage.css";
import { GetPetsByAvgReviewsAPI } from "../apis/Pet";
import { GetUserById } from "../apis/User";
import { GetReviewsWithUserDataAPI } from "../apis/Review";
import AddReview from "./AddReview";
import Review from "./Review";
import { Link } from "react-router-dom";

const DateAndMatePage = (props) => {
  const { petId } = props.match.params;
  const [pet, setPet] = useState(null);
  const [petUser, setPetUser] = useState(null);
  const [petReviews, setPetReviews] = useState([]);
  const [isPetFound, setIsPetFound] = useState(true);

  useEffect(() => {
    if (typeof props.location.state === "undefined") {
      fetchPet(petId);
    } else {
      let { tempPet } = props.location.state;
      setPet(tempPet);
    }
    fetchPetUser(pet?.ownerId);
    fetchPetReviews(petId);
  }, [pet?.ownerId, petId, props.location.state]);

  const numberFormatter = new Intl.NumberFormat("en-IN");

  const fetchPet = async (petID) => {
    await GetPetsByAvgReviewsAPI([], undefined, petID)
      .then(({ data: foundPet }) => {
        console.info(foundPet);
        setPet(foundPet?.[0]);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsPetFound(false);
        }
        console.error(error);
      });
  };

  const fetchPetUser = async (targetUserId) => {
    typeof targetUserId !== "undefined" &&
      (await GetUserById(targetUserId)
        .then(({ data: foundUser }) => {
          setPetUser(foundUser);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setIsPetFound(false);
          }
          console.error(error);
        }));
  };

  const fetchPetReviews = async (reviewOfId) => {
    await GetReviewsWithUserDataAPI(reviewOfId, "Pet")
      .then(({ data: foundReviews }) => {
        setPetReviews(foundReviews);
      })
      .catch((error) => {
        console.error(error);
        setPetReviews([]);
      });
  };

  const renderReviews = () => {
    if (petReviews.length === 0) {
      return <legend>There are no reviews, yet.</legend>;
    }
    return petReviews.map((petReview, index) => {
      return (
        <Review
          reviewUser={petReview}
          key={petReview.petId}
          index={index}
          setReviews={setPetReviews}
          reviews={petReviews}
        />
      );
    });
  };

  const renderPetContent = () => {
    if (!isPetFound) {
      return (
        <p className={"not-found-message"}>
          404: Sorry, this page is not available!
        </p>
      );
    }
    if (pet === null || petUser === null) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return (
      <div uk-grid={""} className={"section individual-grid"}>
        <div className={"uk-width-2-5@l"}>
          <img
            src={`/${pet.picturePath}`}
            alt={`Pet: ${pet.name}`}
            title={`Pet: ${pet.name}`}
            className={"profile-pic"}
          />
          <div className={"info-contact"}>
            <h3>Contact details:</h3>
            <div>
              <span>
                <span uk-icon={"icon: mail; ratio: 2"} />
                &nbsp; &nbsp;
                <a href={`mailto:${petUser.email}`}>{petUser.email}</a>
              </span>
              <br />
              <span>
                <span uk-icon={"icon: receiver; ratio: 2"} />
                &nbsp; &nbsp;
                <a href={`tel:${petUser.phoneNumber}`}>{petUser.phoneNumber}</a>
              </span>
            </div>
            <hr />
          </div>
        </div>
        <div className={"uk-width-3-5@l"}>
          <h1 className={"info-name"}>
            {pet.name}{" "}
            {pet.reviewAvg > 4 && (
              <span className={"uk-label label"}>Highly Rated</span>
            )}
          </h1>
          <h3 className={"info-charge"}>
            Date Status: &nbsp;
            {pet.mateStatus ? (
              <span style={{ color: "green" }}>Available</span>
            ) : (
              <span style={{ color: "red" }}>Unavailable</span>
            )}
          </h3>
          <div className={"info-ratings"}>
            <StarRatings rating={Number(pet.reviewAvg)} />
          </div>
          <div>
            <h5 className={"info-ratings-num"}>
              {pet.reviewAvg?.toFixed(3)} (
              {numberFormatter.format(pet.reviewCount)} review
              {(pet.reviewCount === 0 || pet.reviewCount > 1) && "s"})
            </h5>
          </div>
          <hr />
          <h5>
            Animal: {pet.animalType} | Breed: {pet.breed} | Location:{" "}
            {pet.location}
          </h5>
          <h4>Medical history of {pet.name}:</h4>
          <p>{pet.medicalHistory}</p>
          <hr />
          <h4>Add a review:</h4>
          {(() => {
            let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser) {
              if (loggedInUser.user?.userId === pet.ownerId) {
                return <legend>You cannot review your own pet.</legend>;
              }
              return (
                <AddReview
                  loggedUser={loggedInUser}
                  reviewType={"Pet"}
                  reviewOfId={petId}
                  setReviews={setPetReviews}
                  reviews={petReviews}
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

  return renderPetContent();
};

export default DateAndMatePage;
