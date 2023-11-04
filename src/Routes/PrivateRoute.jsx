import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
const location = useLocation();

    if (user) {
        
        return children;
    }

    return <Navigate state={location.pathname}></Navigate>
};

export default PrivateRoute;