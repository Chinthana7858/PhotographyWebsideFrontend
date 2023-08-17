
import { useEffect, useState } from "react";
import { ChangeButton, CloseButton } from "../Ui/Atoms/Buttons";
import Footer from "../Ui/Templates/Footer";
import NavBar from "../Ui/Templates/NavBar";
import axios from "axios";
import BasicPhotoPopup from "../Popups/BasicPhotoPopup";

interface Details {
  detailsId: string;
  name: string;
  email: string;
  password: string;
  introduction: string;
  fbLink: string;
  instergramLink: string;
  shutterstockLink: string;
  twitterLink: string;
}

function About() {
  const [visibleChangeAboutPhoto, setVisibleChangeAboutPhoto] = useState(false);
  const [details, setDetails] = useState<Details | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const detailsId = "1"; // Replace this with the desired detailsId
 // Fetch the photo URL from the server when the component mounts
 useEffect(() => {
  fetchPhotoUrl();
}, []);

const fetchPhotoUrl = async () => {
  try {
    const response = await axios.get("https://chinthanaphotography.azurewebsites.net/api/v1/images/aboutPhoto");
    setPhotoUrl(response.data.imageUrl);
  } catch (error) {
    console.error("Error fetching photo URL:", error);
  }
};

  useEffect(() => {
    // Fetch the details by detailsId
    getDetailsById(detailsId);
  }, [detailsId]);

  const getDetailsById = async (detailsId: string) => {
    try {
      const response = await axios.get<Details>(`https://chinthanaphotography.azurewebsites.net/api/v1/details/${detailsId}`);
      setDetails(response.data);
    } catch (error) {
      console.error("Error:", error);
      setDetails(null);
    }
  };

  if (!details) {
    // Render a loading state or handle the absence of details
    return <div>Loading...</div>;
  }

    return (
      <div>
        <div className='fixed z-20 w-full'>
          <NavBar/>
        </div>

        <div className="lg:flex-row flex flex-col w-[100vw] h-full  bg-slate-400">
          <div className="h-full basis-1/2 lg:pb-[17vh] pb-0">
          <h1 className="text-center pt-[20vh] text-3xl text-slate-700">ABOUT</h1>
          <div className="p-10 text-justify">
           {details.introduction}
          </div>
          </div>
          <div className="h-full basis-1/2">
          <img
                  alt="About"
                  className="block object-cover object-center w-full h-full lg:pt-[10vh] pt-0"
                  src={photoUrl??''}
                />
                   <button onClick={() => { setVisibleChangeAboutPhoto(true)}} className="px-5">
                   <ChangeButton/>
                   </button>
          </div>
        </div>
        <div className="">
        <Footer/>
      </div>
      {visibleChangeAboutPhoto && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[55%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleChangeAboutPhoto(false)}><CloseButton/></button></div>
          <BasicPhotoPopup id={"aboutPhoto"}/>
          </div>
        </div>
      )}
      </div> 
    );
  }
  export default About;
  