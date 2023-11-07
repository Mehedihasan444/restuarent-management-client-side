
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
