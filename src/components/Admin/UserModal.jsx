import React, { useState, useEffect } from 'react';
import { getAllCompanies } from '../../firebase/company';
import { updateUserByEmail } from '../../firebase/auth';

export function UserModal({ isOpen, user, onClose }) {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesList = await getAllCompanies();
      setCompanies(companiesList);
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (user) {
      setSelectedCompanies(user.company || []);
      setRole(user.role || 'user');
    }
  }, [user]);

  const handleCompanyChange = (companyId) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(companyId)
        ? prevSelected.filter((id) => id !== companyId)
        : [...prevSelected, companyId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCompanies(companies.length === selectedCompanies.length ? [] : companies.map(company => company.id));
  };

  const handleSave = async () => {
    try {
      await updateUserByEmail(user.email, { company: selectedCompanies, role });
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Edit User</h2>
        <div>
          <label className="text-sm text-gray-600 font-bold">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 font-bold">Companies</label>
          <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg p-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="select-all"
                onChange={handleSelectAll}
                checked={companies.length === selectedCompanies.length}
                className="mr-2"
              />
              <label htmlFor="select-all" className="text-gray-600">Select all</label>
            </div>
            {companies.map((company) => (
              <div key={company.id} className="flex items-center mt-1">
                <input
                  type="checkbox"
                  id={`company-${company.id}`}
                  value={company.id}
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleCompanyChange(company.id)}
                  className="mr-2"
                />
                <label htmlFor={`company-${company.id}`} className="text-gray-600">{company.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
