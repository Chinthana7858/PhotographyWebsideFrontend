import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../Ui/Templates/NavBar";
import { AddNewButton, CloseButton, DELButton } from "../Ui/Atoms/Buttons";
import CategoryPhotoPopup from "../Popups/CategoryPhotoPopup";


interface Images {
    id: string;
    name:string;
    imageUrl: string;
    category:string;
}
const handleDelete = (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this image?');
    if (!isConfirmed) {
      return;
    }
  
    axios
      .delete(`https://chinthanaphotography.azurewebsites.net/api/v1/images/category/${id}`)
      .then((response) => {
        console.log('Response:', response.data);
  

        if (response.status==200) {

          alert('Image deleted successfully!');

        } else {
        
          alert('Error deleting image. Please try again later.');
        }
  
     
        window.location.reload();
      })
      
  };
  

  
  
export default function UpdateSlider(): JSX.Element {
    const [images, setImages] = useState<Images[]>([]);
    const [visibleAddSlidePhoto, setVisibleAddSlidePhoto] = useState(false);

    useEffect(() => {
      // Fetch images from the API
      axios
        .get(`https://chinthanaphotography.azurewebsites.net/api/v1/images/category/slider`)
        .then((response) => {
          setImages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }, []);

  return (
    <div>
   <div className='fixed z-20 w-full'>
    <NavBar/>
   </div>

   <div className="md:p-[10%] xs:pt-[30%] sm:pt-[25%] md:pt-[15%] lg:pt-[10%]">
  <div className="border border-blue-800 rounded-2xl">
    <div className="grid grid-cols-3 gap-4 p-8">
      {images.map((image) => (
        <div key={image.id}>
          <img
            src={image.imageUrl}
            alt={image.name}
            className="w-full max-h-[30vh] object-cover"
          />
       <button onClick={() => handleDelete(image.id)}>
      <DELButton/>
      </button>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-center p-4">
      <button onClick={() => { setVisibleAddSlidePhoto(true)}}>
        <AddNewButton />
      </button>
    </div>
  </div>
</div>
{visibleAddSlidePhoto && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[30%] xs:w-[75%] sm:w-[60%] h-[55%] max-w-2xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleAddSlidePhoto(false)}><CloseButton/></button></div>
          <CategoryPhotoPopup category={"slider"}/>
          </div>
        </div>
      )}
    </div>
  );
}
