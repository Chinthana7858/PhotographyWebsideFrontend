import { Typography } from "@material-tailwind/react";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { SiShutterstock } from "react-icons/si";
 

const currentYear = new Date().getFullYear();
 
export default function Footer() {
  return (
    <footer className="relative w-full bg-blue-100 rounded-t-xl">
      <div className="w-full px-8 mx-auto max-w-7xl">

        <div className="flex flex-col items-center justify-center w-full py-4 mt-12 border-t border-blue-gray-50 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 font-normal text-center text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear} <a href="https://material-tailwind.com/">Chinthana Prabhashitha Travel Photography</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography as="a" href="https://www.facebook.com/chinthanaprabhashithatravelphotography" className="transition-opacity opacity-80 hover:opacity-100">
              <FaFacebook size={24}/>
            </Typography>
            <Typography as="a" href="https://www.instagram.com/prchinthana/" className="transition-opacity opacity-80 hover:opacity-100">
              <FaInstagramSquare size={24}/>
            </Typography>
            <Typography as="a" href="https://www.shutterstock.com/g/chinthana+a" className="transition-opacity opacity-80 hover:opacity-100">
              <SiShutterstock size={24}/>
            </Typography>
          </div>
        </div>
      </div>
      
    </footer>
  );
}