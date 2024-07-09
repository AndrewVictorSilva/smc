import React, { useState, useEffect } from 'react';
import { doSignOut } from "../../firebase/auth";
import useAuth from "../../contexts/authContext";
import { getAllCompanies } from "../../firebase/company"; // Make sure to replace this with your actual API call

export function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const { userLoggedIn, currentUser } = useAuth();

  const fetchCompanies = async () => {
    const companiesList = await getAllCompanies();
    setCompanies(companiesList);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

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
          <h1 className="text-2xl font-semibold flex-1">Customer Governance Portal</h1>
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

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className={`absolute lg:relative transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 bg-gray-800 text-white p-4 overflow-y-auto lg:translate-x-0 lg:transition-none z-50`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Companies</h2>
              <button
                onClick={fetchCompanies}
                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-400"
              >
                Refresh
              </button>
            </div>
            <ul>
              {companies.map(company => (
                <li key={company.id} className="mb-2">
                  <a href="#" className="block p-2 hover:bg-gray-700 rounded">{company.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main content area */}
        <main className={`flex-1 p-4 transition-all duration-300 flex justify-center items-center`}>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full lg:w-[1200px] h-[600px] max-w-full">
            {/* Your iframe charts will be rendered here */}
            <iframe src="https://app.powerbi.com/view?r=eyJrIjoiZGNhMzlmOTYtNjRlMy00ZmJiLWExNGQtN2Q3ODA2M2E4MDFhIiwidCI6IjMzNDQwZmM2LWI3YzctNDEyYy1iYjczLTBlNzBiMDE5OGQ1YSIsImMiOjh9" className="w-full h-full border-0"></iframe>
          </div>
        </main>
      </div>
    </div>
  );
}
