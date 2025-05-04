import api from "./axios"; // your axios instance for making API calls
import { message } from "antd";

// Define the uploadImage function
export const uploadImage = async (imageFile: File) => {
  try {
    // Create a FormData object to append the image
    const formData = new FormData();
    formData.append("image", imageFile);

    // Send the image to the Flask API
    const response = await api.post("/api/upload", formData, {
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
