import React, { useContext } from "react";
import AppContext from './AppContext';
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import UserCard from "./UserCard";
import Admin from "./Admin"

const AppRoutes = () => {
    const { appData } = useContext(AppContext);

    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user/:id" element={<UserCard user={appData.newUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes;
