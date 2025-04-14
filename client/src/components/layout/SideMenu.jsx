import React from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../cards/CharAvatar';

const SideMenu = ({activeMenu}) => {
  const {user, logout} = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    // todo: add modal for logout confirmation
    logout();
    navigate("/login");
  };
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
    return;
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profilePic ? (
          <img
            src={user?.profilePic}
            alt="profile image"
            className="size-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="">{user?.fullName || ""}</h5>
      </div>
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label
              ? "text-white bg-primary"
              : " hover:bg-gray-300"
          } py-3 px-6 rounded-lg mb-3 ${
            item.label == "Logout" ? "hover:bg-red-50 hover:text-red-500" : ""
          } cursor-pointer transition-all duration-200 ease-in-out`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default SideMenu