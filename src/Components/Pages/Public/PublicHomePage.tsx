

import axios from "axios";
import { useEffect, useState } from "react";
import BasicPhotoPopup from "../../Popups/BasicPhotoPopup";
import IntroPopup from "../../Popups/IntroPopup";
import { CloseButton } from "../../Ui/Atoms/Buttons";
import Footer from "../../Ui/Templates/Footer";
import PublicNavBar from "../../Ui/Templates/PublicNavBar";
import PublicSlider from "../../Ui/Templates/PublicSlider";
import { Link } from "react-router-dom";

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


interface Portfolio {
  id: string;
  portfolioName:string;
  about: string;
  coverImgUrl:string;
  dateTime:string;
}

interface Blog  {
  id: string,
  title: string,
  description: string,
  publishDate: string,
  blogPhotoUrl: string,
  isPublished: boolean,
};

function PublicHomePage() {
  const [visibleChangeIntro, setVisibleChangeIntro] = useState(false);
  const [visibleChangeIntroPhoto, setVisibleChangeIntroPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [details, setDetails] = useState<Details | null>(null);
  const detailsId = "1";
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    // Fetch Latest 2 portfolios from the API
    axios
      .get(`https://chinthanaphotography.azurewebsites.net/api/v1/portfolio/latest2`)
      .then((response) => {
        setPortfolio(response.data);
      })
      .catch((error) => {
        console.error("Error fetching portfolios:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch Latest 2 blogs from the API
    axios
      .get(`https://chinthanaphotography.azurewebsites.net/api/v1/blog/lastTwoPublished`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching  blogs:", error);
      });
  }, []);


  // Fetch the photo URL from the server when the component mounts
  useEffect(() => {
    fetchPhotoUrl();
  }, []);

  const fetchPhotoUrl = async () => {
    try {
      const response = await axios.get("https://chinthanaphotography.azurewebsites.net/api/v1/images/introPhoto");
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

  function formatDate(datetimeStr: string): string {
    const date = new Date(datetimeStr);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${month}/${day}`;
  }

  return (
    <div className="flex-col">
      <div className='fixed z-20 w-full'>
        <PublicNavBar/>
      </div>
      <div className="pt-24 pb-4">
        <PublicSlider/>
      </div>
      <div className="" >

       <div className="flex flex-col my-5 md:flex-row">

       <div className=" pt-[1vw] basis-1/2">
          <div>
          <h2 className="px-5 font-serif text-2xl text-slate-600">
            Welcome to
          </h2>
          <h2 className="px-5 font-serif text-2xl text-slate-600">
            Chinthana Prabhashitha Travel Photography
          </h2>
          <h3 className="px-5 text-justify">
          {details.introduction}
          </h3>
          </div>

        </div>
        
        <div className="relative my-5 bg-cover px-44 py-36 basis-1/2" style={{
                        backgroundImage: `url(${photoUrl})`,
                      }}>
        </div>
        </div> 

        <div className="text-center pt-[2vh] text-4xl text-slate-700">Whats New</div>
        <div className="flex p-6 xs:p-4 xs:flex-col">
          <div className="p-1 basis-1/2">
          <tbody>
        <div className="grid grid-cols-2 gap-3">
        {portfolio
        .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
        .map((portfolio) => (
        <Link key={portfolio.id} to={`/Portfolio/${portfolio.id}`}>
          <div className="scale-100 hover:opacity-95 hover:scale-105">
            <span className="flex">
              <span className="font-semibold text-md text-slate-600 xs:text-xs sm:text-md basis-1/2">
              {portfolio.portfolioName}
              </span>
              <span className="pr-2 text-sm font-semibold text-right opacity-60 basis-1/2 text-blue-950 xs:text-xs">
              {formatDate(portfolio.dateTime)}
              </span>
            </span>
            <div className="">
            <img
            src={portfolio.coverImgUrl}
            alt={`Image ${portfolio.id}`}
            className="aspect-[3/2]"
            />
            </div>
          </div>
        </Link>
        ))}
        </div>
        </tbody>
          </div>
          <div className="p-2 basis-1/2">
          <tbody>
        <div className="grid grid-cols-2 gap-3">
        {blog
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .map((blog) => (
        <Link key={blog.id} to={`/PublishedBlog/${blog.id}`}>
          <div className="scale-100 hover:opacity-95 hover:scale-105">
            <span className="flex">
              <span className="font-semibold text-md text-slate-600 xs:text-xs sm:text-md basis-1/2">
              {blog.title}
              </span>
              <span className="pr-2 text-sm font-semibold text-right opacity-60 basis-1/2 text-blue-950 xs:text-xs">
              {formatDate(blog.publishDate)}
              </span>
            </span>
            <div className="">
            <img
            src={blog.blogPhotoUrl}
            alt={`Image ${blog.id}`}
            className="aspect-[3/2]"
            />
            </div>
          </div>
        </Link>
        ))}
        </div>
        </tbody>
          </div>
        </div>


        <div className="flex flex-col md:flex-row">

        <Link to="/Portfolio" className="w-full h-[30vh] bg-cover cursor-pointer hover:scale-95 flex flex-col justify-center items-center md:h-[50vh]">
        <div className="w-full h-[30vh] bg-cover cursor-pointer hover:scale-95 flex flex-col justify-center items-center md:h-[50vh]" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}https://i.imgur.com/OM7VTcn.jpg)` }}>
        <div className="flex items-center">
        <div className="font-bold text-slate-300 text-7xl md:text-9xl">Gallery</div>
        </div> 
        </div>
        </Link>

        <Link to="/Blogs" className="w-full h-[30vh] bg-cover cursor-pointer hover:scale-95 flex flex-col justify-center items-center md:h-[50vh]">
        <div className="w-full h-[30vh] bg-cover cursor-pointer hover:scale-95 flex flex-col justify-center items-center md:h-[50vh]" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}https://i.imgur.com/kri7cZJ.jpg)` }}>
        <div className="flex items-center">
        <div className="font-bold text-slate-300 text-7xl md:text-9xl">Articles</div>
        </div> 
        </div>
        </Link>
      

     
       </div>





      </div>
      <div className="mt-[5vw]">
        <Footer/>
      </div>

      {visibleChangeIntro && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-[90vw] h-[95%] rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleChangeIntro(false)}><CloseButton/></button></div>
          <IntroPopup intro={details.introduction}/>
          </div>
        </div>
      )}
      {visibleChangeIntroPhoto && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[55%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleChangeIntroPhoto(false)}><CloseButton/></button></div>
          <BasicPhotoPopup id={"introPhoto"}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicHomePage;
 
