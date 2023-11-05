import { createBrowserRouter } from "react-router-dom";
import Root from "../MainLayout/Root";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import AllFoods from "../Pages/AllFoods";
import Blog from "../Pages/Blog";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import AddFood from "../Pages/AddFood";
import FoodDetails from "../Pages/FoodDetails";
import FoodOrder from "../Pages/FoodOrder";
import MyFoods from "../Pages/MyFoods";
import MyOrders from "../Pages/MyOrders";

const Routes = createBrowserRouter([
    {
        path:"/",
        element:<Root></Root>,
        errorElement:<Error></Error>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/all-foods",
                element:<AllFoods></AllFoods>
            },
            {
                path:"/blog",
                element:<Blog></Blog>
            },
            {
                path:"/logIn",
                element:<LogIn></LogIn>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/addFood",
                element:<AddFood></AddFood>
            },
            {
                path:"/foodDetails/:foodId",
                element:<FoodDetails></FoodDetails>
            },
            {
                path:"/foodOrder/:foodId",
                element:<FoodOrder></FoodOrder>
            },
            {
                path:"/myFoods",
                element:<MyFoods></MyFoods>
            },
            {
                path:"/myOrders",
                element:<MyOrders></MyOrders>
            }
        ]
    }
]);

export default Routes;
