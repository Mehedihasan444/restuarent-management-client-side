import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect, useState } from "react";
// ..
AOS.init();

const Root = () => {
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    const someRequest=()=> { //Simulates a request; makes a "promise" that'll run for 2.5 seconds
      return new Promise(resolve => setTimeout(() => resolve(), 1500));
    } 
  
    useEffect(() => {
      someRequest().then(() => {
        const loaderElement = document.querySelector(".loader-container");
        if (loaderElement) {
          loaderElement.remove();
          setLoading(!isLoading);
        }
      });
    });
  
    if (isLoading) {
      return null;
    }
    const noHeaderFooter  =  location.pathname.includes('/logIn') ||location.pathname.includes('/register')||location.pathname.includes('/cart')


    return (
        <div >
          {
noHeaderFooter ||<Navbar></Navbar>
          }
            
            <Outlet ></Outlet>
            {
noHeaderFooter || <Footer></Footer>
            }
           
        </div>
    );
};

export default Root;

// className="h-[calc(100vh-389px)]"