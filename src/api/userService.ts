import api from "./axios"; // your axios instance for making API calls
import { message } from "antd";
const user = localStorage.getItem("user");
const userData = user ? JSON.parse(user) : null;
// Define the uploadImage function
export const uploadImage = async (imageFile: File) => {
  try {
    const user = localStorage.getItem("user");
    if (!user) {
      message.error("User not found. Please log in.");
      return null;
    }
    const userId = JSON.parse(user).id; // Extract userId from localStorage
    // Create a FormData object to append the image
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userId", userId); // Optional: append filename

    // Send the image to the Flask API
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Specify form data header
      },
    });

    // Handle the response from the server
    if (response.data) {
      message.success("Image uploaded and analyzed successfully!");
      return response.data; // Return the response containing prediction details
    } else {
      message.error("Image upload failed.");
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    message.error("There was an error uploading the image.");
    return null;
  }
};

export const getHistory = async () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) {
      message.error("User not found. Please log in.");
      return null;
    }
    const email = JSON.parse(user).email; // Extract email from localStorage

    // Send a request to the Flask API to get the history
    const response = await api.get(`/getHistory`, {
      params: { email },
    });

    // Handle the response from the server
    if (response.data) {
      return response.data; // Return the history data
    } else {
      message.error("Failed to fetch history.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    message.error("There was an error fetching the history.");
    return null;
  }
};

export const sendOtp = async (email: string) => {
  try {
    const response = await api.post("/sendOtp", { email });
    return response;
  } catch (error) {
    console.error("Error sending OTP:", error);
    message.error("There was an error sending the OTP.");
    return null;
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await api.post("/forgetPassword", { email, newPassword });
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    message.error("There was an error verifying the OTP.");
    return null;
  }
};

export const editProfile = async (editProfileData: {
  email: string;
  name: string;
  age: number;
  gender: string;
  picture: File | null;
}) => {
  const formData = new FormData();
  formData.append("email", editProfileData.email);
  formData.append("name", editProfileData.name);
  formData.append("age", String(editProfileData.age));
  formData.append("gender", editProfileData.gender);

  if (editProfileData.picture) {
    formData.append("picture", editProfileData.picture);
  }

  // ✅ Add the removePicture flag explicitly

  const response = await api.put("/editProfile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { data: response.data, status: response.status };
};

export const getUserById = async (userId?: string) => {
  const response = await api.get(`/getUserById`, {
    params: { id: userId?? userData.id },
  });
    console.log("response: ", response);

  return response.data as {
    id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    profile_picture: string;
  };
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.post("/changePassword", {...data, email:userData.email});
  return response;
};

export const sendEmailToAdmin = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await api.post("/contact", data);
    if (response.status === 200) {
      message.success("Message sent successfully.");
    } else {
      message.error("Failed to send message.");
    }
    return response;
  } catch (error) {
    console.error("Error sending message to admin:", error);
    message.error("There was an error sending the message.");
    return null;
  }
};

