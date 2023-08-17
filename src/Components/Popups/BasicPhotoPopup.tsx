import React, { useState, ChangeEvent } from "react";
import { SubmitButton } from "../Ui/Atoms/Buttons";
import axios from "axios";

function BasicPhotoPopup(props: { id: string}) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle file input change
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]; // Use optional chaining to handle null/undefined values
      if (file) {
        setSelectedImage(file);
      }
    };
  
    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (selectedImage) {
        try {
          setIsLoading(true);
          // Create a FormData object to send the selected image file
          const formData = new FormData();
          formData.append("file", selectedImage);
          formData.append("id",props.id);
  
          // Send the form data to the backend using Axios
          const response = await axios.post(
            "https://chinthanaphotography.azurewebsites.net/api/v1/images/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          // Handle the server's response
          const data = response.data;
          console.log("Server response:", data);
  
          // Show an alert with the success message
          alert("Image uploaded successfully!");
  
          // Reset the selected image after successful upload
          setSelectedImage(null);
          window.location.reload();
        } catch (error) {
          // Handle any errors that occur during the HTTP request
          console.error("Error:", error);
  
          // Show an alert with the error message
          alert("Error uploading image. Please try again later.");
        } finally {
          setIsLoading(false); 
        }
      }
    };

  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="w-full rounded-lg shadow-xl bg-gray-50 md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="m-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload Image (jpg, jpeg)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      {selectedImage ? selectedImage.name : "Select a photo"}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <div className="py-3 text-center">
              {!isLoading && <button  type="submit"disabled={!selectedImage}><SubmitButton/></button>}
              {isLoading && <p className='font-medium text-blue-700'>Uploading...</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BasicPhotoPopup;
