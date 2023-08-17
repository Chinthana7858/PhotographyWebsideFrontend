import React, { useState, ChangeEventHandler } from "react";
import { SubmitButton } from "../Ui/Atoms/Buttons";
import axios from "axios";

function AddPortfolioPopup() {
  const [portfolioName, setPortfolioName] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState<File | null>(null);
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

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPortfolioName(event.target.value);
  };

  const handleAboutChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setAbout(event.target.value);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!portfolioName || !about || !file) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("portfolioName", portfolioName);
    formData.append("about", about);
    formData.append("file", file);
    formData.append("dateTime", getCurrentDateTimeString());

    try {
      setIsLoading(true);
      const response = await axios.post("https://chinthanaphotography.azurewebsites.net/api/v1/portfolio", formData, {
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

  const handleWindowResize = () => {
    // Check the window width and set the cols attribute accordingly
    if (window.innerWidth < 1000) {
      // For mobile view, set cols to a smaller value (e.g., 40)
      setCols(15);
    } else {
      // For desktop view, set cols to a larger value (e.g., 80)
      setCols(35);
    }
  };

  const [cols, setCols] = useState(35); // Default cols value for desktop view
  window.addEventListener("resize", handleWindowResize);
  
  return (
    <>
      <div className="flex justify-center mt-8">
        <form onSubmit={handleSubmit} className="w-1/2">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="portfolioName">
              Portfolio Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="portfolioName"
              type="text"
              placeholder="Portfolio Name"
              value={portfolioName}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="about">
              About
            </label>
            <textarea
              name="about"
              value={about}
              className="border rounded-md border-slate-400"
              onChange={handleAboutChange}
              rows={7}
              cols={cols}
            />
            
          </div>
          <div className="mb-4">
          <label className="inline-block mb-2 text-gray-500">
                Upload Image (jpg)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full border-4 border-dashed h-28 hover:bg-gray-100 hover:border-gray-300">
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

export default AddPortfolioPopup;
