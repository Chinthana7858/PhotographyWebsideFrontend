

import { useParams } from "react-router";
import NavBar from "../Ui/Templates/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Ui/Atoms/Buttons";
import Footer from "../Ui/Templates/Footer";
import { MdOutlineUnpublished} from "react-icons/md";


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


function PublishedBlog() {

  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [subTopic, setSubtopic] = useState<BlogSubTopic[]>([]);



  const unpublish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm("Are you sure you want to unpublish this blog?");
  
    if (userConfirmed) {
      const formData = new FormData();
      formData.append("newIsPublished", "false");
  
      try {
        const response = await axios.put(`https://chinthanaphotography.azurewebsites.net/api/v1/blog/${blogId}/updateIsPublished`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Updated successfully!");
        console.log("Updated successfully!", response.data);
        window.location.href = "/Blogs/Pw-Admin";
      } catch (error) {
        alert("Error updating title. Please try again.");
        console.error("Error updating title:", error);
      }
    } 
  };



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
          <NavBar/>
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

        <form onSubmit={unpublish}>
        <div className="pt-10 text-4xl text-center text-slate-700">
          <Button
            name={'Unpublish'} 
            buttonType={'tab-red'} 
            size={'lg'}
            padding={'3'}
            type="submit" 
            icon={MdOutlineUnpublished}
          />
        </div>
        </form>

          <div className="mt-[5vw]">
          <Footer/>
          </div>

      </div>
    );
  }
  export default PublishedBlog;
  