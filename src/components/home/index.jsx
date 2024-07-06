import React, { useState } from 'react';
import useAuth from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

export function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userLoggedIn } = useAuth();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between text-white shadow p-4 bg-[#00005c]">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mr-4 focus:outline-none"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-center flex-1">Customer Governance Portal</h1>
        </div>
        <div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
          >
            Menu
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
              <a href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:transition-none transition-transform duration-300 ease-in-out w-64 bg-gray-400 text-white p-4 fixed z-10 overflow-y-auto`}>
          <div className="h-screen overflow-y-auto">
            <ul>
              <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Option 1</a></li>
              <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Option 2</a></li>
              <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Option 3</a></li>
              <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Option 1</a></li>
              
              {/* Add more options as needed */}
            </ul>
          </div>
        </aside>

        {/* Main content area */}
        <div className={`flex-1 p-4 ${sidebarOpen ? 'ml-64' : ''}`}>
          <h2 className="text-xl font-semibold mb-4">Welcome to the Home Page!</h2>
        </div>
      </div>
    </div>
  );
}
