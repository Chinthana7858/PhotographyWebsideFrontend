
import axios from "axios";
import { useEffect, useState } from "react";
import PublicNavBar from "../../Ui/Templates/PublicNavBar";
import { Link } from "react-router-dom";


interface Blog  {
  id: string,
  title: string,
  description: string,
  publishDate: string,
  blogPhotoUrl: string,
  isPublished: boolean,
};

function PublicBlogs() {
  const [publishedBlog, setPublishedBlog] = useState<Blog[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);



  useEffect(() => {
    // Fetch published
    axios
      .get(`https://chinthanaphotography.azurewebsites.net/api/v1/blog/published`)
      .then((response) => {
        setPublishedBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

    // Fetch the photo URL from the server when the component mounts
    useEffect(() => {
      fetchPhotoUrl();
    }, []);
  
    const fetchPhotoUrl = async () => {
      try {
        const response = await axios.get("https://chinthanaphotography.azurewebsites.net/api/v1/images/blogcover");
        setPhotoUrl(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching photo URL:", error);
      }
    };
    return (
      <div>
        <div className='fixed z-20 w-full'>
          <PublicNavBar/>
        </div>

        <div>
            <div>
            <img
                  alt="coverphoto"
                  className="block object-cover object-center w-full h-full lg:pt-[10.5vh] pt-20"
                  src={photoUrl??''}
                />
            </div>
            
          <div className="text-center py-[2vh] text-4xl text-slate-700">B L O G</div>
        </div>

        <div className='p-6 m-8'>

      <table>
      <tbody>
      <div className="grid grid-cols-4 gap-4 xs:grid-cols-2">
      {publishedBlog
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .map((publishedBlog) => (
      <Link key={publishedBlog.id} to={`/PublishedBlog/${publishedBlog.id}`}>
     <div className="scale-95 hover:opacity-90 hover:scale-100">
     <div className="text-xl font-semibold text-slate-600 xs:text-sm sm:text-lg">
      {publishedBlog.title}
     </div>
     <div className="flex-col">
     <div>
     <img
     src={publishedBlog.blogPhotoUrl}
     alt={`Image ${publishedBlog.id}`}
     className="aspect-[3/2]"
    />
    </div>
    <div>
    {publishedBlog.description.length > 50
    ? publishedBlog.description.substring(0, 50) + " . . ."
    : publishedBlog.description}
    </div>

    </div>
  </div>
</Link>
))}
</div>
</tbody>

</table>

</div>
      </div>
    );
  }
  export default PublicBlogs;
  