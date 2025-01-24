import { getUserDetails } from "../../api/userApi";

export const fetchUser = async (userId) => {
  return await getUserDetails(userId);
};
