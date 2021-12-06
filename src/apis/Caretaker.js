import Axios from "axios";

export const AddCaretakerAPI = async (caretaker) => {
  return await Axios.post("/caretaker", caretaker);
};

export const GetCaretakerByIdAPI = async (caretakerId) => {
  return await Axios.get(`/caretaker/${caretakerId}`);
};

export const GetCaretakersByAvgReview = async (locationArray) => {
  return await Axios.post("/caretaker/get/review", { locationArray });
};

export const UpdateCaretakerByIdAPI = async (
  caretakerId,
  caretakerAfterUpdate
) => {
  return await Axios.put(`/caretaker/${caretakerId}`, caretakerAfterUpdate);
};
