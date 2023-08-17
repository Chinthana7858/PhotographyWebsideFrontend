import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../Ui/Templates/NavBar";
import { AddNewButton, CloseButton, DELButton, DELButton2 } from "../Ui/Atoms/Buttons";
import CategoryPhotoPopup from "../Popups/CategoryPhotoPopup";
import Footer from "../Ui/Templates/Footer";


interface Images {
  id: string;
  name:string;
  imageUrl: string;
  category:string;
}

interface Portfolio {
  id: string;
  portfolioName: string;
  about: string;
  coverImgUrl: string;
}

interface BackLinkProps {
  url: string;
  children?: React.ReactNode;
}
const BackLink: React.FC<BackLinkProps> = ({ url, children }) => (
  <a href={url}>{children}</a>
);


function PortfolioInside() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [visibleAddPortfolioPhoto, setVisibleAddPortfolioPhoto] = useState(false);
  const [images, setImages] = useState<Images[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://chinthanaphotography.azurewebsites.net/api/v1/portfolio/${portfolioId}`);
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setPortfolio(null); 
      }
    };

    fetchData();
  }, [portfolioId]);

  const handleDeleteSection= async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this portfolio?');
    if (!isConfirmed) {
      return;
    }
  
    axios
      .delete(`https://chinthanaphotography.azurewebsites.net/api/v1/portfolio/${portfolio?.id}`)
      .then((response) => {
        console.log('Response:', response.data);
        if (response.status===200) {
  
          alert('portfolio deleted successfully!');
  
        } else {
        
          alert('Error deleting portfolio. Please try again later.');
        }
  
        window.location.reload();
      })
      
  };

  const handleDeleteImg = (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this image?');
    if (!isConfirmed) {
      return;
    }
  
    axios
      .delete(`https://chinthanaphotography.azurewebsites.net/api/v1/images/category/${id}`)
      .then((response) => {
        console.log('Response:', response.data);
  

        if (response.status===200) {

          alert('Image deleted successfully!');

        } else {
        
          alert('Error deleting image. Please try again later.');
        }
  
     
        window.location.reload();
      })
      
  };

  useEffect(() => {
    // Fetch images from the API
    axios
      .get(`https://chinthanaphotography.azurewebsites.net/api/v1/images/category/${portfolioId}`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  

  return (
    <div>
      <div className='fixed z-40 w-full'>
        <NavBar />
      </div>
      <div className="md:pt-[10%] sm:pt-[20%] xs:pt-[25%] pl-[3%]">
        <div className="text-center py-[2vh] md:text-5xl xs:text-3xl sm:text-4xl text-slate-700">{portfolio?.portfolioName}</div>
        <div className="text-center py-[2vh] md:text-4xl xs:text-2xl sm:text-3xl text-slate-700"> 
        <button onClick={() => { setVisibleAddPortfolioPhoto(true)}}>
        <AddNewButton />
        </button>
        </div>
       
        <div className="sm:flex xs:flex-col">
          <div className='basis-3/5'>
          <img
                  alt="coverphoto"
                  className="block object-cover object-center md:w-[60vw] sm:w-[100vw] h-auto max-h-[60vh]"
                  src={portfolio?.coverImgUrl}
                />
          </div>
          <div className='font-medium bg-slate-900 basis-2/5 lg:text-lg md:text-sm sm:text-sm xs:text-sm text-slate-100'>    
          <div className="px-6 py-3 text-center">{portfolio?.about}</div>
          <div className="text-center py-[2vh]">-Chinthana Prabhashitha-</div>
          </div>
        </div>

        <div className="z-0 pt-2 columns-2 md:columns-3 lg:columns-3">
        {images.map((image) => (
        <div key={image.id} className="relative mb-4">
        <>
        
        <img src={image.imageUrl} alt={`Image ${image.id}`} 
        className="cursor-pointer hover:opacity-90"/>
        <div className="absolute bottom-0 left-0 flex items-center justify-center w-full h-full font-bold text-white transition-opacity opacity-0 hover:opacity-100">
        <div className="font-medium text-center text-slate-600"><button onClick={()=>{handleDeleteImg(image.id)}}><DELButton2/></button></div>
        </div>
        
        </>
        </div>
        ))}
        </div>


      </div>
        <BackLink url={`/Portfolio/Pw-Admin`}>
          <div className='p-4 text-center bg-red-200'>
          <span className="p-4 font-semibold text-red-600"> Delete this section?</span>
          <button onClick={()=>{handleDeleteSection()}}> <DELButton/></button>
          </div>
        </BackLink>
        <div className="">
        <Footer/>
        </div>

        {visibleAddPortfolioPhoto && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[55%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleAddPortfolioPhoto(false)}><CloseButton/></button></div>
          <CategoryPhotoPopup category={portfolio?.id??''}/>
          </div>
        </div>
      )}
    </div>
  );
}
    

export default PortfolioInside;
