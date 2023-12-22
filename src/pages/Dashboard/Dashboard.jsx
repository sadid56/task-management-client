import { useState } from "react";
import SIdebar from "./SIdebar";
import Task from "./Task";
import { FiMenu, FiX  } from "react-icons/fi";


const Dashboard = () => {
    const [isToggle, setIsToggle] = useState(false)
    return (
        <div className="flex">
            <div className={`w-[70%] md:w-[25%] ${isToggle ? "fixed" : "hidden"} bg-[#111423] min-h-screen z-10`}>
                <SIdebar/>
            </div>
            <div className="w-full">
                <button className={`text-3xl ${isToggle ? "ml-[70%] md:ml-[25%]" : ""} m-2`} onClick={()=>setIsToggle(!isToggle)}>{ !isToggle ? <FiMenu /> : <FiX/>}</button>
                <Task/>
            </div>
        </div>
    );
};

export default Dashboard;