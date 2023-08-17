import {Card,Input} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../Ui/Templates/Footer";
import PublicNavBar from "../../Ui/Templates/PublicNavBar";


function PublicContact() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

   // Fetch the photo URL from the server when the component mounts
   useEffect(() => {
    fetchPhotoUrl();
  }, []);

  const fetchPhotoUrl = async () => {
    try {
      const response = await axios.get("https://chinthanaphotography.azurewebsites.net/api/v1/images/contactPhoto");
      setPhotoUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error fetching photo URL:", error);
    }
  };


  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://chinthanaphotography.azurewebsites.net/api/v1/message", {
        senderName,
        senderEmail,
        subject,
        message,
        date: new Date(),
        isRead:false
      });
      alert("Sent message!");
      window.location.reload();

    } catch (error) {
      console.error("Message rror:", error);
      alert("Sending error");
    }
  };

    return (
      <div>
        <div className='fixed z-20 w-full'>
          <PublicNavBar/>
        </div>
        <div className="lg:flex-row flex flex-col w-[100vw] h-full  bg-slate-400 ">
          <div className="h-full basis-1/2 lg:pb-[17vh] pb-0">
          <h1 className="text-center pt-[20vh] text-3xl text-slate-700">CONTACT</h1>
          <div className="p-10 text-center">
          If you have any questions or comments 
          about my artwork, please complete the 
          form below. I will be in touch within 24 hours. 
          I can’t wait to hear from you!
          </div>

          <div className="text-center">
          <Card color="transparent" shadow={false}>
  
         <div className="font-normal">
          Enter your details
         </div>



         <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96 lg:ml-[20%] ml-[7%]" onSubmit={handleMessage}>
        <div className="flex flex-col gap-6 mb-4">
          <label htmlFor="Name" className='text-left'>Name</label>
          <Input size="lg" 
          type="senderName"
          id="senderName"
          autoFocus
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)} />

          <label htmlFor="senderEmail" className='text-left'>E mail</label>
          <Input size="lg" 
          type="senderEmail"
          id="senderEmail"
          autoFocus
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}/>

          <label htmlFor="suvject" className='text-left'>Subject</label>
          <Input size="lg"
          type="subject"
          id="subject"
          autoFocus
          value={subject}
          onChange={(e) => setSubject(e.target.value)} />

        <label htmlFor="message" className='text-left'>Message</label>
        <textarea
        className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-slate-400 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        id="message"
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4} 
        />


        </div>
        <button className="py-3 my-2 text-white bg-blue-700 cursor-pointer px-7 hover:bg-blue-800">
          Send
        </button>
        </form>



        </Card>
        </div>
          </div>
          <div className="h-full basis-1/2">
          <img
                  alt="Contact"
                  className="block object-cover object-center w-auto min-h-[120vh] lg:pt-[10.5vh] pt-0"
                  src={photoUrl??''}
                />
          </div>
        </div>
        <div className="">
        <Footer/>
      </div>
      </div>
    );
  }
  export default PublicContact;
  