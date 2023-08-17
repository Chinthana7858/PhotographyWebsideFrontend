

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../Ui/Templates/Footer";
import PublicNavBar from "../../Ui/Templates/PublicNavBar";


interface Blog  {
  id: string,
  title: string,
  description: string,
  publishDate: string,
  blogPhotoUrl: string,
  isPublished: boolean,
};

interface BlogSubTopic {
  id: string,
  subTopicNo: number,
  blogId: string,
  subTitle: string,
  content: string,
  subTopicPhoto: string,
};


function PublicPublishedBlog() {

  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [subTopic, setSubtopic] = useState<BlogSubTopic[]>([]);



  //Get BlogData by blogId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://chinthanaphotography.azurewebsites.net/api/v1/blog/${blogId}`);
        setBlog(response.data);

      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setBlog(null); 
      }
    };
    fetchData();
  }, [blogId]);

   //Get SubTopicData by blogId
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://chinthanaphotography.azurewebsites.net/api/v1/blogSubTopic/byBlog/${blogId}`);
        setSubtopic(response.data);
      } catch (error) {
        
        console.error("Error fetching subtopic:", error);
      }
    };
    fetchData();
  }, [blogId]);


    return (
      <div>
        <div className='fixed z-20 w-full'>
          <PublicNavBar/>
        </div>
        <div className="pt-[25vh]">
        <div className="text-4xl text-center text-slate-700">{blog?.title}</div>
        </div>
        <div className="px-[20vw] pt-10 text-justify xs:px-[5vw]">
           {blog?.description} 
        </div>
        <div className="flex items-center justify-center">
        <img
                  alt="About"
                  className="block lg:pt-[10vh] px-[20vw] xs:px-[5vw] max-h-[90vh] w-auto"
                  src={blog?.blogPhotoUrl}
                />
        </div>
         <table>
         <tbody>
        <div className="">
        {subTopic &&
        subTopic
        .sort((a, b) => a.subTopicNo - b.subTopicNo)
        .map((subtopic) => (
        <div key={subtopic.id}>
          <div className="">
            <div className="text-2xl text-left text-slate-700 px-[20vw] xs:px-[5vw] pt-[5vh]">
             {subtopic.subTitle}
            </div>
            <div className="px-[20vw] text-justify xs:px-[5vw] ">
              {subtopic.content}
            </div>
            <div className="flex items-center justify-center">
            {subtopic.subTopicPhoto && (
            <img
            src={subtopic.subTopicPhoto}
            alt={`Image ${subtopic.subTopicPhoto}`}
            className="block lg:pt-[10vh] px-[20vw] xs:px-[5vw] max-h-[90vh] w-auto"
            />
            )}
            </div>
          </div>
        </div>
         ))}
        </div>
        </tbody>

         </table>

          <div className="mt-[5vw]">
          <Footer/>
          </div>

      </div>
    );
  }
  export default PublicPublishedBlog;
  