import { BrowserRouter as Router,Route,Routes, Navigate } from "react-router-dom";
import './App.css';
import axios from 'axios';
import HomePage from './Components/Pages/HomePage';
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Blogs from "./Components/Pages/Blogs";
import Login from "./Components/Pages/Login";
import UpdateSlider from "./Components/Pages/UpdateSlider";
import Portfolio from "./Components/Pages/Portfolio";
import PortfolioInside from "./Components/Pages/PortfolioInside";
import UpdateBlog from "./Components/Pages/UpdateBlog";
import PublishedBlog from "./Components/Pages/PublishedBlog";
import PublicAbout from "./Components/Pages/Public/PublicAbout";
import PublicBlogs from "./Components/Pages/Public/PublicBlogs";
import PublicContact from "./Components/Pages/Public/PublicContact";
import PublicHomePage from "./Components/Pages/Public/PublicHomePage";
import PublicPortfolio from "./Components/Pages/Public/PublicPortfolio";
import PublicPortfolioInside from "./Components/Pages/Public/PublicPortfolioInside";
import PublicPublishedBlog from "./Components/Pages/Public/PublicPublishedBlog";
import { useState, useEffect } from "react";
import Settings from "./Components/Pages/Settings";



function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function checkToken() {
      let token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const response = await axios.post('https://chinthanaphotography.azurewebsites.net/api/v1/user/validateToken', {
            token,
          });
          if (response.data) {
            setAuth(response.data);
          }
        } catch (error) {
          console.error('Token validation error:', error);
        }
      }
      setLoading(false); // Set loading to false after the request completes
    }
    checkToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while validating token
  }



  return (
    <Router>
       <Routes>

      {/*For Admin*/}  
      <Route
          path="/Home/Pw-Admin"
          element={auth ? <HomePage /> : <Navigate to="/Pw-Admin" />}
        />
        <Route 
        path="/Contact/Pw-Admin"
        element={
          auth? <Contact/> : <Navigate to="/Pw-Admin" />
        }
         />
         <Route 
        path="/About/Pw-Admin"
        element={
          auth? <About/> : <Navigate to="/Pw-Admin" />
        }
         />
         <Route 
        path="/Portfolio/Pw-Admin"
        element={
          auth? <Portfolio/> : <Navigate to="/Pw-Admin" />
        }
         />
         <Route 
        path="/Blogs/Pw-Admin"
        element={
          auth? <Blogs/> : <Navigate to="/Pw-Admin" />
        }
         />
         <Route 
        path="/UpdateSlider/Pw-Admin"
        element={
          auth? <UpdateSlider/> : <Navigate to="/Pw-Admin" />
        }
         />
         <Route 
        path="/Portfolio/:portfolioId/Pw-Admin"
        element={
          auth? <PortfolioInside/> : <Navigate to="/Pw-Admin" />
        }
         />
         <Route 
        path="/UpdateBlog/:blogId/Pw-Admin"
        element={
          auth? <UpdateBlog/> : <Navigate to="/Pw-Admin" />
        }
         />
         
         <Route 
        path="/PublishedBlog/:blogId/Pw-Admin"
        element={
          auth? <PublishedBlog/> : <Navigate to="/Pw-Admin" />
        }
         />
         
         <Route 
         path="/Settings/Pw-Admin"
         element={
           auth? <Settings/> : <Navigate to="/Pw-Admin" />
         }
          />

           {/*For Public*/}  
           
       
        <Route 
        path="/Pw-Admin"
        element={
        <Login/>
        }
         /> 

        <Route 
         path="/"
         element={
         <PublicHomePage/>
        }
         />
        <Route 
         path="/About"
         element={
         <PublicAbout/>
        }
         />
        <Route 
        path="/Contact"
        element={
        <PublicContact/>
        }
         />
         <Route 
        path="/Portfolio"
        element={
        <PublicPortfolio/>
        }
         />
         <Route 
        path="/Blogs"
        element={
        <PublicBlogs/>
        }
         />
         <Route 
        path="/Portfolio/:portfolioId"
        element={
        <PublicPortfolioInside/>
        }
         />
         
         <Route 
        path="/PublishedBlog/:blogId"
        element={
        <PublicPublishedBlog/>
        }
         />
      </Routes>
    </Router>
  );
}

export default App;
