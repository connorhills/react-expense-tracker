import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-7 bg-background-color-1 border-b-2 border-blue-300 py-4 px-8 sticky top-0 z-30">
      <button
        className="block lg:hidden text-secondary cursor-pointer"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-blue-50">Expense Tracker</h2>

      {openSideMenu && (
        <SideMenu
          activeMenu={activeMenu}
          className="block fixed top-[62px] left-0 w-64 h-[calc(100vh-62px)] z-30 bg-background-color-1 border-r border-blue-300 p-5"
        />
      )}
    </div>
  );
};

export default Navbar;
