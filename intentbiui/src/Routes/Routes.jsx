import {Routes,Route} from "react-router-dom"
import LoginPage from "../Pages/LoginPage";
import Dashboard from "../Pages/Dashboard";
import { useState } from "react";

function AllRoutes(){

    const [isLoggedIn,setIsLoggedIn]=useState(false);

return (
    <Routes>
        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>
        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        <Route path="/dashboard" element={isLoggedIn?<Dashboard/>:<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>

    </Routes>
    
)
}

export default AllRoutes;