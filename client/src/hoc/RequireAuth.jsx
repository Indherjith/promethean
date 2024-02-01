import React from 'react'
import { useSelector } from 'react-redux'
import { getLocalData } from '../Utils/LocalStorage';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({children}) => {
    const isAuth = useSelector(store=>store.isAuth); 
    const location = useLocation();
    let token = getLocalData("token");

    if(!token){
        return <Navigate to="/authentication/login" state={{from:location}} replace />
    }
    return children
}

export default RequireAuth