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
import UpdateFood from "../Pages/UpdateFood";
import PrivateRoute from "./PrivateRoute";
import Customer_Order_List from "../Pages/Customer_Order_List";
import Cart from "../Pages/Cart";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentFailed from "../Pages/PaymentFailed";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-foods",
        element: <AllFoods></AllFoods>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },

      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/foodDetails/:foodId",
        element: <FoodDetails></FoodDetails>,
      },
      {
        path: "/foodOrder/:foodId",
        element: (
          <PrivateRoute>
            <FoodOrder></FoodOrder>
          </PrivateRoute>
        ),
      },
      {
        path: "/myFoods",
        element: (
          <PrivateRoute>
            <MyFoods></MyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/customerOrders",
        element: (
          <PrivateRoute>
            <Customer_Order_List></Customer_Order_List>
          </PrivateRoute>
        ),
      },
      {
        path: "/myOrders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateFood/:foodId",
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/logIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/api/v1/payment-complete/:transactionId",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/api/v1/payment-failed/:transactionId",
        element: <PaymentFailed></PaymentFailed>,
      },
    ],
  },
]);

export default Routes;
