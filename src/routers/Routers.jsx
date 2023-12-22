import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../Private/PrivateRoute";
import AddTask from "../pages/AddTask/AddTask";

const Routers = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children:[
            {
                path: "/",
                element: <Home/>
            },
            {
                path: '/add-task',
                element: <AddTask/>
            }
          
        ]
    },
    
            {
                path:"/dashboard",
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:"/registration",
        element: <Registration/>
    }
])


export default Routers;