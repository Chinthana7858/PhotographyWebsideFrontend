import React, { useState, ChangeEventHandler } from "react";
import { SubmitButton } from "../Ui/Atoms/Buttons";
import axios from "axios";

function AddBlogPopup() {
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentDateTimeString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    settitle(event.target.value);
  };

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title ||!description|| !file) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("isPublished", isPublished.toString());
    formData.append("publishDate", getCurrentDateTimeString());

    try {
      setIsLoading(true);
      const response = await axios.post("https://chinthanaphotography.azurewebsites.net/api/v1/blog/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Uploaded successfully!");
      console.log("Uploaded successfully!", response.data);
    } catch (error) {
      alert("Error uploading portfolio. Please try again.");
      console.error("Error uploading portfolio:", error);
    } finally {
      setIsLoading(false); 
    }
    window.location.reload();
  };


  
  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-[90%]">
          <div className="mb-2">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="Title">
              Title
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="Title">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              className="w-full p-2 border rounded-md border-slate-400"
              onChange={handleDescriptionChange}
              rows={14}
            />
          </div>
          <div className="mb-2">
          <label className="inline-block mb-2 text-gray-500">
                Upload Image (jpg)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-12 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center">
                    
                    <p className="pt-3 text-sm tracking-wider text-gray-400 group-hover:text-gray-800">
                      {file ? file.name : "Select a photo"}
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
          <div className="flex items-center justify-center">
          {!isLoading && <button  type="submit"><SubmitButton/></button>}
          {isLoading && <p className='font-medium text-blue-700'>Uploading...</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBlogPopup;
