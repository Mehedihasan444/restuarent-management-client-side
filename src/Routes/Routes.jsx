import { createBrowserRouter } from "react-router-dom";
import Root from "../MainLayout/Root";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import AllFoods from "../Pages/AllFoods";
import Blog from "../Pages/Blog";

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
        ]
    }
]);

export default Routes;
