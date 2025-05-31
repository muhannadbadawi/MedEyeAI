import toast from "react-hot-toast";
import api from "./axios";

const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const userData = getStoredUser();

/**
 * Upload an image for analysis
 */
export const uploadImage = async (imageFile: File) => {
  try {
    const user = getStoredUser();
    if (!user) {
      toast.error("User not found. Please log in.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userId", user.id);

    const response = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Image uploaded and analyzed successfully!");
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("There was an error uploading the image.");
    return null;
  }
};

/**
 * Get prediction history of the logged-in user
 */
export const getHistory = async () => {
  try {
    const user = getStoredUser();
    if (!user) {
      toast.error("User not found. Please log in.");
      return null;
    }

    const response = await api.get("/getHistory", {
      params: { email: user.email },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    toast.error("There was an error fetching the history.");
    return null;
  }
};

/**
 * Send OTP to user's email
 */
export const sendOtp = async (email: string) => {
  try {
    return await api.post("/sendOtp", { email });
  } catch (error) {
    console.error("Error sending OTP:", error);
    toast.error("There was an error sending the OTP.");
    return null;
  }
};

/**
 * Reset password
 */
export const resetPassword = async (email: string, newPassword: string) => {
  try {
    return await api.post("/forgetPassword", { email, newPassword });
  } catch (error) {
    console.error("Error resetting password:", error);
    toast.error("There was an error resetting the password.");
    return null;
  }
};

/**
 * Edit user profile
 */
export const editProfile = async (data: {
  email: string;
  name: string;
  age: number;
  gender: string;
  picture: File | null;
}) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("name", data.name);
  formData.append("age", String(data.age));
  formData.append("gender", data.gender);
  if (data.picture) formData.append("picture", data.picture);

  const response = await api.put("/editProfile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return { data: response.data, status: response.status };
};

/**
 * Get user data by ID
 */
export const getUserById = async (userId?: string) => {
  const response = await api.get("/getUserById", {
    params: { id: userId ?? userData?.id },
  });

  return response.data as {
    id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    profile_picture: string;
  };
};

/**
 * Change password
 */
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  return await api.post("/changePassword", {
    ...data,
    email: userData?.email,
  });
};

/**
 * Contact admin
 */
export const sendEmailToAdmin = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await api.post("/contact", data);
    if (response.status === 200) {
      toast.success("Message sent successfully.");
    } else {
      toast.error("Failed to send message.");
    }
    return response;
  } catch (error) {
    console.error("Error sending message to admin:", error);
    toast.error("There was an error sending the message.");
    return null;
  }
};
