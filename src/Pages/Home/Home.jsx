
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import ChickenTagliatelle from "./ChickenTagliatelle";
import CustomerReviews from "./CustomerReviews/CustomerReviews";
import FoodGallary from "./FoodGallary";
import Ingridients from "./Ingridients";
import LososVegetables from "./LososVegetables";
import TopSelling from "./TopSelling";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Restaurant-Management</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Banner></Banner>
      <TopSelling></TopSelling>
      <Ingridients></Ingridients>
      <LososVegetables></LososVegetables>
      <CustomerReviews></CustomerReviews>
     <ChickenTagliatelle></ChickenTagliatelle>
      <FoodGallary></FoodGallary>
    </div>
  );
};

export default Home;
