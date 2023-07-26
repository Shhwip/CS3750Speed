import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./chatComponent";

export function ProtectedRoute({isAuth, isLoading, userName}){
    if (isLoading) {
        return <div>Loading...</div>; 
    }
    return isAuth ? <>  <Outlet /> <UserChatComponent userName = {userName}/> </> : <Navigate to="/login" />
}
