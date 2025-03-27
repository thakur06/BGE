import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export const Process = () => {
  return (
    <div className="flex flex-col  md:h-screen md:flex-row">
      {/* Sidebar - Top bar on mobile */}
      <div className="w-full md:w-64 bg-gray-100 p-4 flex-shrink-0">
  <h1 className="text-2xl font-bold text-amber-800 mb-4 md:block hidden">
    Process <span className="text-green-600">Section</span>
  </h1>
  <nav
    className="flex md:flex-col flex-row md:space-y-2 space-x-2 md:space-x-0 overflow-x-auto md:overflow-y-auto md:max-h-[calc(100vh-8rem)] scrollbar-hide"
  >
    <NavLink
      to=""
      end
      className={({ isActive }) =>
        `px-4 py-2 rounded transition whitespace-nowrap ${
          isActive
            ? "bg-green-600 text-white"
            : "text-green-600 hover:text-green-800 hover:bg-gray-200"
        }`
      }
    >
      Product Line Control Valve
    </NavLink>
    <NavLink
      to="/process/h2s"
      className={({ isActive }) =>
        `px-4 py-2 rounded transition whitespace-nowrap ${
          isActive
            ? "bg-green-600 text-white"
            : "text-green-600 hover:text-green-800 hover:bg-gray-200"
        }`
      }
    >
      H2S VESSEL
    </NavLink>
    <NavLink
      to="/process/details"
      className={({ isActive }) =>
        `px-4 py-2 rounded transition whitespace-nowrap ${
          isActive
            ? "bg-green-600 text-white"
            : "text-green-600 hover:text-green-800 hover:bg-gray-200"
        }`
      }
    >
      Details
    </NavLink>
  </nav>
</div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="p-4 rounded-lg w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};