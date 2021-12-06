import Axios from "axios";

export const GetUserById = async (userId) => {
  return await Axios.get(`/user/${userId}`);
};

export const GetUserByTargetUserIdAPI = async (targetUserId) => {
  return await Axios.get(`/user-target/${targetUserId}`);
};

export const UpdateUserById = async (userId, userAfterUpdate, token) => {
  return await Axios.put(`/user/${userId}`, {
    user: userAfterUpdate,
    token,
  });
};
