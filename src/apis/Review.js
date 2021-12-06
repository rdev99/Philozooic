import Axios from "axios";

export const AddReviewAPI = async (review, token) => {
  return await Axios.post("/review", { review, token });
};

export const UpdateReviewByIdAPI = async (reviewId, review, token) => {
  return await Axios.put(`/review/${reviewId}`, { review, token });
};

export const GetReviewsWithUserDataAPI = async (reviewOfId, reviewType) => {
  return await Axios.get("/review/with-user", {
    params: { reviewType, reviewOfId },
  });
};

export const DeleteReviewByIdAPI = async (reviewId, token) => {
  return await Axios.delete(`/review/${reviewId}`, { data: { token } });
};
