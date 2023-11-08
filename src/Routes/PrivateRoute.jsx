import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";
import Loading from "../Components/Loading";


const PrivateRoute = ({children}) => {
const location = useLocation();
const {user,loading}=useAuth()

if (loading) {
    return <Loading></Loading>
}
    if (user) {
        
        return children;
    }

    return <Navigate state={location.pathname} to="/LogIn"></Navigate>
};

export default PrivateRoute;