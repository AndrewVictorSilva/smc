import React, { useState, useEffect } from 'react';
import { createCompany, getAllCompanies, updateCompany, deleteCompany } from '../firebase/company';

export function Company() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [companies, setCompanies] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateId, setUpdateId] = useState(null);  // Track the ID of the company being updated
    const [updateName, setUpdateName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const fetchedCompanies = await getAllCompanies();
            setCompanies(fetchedCompanies);
        } catch (error) {
            console.error('Error fetching companies:', error.message);
        }
    };

    const handleCreateCompany = async (e) => {
        e.preventDefault();
        try {
            await createCompany(name, description);
            setName('');
            setDescription('');
            fetchCompanies();
        } catch (error) {
            console.error('Error creating company:', error.message);
        }
    };

    const handleUpdateCompany = async (e) => {
        e.preventDefault();
        try {
            await updateCompany(updateId, { name: updateName, description: updateDescription });  // Use updateId here
            setUpdateId(null);  // Reset updateId after update
            setUpdateName('');
            setUpdateDescription('');
            setIsUpdating(false);
            fetchCompanies();
        } catch (error) {
            console.error('Error updating company:', error.message);
        }
    };

    const handleDeleteCompany = async (companyId) => {
        try {
            await deleteCompany(companyId);
            fetchCompanies();
        } catch (error) {
            console.error('Error deleting company:', error.message);
        }
    };

    const handleEditCompany = (company) => {
        setUpdateId(company.id);  // Set the ID of the company being updated
        setUpdateName(company.name);
        setUpdateDescription(company.description);
        setIsUpdating(true);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-96 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Customers</h2>
                <form onSubmit={isUpdating ? handleUpdateCompany : handleCreateCompany} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={isUpdating ? updateName : name}
                            onChange={(e) => (isUpdating ? setUpdateName(e.target.value) : setName(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Company Description"
                            value={isUpdating ? updateDescription : description}
                            onChange={(e) => (isUpdating ? setUpdateDescription(e.target.value) : setDescription(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        {isUpdating ? 'Update Company' : 'Create Company'}
                    </button>
                </form>

                <ul className="mt-4">
                    {companies.map((company) => (
                        <li key={company.id} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg mb-2">
                            <div>
                                <h3 className="text-lg font-semibold">{company.name}</h3>
                                <p className="text-sm text-gray-600">{company.description}</p>
                            </div>
                            <div>
                                <button onClick={() => handleEditCompany(company)} className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteCompany(company.id)} className="bg-red-500 text-white py-1 px-2 ml-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
