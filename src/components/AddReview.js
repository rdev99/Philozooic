import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { AddReviewAPI } from "../apis/Review";

const AddReview = (props) => {
  const [reviewString, setReviewString] = useState("");
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const { loggedUser, reviewType, reviewOfId, reviews, setReviews } = props;

  const dateFormatter = new Intl.DateTimeFormat("en-In", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const addReview = async () => {
    let review = {
      reviewString,
      rating,
      reviewType,
      reviewOfId,
      reviewerId: loggedUser?.user?.userId,
    };
    await AddReviewAPI(review, loggedUser?.token)
      .then(({ data: addedReview }) => {
        setReviews([
          ...reviews,
          { ...addedReview, reviewerData: [loggedUser.user] },
        ]);
        setReviewString("");
        setErrorMessage("");
        setRating(0);
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          setErrorMessage("Session Expired: Please login again.");
          setTimeout(() => {
            localStorage.clear();
          }, 10000);
        }
      });
  };

  return (
    <div className={"uk-card uk-card-default"}>
      <div className={"uk-card-header"}>
        <div className={"uk-grid-small uk-flex-middle"} uk-grid={""}>
          <div className={"uk-width-auto"}>
            <img
              className={"uk-border-circle"}
              width={"50"}
              height={"50"}
              alt={
                loggedUser?.user?.name
                  ? `${loggedUser?.user?.name}`
                  : "Philozooic User"
              }
              title={
                loggedUser?.user?.name
                  ? `${loggedUser?.user?.name}`
                  : "Philozooic User"
              }
              src={
                loggedUser?.user?.picturePath
                  ? `/${loggedUser?.user?.picturePath}`
                  : `/pp-default.jpg`
              }
            />
          </div>
          <div className={"uk-width-expand"}>
            {errorMessage === "" && (
              <div className={"review-star-div-desktop"}>
                <StarRatings
                  rating={Number(rating)}
                  starDimension={"17px"}
                  changeRating={(newRating) => setRating(newRating)}
                  starHoverColor={"rgb(109, 122, 130)"}
                />
              </div>
            )}
            <h3
              className={"uk-card-title uk-margin-remove-bottom reviewer-name"}
            >
              {loggedUser?.user?.name}
            </h3>
            <p className={"uk-text-meta uk-margin-remove-top info-date"}>
              {dateFormatter.format()}
            </p>
          </div>
        </div>
        <div className={"review-star-div-mobile"}>
          <StarRatings
            rating={Number(rating)}
            starDimension={"17px"}
            changeRating={(newRating) => setRating(newRating)}
            starHoverColor={"rgb(109, 122, 130)"}
          />
        </div>
      </div>
      {errorMessage === "" ? (
        <div className={"uk-card-body review-body"}>
          <textarea
            className={"uk-textarea"}
            rows={"5"}
            placeholder={"Type your review here"}
            onChange={(e) => setReviewString(e.target.value)}
            value={reviewString}
          />
          <div className={"submit-btn-div"}>
            <button
              onClick={(e) => {
                e.preventDefault();
                addReview();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <h6 className={"session-err-message"}>{errorMessage}</h6>
      )}
    </div>
  );
};

export default AddReview;
