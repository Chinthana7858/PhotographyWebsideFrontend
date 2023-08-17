import {Card} from "@material-tailwind/react";
import Footer from "../Ui/Templates/Footer";
import { ChangeButton, CloseButton } from "../Ui/Atoms/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import BasicPhotoPopup from "../Popups/BasicPhotoPopup";
import NavBar from "../Ui/Templates/NavBar";
import MessageViewPopup from "../Popups/MessageViewPopup";

interface Message {
  id: string;
  senderName:string;
  senderEmail: string;
  subject:string;
  message:string;
  date:string;
  read:boolean;
}

function Contact() {
  const [visibleChangeContactPhoto, setVisibleChangeContactPhoto] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] =useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;
  const pageCount = Math.ceil(messages.length / pageSize);


  const handleMessageRead = async (e: React.FormEvent, messageId: string) => {
    e.preventDefault();
  
    try {
      console.log('tried')
      const response = await axios.put(`https://chinthanaphotography.azurewebsites.net/api/v1/message/${messageId}/mark-as-read`);
      
      // Handle the response as needed
      console.log("Message marked as read:", response.data);
    } catch (error) {
      console.error("Error marking message as read:", error);
      // Handle error, e.g., show an error message to the user
    }
  };
  

  useEffect(() => {
    // Fetch messages from the API
    axios
      .get(`https://chinthanaphotography.azurewebsites.net/api/v1/message`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

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

  
  function formatDate(datetimeStr: string): string {
    const date = new Date(datetimeStr);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedMessages = messages.slice(startIndex, endIndex);
    return (
      <div>
        <div className='fixed z-20 w-full'>
          <NavBar/>
        </div>
        <div className="lg:flex-row flex flex-col w-[100vw] h-full  bg-slate-300 ">
          <div className="h-full basis-1/2 lg:pb-[17vh] pb-0">
          

          <div className="text-center">
          <Card color="transparent" shadow={false}>

         <div className="lg:pt-[20vh] pt-28 px-10">
         <h1 className="text-center pt-[1vh] text-3xl text-slate-500 font-semibold">Messages</h1>

    <div className="relative overflow-x-auto min-h-[60vh]">
    <table className="w-full text-sm text-blue-900 font-mediumtext-left dark:text-gray-400">
    <tbody>
            {displayedMessages
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((message) => (
              <tr 
              onClick={(e) => {
                setMessage([message]);
                setVisibleMessage(true);
                handleMessageRead(e, message.id);
              }}
              
              
              key={message.id}
              className={`className="border-bdark:border-gray-700"
               ${
                message.read
                  ? "bg-green-200 hover:bg-green-100"
                  : "bg-red-200 hover:bg-red-100"
              } 
              border border-slate-300 cursor-pointer`}
            >
                  <td className="px-6 py-4 text-left">
                    <div className="flex-col">
                      <div className="text-xs opacity-70 basis-1/3">{formatDate(message.date)}</div>
                      <div className="text-base basis-2/3">{message.senderName}</div>
                    </div>
                    </td>
                <td className="px-6 py-4 text-left">
                 {message.subject.length > 50 ? (
                 <div>
                 {message.subject.substring(0, 50)}
                 <span className="font-semibold"> see more...</span>
                 </div>
                 ) : (
                 message.subject.substring(0, 50)
                 )}
                 </td>
                  </tr>
             ))}
        </tbody>
     </table>
     </div>


        <div className="static flex justify-center bottom-10">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
         
      </div>
        </Card>
        
        
        </div>
          </div>
          <div className="object-center h-full basis-1/2">
          <img
                  alt="Contact"
                  className="block object-cover object-center w-auto max-h-[80vh] lg:pt-[26vh] pt-00 "
                  src={photoUrl??''}
                />
                <button onClick={() => { setVisibleChangeContactPhoto(true)}}>
                <ChangeButton/>
                </button>
          </div>
        </div>
        <div className="">
        <Footer/>
      </div>
      {visibleChangeContactPhoto && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[55%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleChangeContactPhoto(false)}><CloseButton/></button></div>
          <BasicPhotoPopup id={"contactPhoto"}/>
          </div>
        </div>
      )}

{visibleMessage && (
  <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
    <div className="md:w-[60%] xs:w-[75%] sm:w-[60%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
      <div className="pl-[95%]">
        <button onClick={() => setVisibleMessage(false)}>
          <CloseButton />
        </button>
      </div>
      <MessageViewPopup message={message[0]} />
    </div>
  </div>
)}

      </div>
    );
  }
  export default Contact;
  