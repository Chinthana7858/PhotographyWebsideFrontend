import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../Ui/Templates/Footer";
import PublicNavBar from "../../Ui/Templates/PublicNavBar";


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


function PublicPortfolioInside() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [images, setImages] = useState<Images[]>([]);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const openFullscreen = (imageSrc: string) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

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
        <PublicNavBar />
      </div>
      <div className="md:pt-[10%] sm:pt-[20%] xs:pt-[25%] pl-[3%]">
        <div className="text-center py-[2vh] md:text-5xl xs:text-3xl sm:text-4xl text-slate-700">{portfolio?.portfolioName}</div>
       
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
        onClick={() => openFullscreen(image.imageUrl)}
        className="cursor-pointer hover:opacity-90"/>
        
        </>
        </div>
        ))}
        </div>


      </div>
        <div className="">
        <Footer/>
        </div>

      {fullscreenImage && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black">
          <img
            alt="gallery"
            className="object-contain max-h-full"
            src={fullscreenImage}
            onClick={closeFullscreen}
          />
        </div>
      )}
    </div>
  );
}
    

export default PublicPortfolioInside;
