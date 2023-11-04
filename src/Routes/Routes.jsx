import { createBrowserRouter } from "react-router-dom";
import Root from "../MainLayout/Root";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";

const Routes = createBrowserRouter([
    {
        path:"/",
        element:<Root></Root>,
        errorElement:<Error></Error>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            }
        ]
    }
]);

export default Routes;
