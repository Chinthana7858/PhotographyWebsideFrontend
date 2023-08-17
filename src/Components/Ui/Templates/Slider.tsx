import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { ChangeButton } from '../Atoms/Buttons';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Images {
  id: string;
  name:string;
  imageUrl: string;
  category:string;
}
function Slider() {

 
  const [images, setImages] = useState<Images[]>([]);

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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 3 seconds

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };


  const goToSlide = (slideIndex: React.SetStateAction<number>) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[100vw] md:h-[80vh] sm:h-[60vh] xs:h-[40vh] w-full relative group'>
    <div
   style={{ backgroundImage: `url(${images[currentIndex]?.imageUrl})` }}
  className='relative w-full h-full duration-500 bg-center bg-cover'
>
  <h1
    className='absolute bottom-0 right-0 w-[150px] px-10 py-4 text-lg text-white'
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
  >
     {images[currentIndex]?.name.slice(0, -4) ?? ''}
  </h1>
</div>

      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex justify-center py-2 top-4'>
      {images.map((image, slideIndex) => (
          <div
            key={image.id}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}

        <div className=''>
        <Link to='/UpdateSlider/Pw-Admin'><ChangeButton/></Link>
        </div>
      </div>
    </div>
  );
}

export default Slider;
