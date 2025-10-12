import React from "react";
import { Outlet } from "react-router";

const MainAppsPages = () => {
  return (
    <div className="w-screen h-screen  flex items-start bg-slate-300">
      <div className="flex-1 w-full h-full">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainAppsPages;
