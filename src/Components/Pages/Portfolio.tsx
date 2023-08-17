import axios from "axios";
import NavBar from "../Ui/Templates/NavBar";
import { useEffect, useState } from "react";
import { AddNewButton, CloseButton } from "../Ui/Atoms/Buttons";
import AddPortfolioPopup from "../Popups/AddPortfolioPopup";
import Footer from "../Ui/Templates/Footer";
import { Link } from "react-router-dom";

interface Portfolio {
  id: string;
  portfolioName:string;
  about: string;
  coverImgUrl:string;
  dateTime:string;
}

function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [visibleAddPortfolio, setVisibleAddPortfolio] = useState(false);

  useEffect(() => {
    // Fetch portfolios from the API
    axios
      .get(`https://chinthanaphotography.azurewebsites.net/api/v1/portfolio`)
      .then((response) => {
        setPortfolio(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
  return (
    <div>
      <div className='fixed w-full'>
        <NavBar />
      </div>
      <div className="md:pt-[10%] sm:pt-[20%] xs:pt-[25%] pl-[3%]">
        <div className="text-center py-[2vh] text-4xl text-slate-700">PORTFOLIO</div>
        <div className="text-4xl text-center text-slate-700">
          <button onClick={() =>{setVisibleAddPortfolio(true)}}><AddNewButton/></button>
          </div>
      <table>
      <tbody>
  <div className="grid grid-cols-3 gap-4 xs:grid-cols-2">
    {portfolio
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
      .map((portfolio) => (
        <Link key={portfolio.id} to={`/Portfolio/${portfolio.id}/Pw-Admin`}>
          <div className="">
            <div className="text-xl font-semibold text-slate-600 xs:text-sm sm:text-lg">
              {portfolio.portfolioName}
            </div>
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

    </table>
      </div>
      <div className="">
        <Footer/>
      </div>
      {visibleAddPortfolio && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
          <div className="md:w-[45%] xs:w-[75%] sm:w-[60%] h-[85%] max-w-3xl p- rounded-lg bg-blue-50 border border-black">
          <div className='pl-[95%]'><button onClick={() => setVisibleAddPortfolio(false)}><CloseButton/></button></div>
          <AddPortfolioPopup/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
