import React, { useState,ChangeEventHandler } from "react";
import { SubmitButton } from "../Ui/Atoms/Buttons";
import axios from "axios";

function UpdateBlogSubTitlePopup(props: { SubblogId: string,Subtitle:string}) {
  const [subtitle, setsubtitle] = useState(props.Subtitle);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setsubtitle(event.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

 

    const formData = new FormData();
    formData.append("subtitle", subtitle);

    try {
      setIsLoading(true);
      const response = await axios.put(`https://chinthanaphotography.azurewebsites.net/api/v1/blogSubTopic/${props.SubblogId}/updateSubTitle`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Updated successfully!");
      console.log("Updated successfully!", response.data);
    } catch (error) {
      alert("Error updatingg title. Please try again.");
      console.error("Error updating title:", error);
    } finally {
      setIsLoading(false); 
    }
    window.location.reload();
  };


  return (
    <>
      <div className="flex justify-center mt-8">
        <form onSubmit={handleSubmit} className="w-[90%]">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="Title">
              Title
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="subtitle"
              type="text"
              placeholder="Title"
              value={subtitle}
              onChange={handleSubTitleChange}
            />
          </div>
          <div className="flex items-center justify-center">
          {!isLoading && <button  type="submit"><SubmitButton/></button>}
          {isLoading && <p className='font-medium text-blue-700'>Updating...</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateBlogSubTitlePopup;