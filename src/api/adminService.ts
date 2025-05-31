import api from "./axios"; // your axios instance for making API calls
// Define the uploadImage function

export const dashboardStats = async () => {
  const response = await api.get(`/dashboardStats`);
  console.log(response);
  return response.data as { total_users: number; total_predictions: number };
};

export const getClients = async () => {
  try {
    const response = await api.get(`/clients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const deleteClient = async (userId: string) => {
  try {
    const response = await api.delete(`/deleteClient/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const editRecommendations = async (recommendations: {
  glaucoma: string;
  diabeticRetinopathy: string;
  cataracts: string;
  normal: string;
}) => {
  try {
    const response = await api.put(`/editRecommendations`, recommendations);
    return response.data;
  } catch (error) {
    console.error("Error editing recommendations:", error);
    throw error;
  }
};
export const getRecommendations = async () => {
  try {
    const response = await api.get(`/getRecommendations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
}
