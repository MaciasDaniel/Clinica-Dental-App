import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../auth';

const PrivateRoute = () => {

    let navigate = useNavigate();

    if(isLoggedIn()) {
        return <Outlet />
    }else{
        return navigate("/login");
    }
};

export default PrivateRoute;