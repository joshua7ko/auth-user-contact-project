import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Account from "./pages/Account";

// import axios from "./axiosConfig.js"


function App(){
          
    const isUserLoggedIn = !!localStorage.getItem('token')

    const ProtectedRoute = ({ children }) => {
        return isUserLoggedIn ? children : <Navigate to="/login" />;
    };



    return(
        <div className="min-h-screen w-full">
        {/* // <div className="bg-black w-screen"> */}
             <Navbar />
            <Routes>
                <Route  path="/" element={<Home />} />
                <Route  path="/login" element={<Login />} />
                <Route  path="/signup" element={<Signup />} />
                <Route 
                    path="/account" 
                    element={
                        <ProtectedRoute>
                            <Account />
                        </ProtectedRoute>
                    } 
                />
                
                
            </Routes>
        </div>
       
    )
}

export default App