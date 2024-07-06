import React, { useState } from 'react';

export function HomePage() {
  /* const [dropdownOpen, setDropdownOpen] = useState(false); */

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between text-white shadow p-4 bg-[#00005c]">
        <h1 className="text-2xl font-semibold text-center flex-1">Customer Governance Portal</h1>
        <div className="relative">
          <button
            /* onClick={() => setDropdownOpen(!dropdownOpen)} */
            className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
          >
            Menu
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-400 text-white p-4">
          <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
          <ul>
            <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Option 1</a></li>
            <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Option 2</a></li>
            <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Option 3</a></li>
          </ul>
        </aside>

        {/* Main content area */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Home Page!</h2>
          <p>This is the main content area.</p>
        </div>
      </div>
    </div>
  );
}
