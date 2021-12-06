import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../css/IndividualPage.css";
import { GetNGOsByAvgReviewAPI } from "../apis/NGO";
import { GetUserByTargetUserIdAPI } from "../apis/User";
import { GetReviewsWithUserDataAPI } from "../apis/Review";
import AddReview from "./AddReview";
import Review from "./Review";
import { Link } from "react-router-dom";

const NGOPage = (props) => {
  const { ngoId } = props.match.params;
  const [NGO, setNGO] = useState(null);
  const [NGOUser, setNGOUser] = useState(null);
  const [NGOReviews, setNGOReviews] = useState([]);
  const [isNGOFound, setIsNGOFound] = useState(true);

  useEffect(() => {
    if (typeof props.location.state === "undefined") {
      fetchNGO(ngoId);
    } else {
      let { tempNGO } = props.location.state;
      setNGO(tempNGO);
    }
    fetchNGOUser(ngoId);
    fetchNGOReviews(ngoId);
  }, [ngoId, props.location]);

  const numberFormatter = new Intl.NumberFormat("en-IN");

  const fetchNGO = async (NGOID) => {
    await GetNGOsByAvgReviewAPI([], NGOID)
      .then(({ data: foundNGO }) => {
        setNGO(foundNGO?.[0]);
        setIsNGOFound(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsNGOFound(false);
        }
        console.error(error);
      });
  };

  const fetchNGOUser = async (targetUserId) => {
    await GetUserByTargetUserIdAPI(targetUserId)
      .then(({ data: foundUser }) => {
        setNGOUser(foundUser);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setNGOUser(false);
        }
        console.error(error);
      });
  };

  const fetchNGOReviews = async (reviewOfId) => {
    await GetReviewsWithUserDataAPI(reviewOfId, "NGO")
      .then(({ data: foundReviews }) => {
        setNGOReviews(foundReviews);
      })
      .catch((error) => {
        console.error(error);
        setNGOReviews([]);
      });
  };

  const renderReviews = () => {
    if (NGOReviews.length === 0) {
      return <legend>There are no reviews, yet.</legend>;
    }
    return NGOReviews.map((NGOReview, index) => {
      return (
        <Review
          reviewUser={NGOReview}
          key={NGOReview.ngoId}
          index={index}
          setReviews={setNGOReviews}
          reviews={NGOReviews}
        />
      );
    });
  };

  const renderNGOContent = () => {
    if (!isNGOFound) {
      return (
        <p className={"not-found-message"}>
          404: Sorry, this page is not available!
        </p>
      );
    }
    if (NGO === null || NGOUser === null) {
      return <span uk-spinner={"ratio: 4.5"} />;
    }
    return (
      <div uk-grid={""} className={"section individual-grid"}>
        <div className={"uk-width-2-5@l"}>
          <img
            src={`/${NGO.picturePath}`}
            alt={`NGO: ${NGO.name}`}
            title={`NGO: ${NGO.name}`}
            className={"profile-pic"}
          />
          <div className={"info-contact"}>
            <h3>Contact details:</h3>
            <div>
              <span>
                <span uk-icon={"icon: mail; ratio: 2"} />
                &nbsp; &nbsp;
                <a href={`mailto:${NGOUser.email}`}>{NGOUser.email}</a>
              </span>
              <br />
              <span>
                <span uk-icon={"icon: receiver; ratio: 2"} />
                &nbsp; &nbsp;
                <a href={`tel:${NGOUser.phoneNumber}`}>{NGOUser.phoneNumber}</a>
              </span>
            </div>
            <hr />
          </div>
          <div>
            <h3>To Donate:</h3>
            <div>
              <span>Account Number: {NGO.accountNumber}</span>
              <br />
              <span>IFS Code: {NGO.bankIFSC}</span>
              <br />
              <span>UPI: {NGO.upiId}</span>
            </div>
            <hr />
          </div>
        </div>
        <div className={"uk-width-3-5@l"}>
          <h1 className={"info-name"}>
            {NGO.name}
            {NGO.reviewAvg > 4 && (
              <span className={"uk-label label"}>Highly Rated</span>
            )}
          </h1>
          <div className={"info-ratings"}>
            <StarRatings rating={Number(NGO.reviewAvg)} />
          </div>
          <div>
            <h5 className={"info-ratings-num"}>
              {NGO.reviewAvg?.toFixed(3)} (
              {numberFormatter.format(NGO.reviewCount)} review
              {(NGO.reviewCount === 0 || NGO.reviewCount > 1) && "s"})
            </h5>
          </div>
          <hr />
          <h5>Location: {NGO.location}</h5>
          <h5 className={"address-title"}>Address:</h5>
          <span>{NGO.address}</span>
          <h4>About {NGO.name}:</h4>
          <p>{NGO.about}</p>
          <hr />
          <h4>Add a review:</h4>
          {(() => {
            let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser) {
              if (loggedInUser.user?.targetUserId === ngoId) {
                return (
                  <legend>You cannot review your own NGO profile.</legend>
                );
              }
              return (
                <AddReview
                  loggedUser={loggedInUser}
                  reviewType={"NGO"}
                  reviewOfId={ngoId}
                  setReviews={setNGOReviews}
                  reviews={NGOReviews}
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

  return renderNGOContent();
};

export default NGOPage;
