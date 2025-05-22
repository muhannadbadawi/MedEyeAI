import api from "./axios"; // your axios instance for making API calls
const user = localStorage.getItem("user");
const userData = user ? JSON.parse(user) : null;
// Define the uploadImage function

export const dashboardStats = async () => {
  const response = await api.get(`/dashboardStats`);
  console.log(response);
    return response.data as {total_users: number, total_predictions: number}
};

