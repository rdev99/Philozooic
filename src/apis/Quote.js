import Axios from "axios";

export const AddQuoteAPI = async (quote) => {
  return await Axios.post("/quote", quote);
};

export const GetQuoteDataAPI = async (type) => {
  return await Axios.get(`/quote/by/${type}`);
};
