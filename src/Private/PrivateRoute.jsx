/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    
    if(loading){
        return <div className="flex justify-center h-[100vh] items-center">
            <span className="loading loading-spinner text-primary"></span>
        </div>
    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/login"/>
};

export default PrivateRoute;