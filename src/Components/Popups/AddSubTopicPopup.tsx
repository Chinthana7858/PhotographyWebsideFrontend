import React, { useState, ChangeEventHandler } from "react";
import { SubmitButton } from "../Ui/Atoms/Buttons";
import axios from "axios";

function AddSubTopicPopup(props: { blogId: string}) {
  const [subTopicNo, setSubTopicNo] = useState(Number);
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubTopicNoChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const subTopicNumber = Number(event.target.value); 
    setSubTopicNo(subTopicNumber);
  };

  const handleSubTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSubTitle(event.target.value);
  };

  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!subTitle || !content) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("subTopicNo", subTopicNo.toString());
    formData.append("blogId", props.blogId);
    formData.append("subTitle", subTitle);
    formData.append("content", content);
    
    // Always include the file field, even if no file is selected
    formData.append("file", file || new File([], "dummyfile")); // Use a dummy file if file is null

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://chinthanaphotography.azurewebsites.net/api/v1/blogSubTopic/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Uploaded successfully!");
      console.log("Uploaded successfully!", response.data);
    } catch (error) {
      alert("Error uploading. Please try again.");
      console.error("Error uploading:", error);
    } finally {
      setIsLoading(false);
    }
    window.location.reload();
  };


  const handleWindowResize = () => {
    // Check the window width and set the cols attribute accordingly
    if (window.innerWidth < 768) {
      // For mobile view, set cols to a smaller value (e.g., 40)
      setCols(85);
    } else {
      // For desktop view, set cols to a larger value (e.g., 80)
      setCols(95);
    }
  };

  const [cols, setCols] = useState(40); // Default cols value for desktop view
  window.addEventListener("resize", handleWindowResize);
  
  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-[90%]">
          <div className="mb-2">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="subTopicNo">
              Sub topic number
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="subTopicNo"
              type="number"
              value={subTopicNo}
              onChange={handleSubTopicNoChange}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="subTopic">
              Sub topic
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="subTitle"
              type="text"
              placeholder=""
              value={subTitle}
              onChange={handleSubTitleChange}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="content">
              Content
            </label>
            <textarea
              name="content"
              value={content}
              className="w-full p-2 border rounded-md border-slate-400"
              onChange={handleContentChange}
              rows={10}
            />
            
          </div>
          <div className="mb-2">
          <label className="inline-block mb-2 text-gray-500">
                Upload Image (jpg) (Optional)
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

export default AddSubTopicPopup;
