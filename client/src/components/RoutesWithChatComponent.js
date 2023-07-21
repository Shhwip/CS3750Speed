import { Outlet } from "react-router-dom";
import UserChatComponent from "./chatComponent";

const RoutesWithUserChatComponent = () => {
  return (
    <>
      <UserChatComponent /> <Outlet />
    </>
  );
};

export default RoutesWithUserChatComponent;

