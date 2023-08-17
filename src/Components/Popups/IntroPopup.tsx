import React, { useState } from "react";
import { SubmitButton } from "../Ui/Atoms/Buttons";
import axios from "axios";

function IntroPopup(props: {intro: string}) {
  // Define state to hold the input field values
  const [formValues, setFormValues] = useState({
    introduction: props.intro,
  });

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      // Send the form data to the backend using Axios
      const response = await axios.put(`https://chinthanaphotography.azurewebsites.net/api/v1/details/1/introduction`, formValues, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });
  
      // Handle the server's response
      const data = response.data;
      console.log('Server response:', data);
  
      // Reset the form values
      setFormValues({
        introduction: "",
      });
    } catch (error) {
      // Handle any errors that occur during the HTTP request
      console.error('Error:', error);
    }
  };
  

  // Handle input field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <div className="bg-blue-50">
        <h1 className="pb-5 text-xl font-semibold text-center text-slate-700">Update introduction</h1>
        <div className="text-center">
          <form onSubmit={handleSubmit} className="p-7">
            <textarea
              name="introduction"
              value={formValues.introduction}
              className="w-full p-2 border rounded-md border-slate-400"
              onChange={handleInputChange}
              rows={20}
          
            />
            <div className="text-center">
              <button type="submit" onClick={() => window.location.reload()}>
                <SubmitButton />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default IntroPopup;
