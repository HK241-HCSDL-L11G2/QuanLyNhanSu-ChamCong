import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const username = localStorage.getItem('username');
    console.log("Is Authenticated:", username);

    // If user is authenticated, render the child routes
    return username ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
