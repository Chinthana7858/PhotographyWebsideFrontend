

import { useParams } from "react-router";
import NavBar from "../Ui/Templates/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Button, { ChangeButton, CloseButton, DELButton} from "../Ui/Atoms/Buttons";
import UpdateBlogTitlePopup from "../Popups/UpdateBlogTitlePopup";
import UpdateBlogDescriptionpopup from "../Popups/UpdateBlogDescriptionpopup";
import UpdateBlogPhotoPopup from "../Popups/UpdateBlogPhotoPopup";
import Footer from "../Ui/Templates/Footer";
import AddSubTopicPopup from "../Popups/AddSubTopicPopup";
import { FiEdit } from "react-icons/fi";
import { MdPublish } from "react-icons/md";
import UpdateBlogSubTitlePopup from "../Popups/UpdateBlogSubTitlePopup";
import UpdateBlogSubContentpopup from "../Popups/UpdateBlogSubContentpopup";
import UpdateSubBlogPhotoPopup from "../Popups/UpdateSubBlogPhotoPopup";
import { AiFillDelete } from "react-icons/ai";


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


function UpdateBlog() {

  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [subTopic, setSubtopic] = useState<BlogSubTopic[]>([]);
  const [subTopicId, setSubtopicId] = useState('');
  const [subTopicTitle, setSubtopicTitle] = useState('');
  const [subTopicContent, setSubtopicContent] = useState('');
  const [visibleAddSubTopic, setVisibleAddSubTopic] = useState(false);
  const [visibleUpdateTitle, setVisibleUpdateTitle] = useState(false);
  const [visibleUpdateDisc, setVisibleUpdateDisc] = useState(false);
  const [visibleUpdateBlogPhoto, setVisibleUpdateBlogPhoto] = useState(false);
  const [visibleUpdateSubTitle, setVisibleUpdateSubTitle] = useState(false);
  const [visibleUpdateSubDisc, setVisibleUpdateSubDisc] = useState(false);
  const [visibleUpdateSubBlogPhoto, setVisibleUpdateSubBlogPhoto] = useState(false);

  

  
  const publish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm("Are you sure you want to publish this blog?");
  
    if (userConfirmed) {
      const formData = new FormData();
      formData.append("newIsPublished", "true");
  
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


  const deleteBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm("Are you sure you want to delete this blog?");
  
    if (userConfirmed) {
  
      try {
        const response = await axios.delete(`https://chinthanaphotography.azurewebsites.net/api/v1/blog/${blogId}`, {
        });
        alert("Deleted successfully!");
        console.log("Deleted successfully!", response.data);
        window.location.href = "/Blogs/Pw-Admin";
      } catch (error) {
        alert("Error deleting. Please try again.");
        console.error("Error deleting", error);
      }
    } 
  };
  
  const deleteSubBlog = async (event: React.FormEvent<HTMLFormElement>, subBlogId: string) => {
    event.preventDefault();
  
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm("Are you sure you want to delete this part?");
  
    if (userConfirmed) {
  
      try {
        const response = await axios.delete(`https://chinthanaphotography.azurewebsites.net/api/v1/blogSubTopic/${subBlogId}`, {
        });
        alert("Deleted successfully!");
        console.log("Deleted successfully!", response.data);
        window.location.reload();
      } catch (error) {
        alert("Error deleting. Please try again.");
        console.error("Error deleting", error);
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
        <div className="text-4xl text-center text-slate-700"><button onClick={() => { setVisibleUpdateTitle(true)}}><ChangeButton/></button></div>
        </div>
        <div className="px-[20vw] pt-10 text-justify xs:px-[5vw]">
           {blog?.description} 
           <div>
          <button onClick={() => { setVisibleUpdateDisc(true)}}>
            <ChangeButton/>
          </button>
           </div>
        </div>
        <div className="flex items-center justify-center">
        <img
                  alt="About"
                  className="block lg:pt-[10vh] px-[20vw] xs:px-[5vw] max-h-[90vh] w-auto"
                  src={blog?.blogPhotoUrl}
                />
        </div>
         <div className="px-[20vw] xs:px-[5vw]"><button onClick={() => { setVisibleUpdateBlogPhoto(true)}}><ChangeButton/></button></div>

         <table>
         <tbody>
        <div className="">
        {subTopic &&
        subTopic
        .sort((a, b) => a.subTopicNo - b.subTopicNo)
        .map((subtopic) => (
        <div key={subtopic.id} className="py-5 my-8 bg-slate-300">
          <div className="">
            <div className="text-2xl text-left text-slate-700 px-[20vw] xs:px-[5vw] pt-[5vh]">
             {subtopic.subTopicNo} _ {subtopic.subTitle}
            <div>
          <div className="flex">
            <div className="pr-5">
            <button
             onClick={() => {
             setVisibleUpdateSubTitle(true);
             setSubtopicId(subtopic.id);
             setSubtopicTitle(subtopic.subTitle);
             }}>
            <ChangeButton/>
           </button>
            </div>
            <div>
            <form onSubmit={(event) => deleteSubBlog(event, subtopic.id)}>
           <button
             type="submit">
            <DELButton/>
           </button>
           </form>
            </div>
          </div>
           
           </div>
            </div>
            <div className="px-[20vw] text-justify xs:px-[5vw] ">
              {subtopic.content}
              <div>
              <button 
              onClick={() => { 
                setVisibleUpdateSubDisc(true);
                setSubtopicId(subtopic.id);
                setSubtopicContent(subtopic.content);
              }}>
              <ChangeButton/>
              </button>
            </div>
            </div>
            <div className="">
              {subtopic.subTopicPhoto && ( // Check if subTopicPhoto exists
                <img
                  src={subtopic.subTopicPhoto}
                  alt={`Image ${subtopic.subTopicPhoto}`}
                  className="block object-cover object-center w-full h-full lg:pt-[10vh] px-[20vw] xs:px-[5vw] "
                />
              )}
               {subtopic.subTopicPhoto && ( 
              <div className="px-[20vw] xs:px-[5vw] ">
              <button 
              onClick={() => { 
              setVisibleUpdateSubBlogPhoto(true);
              setSubtopicId(subtopic.id);
              }}>
              <ChangeButton/>
              </button>
              </div>
              )}
              </div>
          </div>
        </div>
         ))}
        </div>
        </tbody>

         </table>


         <div className="pt-10 text-4xl text-center text-slate-700">
         <Button name={'Continue writing'} 
                buttonType={'tab'} 
                size={'lg'}
                padding={'3'}
                onClick={() => { setVisibleAddSubTopic(true)}}
                icon={FiEdit}/>
          </div>


     
        <form onSubmit={publish}>
        <div className="pt-10 text-4xl text-center text-slate-700">
          <Button
            name={'Publish'} 
            buttonType={'tab-green'} 
            size={'lg'}
            padding={'3'}
            type="submit" 
            icon={MdPublish}
          />
        </div>
        </form>
     
       
        <form onSubmit={deleteBlog}>
        <div className="pt-10 text-4xl text-center text-slate-700">
        <Button
            name={'Delete'} 
            buttonType={'tab-red'} 
            size={'lg'}
            padding={'3'}
            type="submit" 
            icon={AiFillDelete}
          />
          </div>
          </form>


          <div className="mt-[5vw]">
          <Footer/>
          </div>

      {visibleAddSubTopic && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="w-[90vw] h-[95%] rounded-lg bg-blue-50 border border-black">
         <div className='pl-[97%]'><button onClick={() => setVisibleAddSubTopic(false)}><CloseButton/></button></div>
         <AddSubTopicPopup blogId={blog?.id??''}/>
         </div>
       </div>
       )}

     

      {visibleUpdateTitle && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[35%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleUpdateTitle(false)}><CloseButton/></button></div>
          <UpdateBlogTitlePopup blogId={blog?.id ?? ''} title={blog?.title??''}/>
          </div>
        </div>  
      )}

       {visibleUpdateDisc && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
        <div className="w-[90vw] h-[95%] rounded-lg bg-blue-50 border border-black">
        <div className='pl-[97%]'><button onClick={() => setVisibleUpdateDisc(false)}><CloseButton/></button></div>
          <UpdateBlogDescriptionpopup blogId={blog?.id ?? ''} description={blog?.description??''}/>
          </div>
        </div>
      )}

       {visibleUpdateBlogPhoto && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[55%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleUpdateBlogPhoto(false)}><CloseButton/></button></div>
          <UpdateBlogPhotoPopup blogId={blog?.id??''}/>
          </div>
        </div>
      )}

      

       {visibleUpdateSubTitle && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[35%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleUpdateSubTitle(false)}><CloseButton/></button></div>
          <UpdateBlogSubTitlePopup SubblogId={subTopicId??''} Subtitle={subTopicTitle}/>
          </div>
        </div>

        
      )}
       {visibleUpdateSubDisc && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
        <div className="w-[90vw] h-[95%] rounded-lg bg-blue-50 border border-black">
        <div className='pl-[97%]'><button onClick={() => setVisibleUpdateSubDisc(false)}><CloseButton/></button></div>
          <UpdateBlogSubContentpopup SubblogId={subTopicId??''} content={subTopicContent}/>
          </div>
        </div>
      )}

       {visibleUpdateSubBlogPhoto && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[55%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleUpdateSubBlogPhoto(false)}><CloseButton/></button></div>
          <UpdateSubBlogPhotoPopup SubblogId={subTopicId??''}/>
          </div>
        </div>
      )}
      </div>
    );
  }
  export default UpdateBlog;
  