import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import { SubmitButton } from "../Ui/Atoms/Buttons";
import axios from "axios";

function UpdateBlogDescriptionpopup(props: { blogId: string,description:string}) {
  const [blogdisc, setBlogdic] = useState(props.description);
  const [isLoading, setIsLoading] = useState(false);


  const handleDiscChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setBlogdic(event.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const formData = new FormData();
    formData.append("description", blogdisc);

    try {
      setIsLoading(true);
      const response = await axios.put(`https://chinthanaphotography.azurewebsites.net/api/v1/blog/description/${props.blogId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Updated successfully!");
      console.log("Updated successfully!", response.data);
    } catch (error) {
      alert("Error updatingg description. Please try again.");
      console.error("Error updating description:", error);
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
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="about">
              Description
            </label>
            <textarea
              name="description"
              value={blogdisc}
              className="w-full p-2 border rounded-md border-slate-400"
              onChange={handleDiscChange}
              rows={20}
            />
            
          </div>
          <div className="flex items-center justify-center">
          {!isLoading && <button  type="submit"><SubmitButton/></button>}
          {isLoading && <p className='font-medium text-blue-700'>Uploading...</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateBlogDescriptionpopup;
