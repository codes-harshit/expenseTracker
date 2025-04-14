import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({children, activeMenu}) => {
    const {user, checkAuth} = useUser();
    useEffect(() => {
        checkAuth();
        
      }, []);
  return (
    <div className="bg-purple-50">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5"> {children} </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout