import Axios from "axios";

export const AddNGOAPI = async (ngo) => {
  return await Axios.post("/ngo", ngo);
};

export const GetNGOByIdAPI = async (ngoId) => {
  return await Axios.get(`/ngo/${ngoId}`);
};

export const GetNGOsByAvgReviewAPI = async (locationArray, ngoId) => {
  return await Axios.post("/ngo/get/review", { locationArray, ngoId });
};

export const UpdateNGOByIdAPI = async (ngoId, ngoAfterUpdate) => {
  return await Axios.put(`/ngo/${ngoId}`, ngoAfterUpdate);
};
