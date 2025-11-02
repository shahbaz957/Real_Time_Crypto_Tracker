import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="w-full py-4 bg-[#0d0f16] border-b border-gray-700 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-center">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-2xl font-extrabold tracking-widest transition duration-300 
             ${isActive ? "text-indigo-400" : "text-white hover:text-indigo-400"}`
          }
        >
          CRYPTO<span className="text-indigo-500">TRACK</span>
        </NavLink>

      </div>
    </header>
  );
}

export default Header;
