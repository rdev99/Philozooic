import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { UpdateReviewByIdAPI, DeleteReviewByIdAPI } from "../apis/Review";

const Review = (props) => {
  const { reviewUser, index, setReviews, reviews } = props;

  const [isReviewBeingEdited, setIsReviewBeingEdited] = useState(false);
  const [reviewString, setReviewString] = useState(reviewUser.reviewString);
  const [rating, setRating] = useState(reviewUser?.rating ?? 2.5);
  const [errorMessage, setErrorMessage] = useState("");

  const dateFormatter = new Intl.DateTimeFormat("en-In", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const updateReview = async (reviewObj) => {
    delete reviewObj.reviewerData;
    let reviewAfterUpdate = { ...reviewObj, reviewString, rating };
    await UpdateReviewByIdAPI(
      reviewUser.reviewId,
      reviewAfterUpdate,
      loggedInUser.token
    )
      .then(({ data: updatedReview }) => {
        console.log(updatedReview);
        setIsReviewBeingEdited(false);
        reviewUser.reviewString = reviewString;
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 401) {
          setErrorMessage("Edit failed: Session expired. Please login again.");
          setTimeout(() => {
            localStorage.clear();
          }, 1000);
        }
      });
  };

  const deleteReview = async () => {
    await DeleteReviewByIdAPI(reviewUser.reviewId, loggedInUser.token)
      .then(({ data }) => {
        let tempArray = [...reviews];
        tempArray.splice(index, 1);
        setReviews(tempArray);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 401) {
          setErrorMessage(
            "Delete failed: Session expired. Please login again."
          );
          setTimeout(() => {
            localStorage.clear();
          }, 1000);
        }
      });
  };

  const onEditClick = () => {
    setIsReviewBeingEdited(!isReviewBeingEdited);
  };

  const renderReviewOrEditReview = () => {
    if (
      typeof loggedInUser !== "undefined" &&
      loggedInUser !== null &&
      loggedInUser.user.userId === reviewUser?.reviewerData?.[0]?.userId
    ) {
      if (isReviewBeingEdited) {
        if (errorMessage === "") {
          return (
            <>
              <span
                className={"edit-close-icon"}
                uk-icon={"icon: close"}
                onClick={(e) => onEditClick()}
              />
              <span
                className={"delete-icon"}
                uk-icon={"icon: trash"}
                onClick={(e) => deleteReview()}
              />
            </>
          );
        }
        return <legend>{errorMessage}</legend>;
      }
      if (errorMessage === "") {
        return (
          <>
            <span
              className={"edit-close-icon"}
              uk-icon={"icon: pencil"}
              onClick={(e) => onEditClick()}
            />
            <span
              className={"delete-icon"}
              uk-icon={"icon: trash"}
              onClick={(e) => deleteReview()}
            />
          </>
        );
      }
      return <legend>{errorMessage}</legend>;
    }
  };

  return (
    <div className={"uk-card uk-card-default"} key={reviewUser.reviewId}>
      <div className={"uk-card-header"}>
        <div className={"uk-grid-small uk-flex-middle"} uk-grid={""}>
          <div className={"uk-width-auto"}>
            <img
              className={"uk-border-circle"}
              width={"50"}
              height={"50"}
              alt={`${
                reviewUser?.reviewerData?.[0]?.name ?? "Philozooic User"
              }`}
              title={`${
                reviewUser?.reviewerData?.[0]?.name ?? "Philozooic User"
              }`}
              src={
                reviewUser?.reviewerData?.[0]?.picturePath
                  ? `/${reviewUser?.reviewerData?.[0]?.picturePath}`
                  : `/pp-default.jpg`
              }
            />
          </div>
          <div className={"uk-width-expand"}>
            <div className={"review-star-div-desktop"}>
              <StarRatings
                rating={rating >= 0 ? rating : reviewUser?.rating}
                changeRating={
                  isReviewBeingEdited
                    ? (newRating) => setRating(newRating)
                    : () => {}
                }
                starDimension={"17px"}
                starHoverColor={"rgb(109, 122, 130)"}
              />
            </div>
            <h3
              className={"uk-card-title uk-margin-remove-bottom reviewer-name"}
            >
              {reviewUser?.reviewerData?.[0]?.name ?? "Philozooic User"}
            </h3>
            <p className={"uk-text-meta uk-margin-remove-top info-date"}>
              {typeof reviewUser.dateCreated !== "undefined" &&
                dateFormatter.format(new Date(reviewUser.dateCreated))}
            </p>
          </div>
        </div>
        <div className={"review-star-div-mobile"}>
          <StarRatings
            rating={rating >= 0 ? rating : reviewUser?.rating}
            changeRating={
              isReviewBeingEdited
                ? (newRating) => setRating(newRating)
                : () => {}
            }
            starDimension={"17px"}
            starHoverColor={"rgb(109, 122, 130)"}
          />
        </div>
      </div>
      <div className={"uk-card-body review-body"}>
        {renderReviewOrEditReview()}
        {isReviewBeingEdited ? (
          errorMessage === "" ? (
            <>
              <textarea
                className={"uk-textarea"}
                value={reviewString}
                style={{ margin: "7px 0" }}
                onChange={(e) => setReviewString(e.target.value)}
                rows={"3"}
              />
              <button
                onClick={(e) => {
                  updateReview({ ...reviewUser });
                }}
                className={"update-review-btn"}
              >
                Submit
              </button>
            </>
          ) : (
            errorMessage
          )
        ) : (
          <p>{reviewString}</p>
        )}
      </div>
    </div>
  );
};

export default Review;
