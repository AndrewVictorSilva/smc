import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { getAllCompanies } from '../../../firebase/company';

export function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user'); // default role
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const { userLoggedIn } = useAuth();

    useEffect(() => {
        const fetchCompanies = async () => {
            const companiesList = await getAllCompanies();
            setCompanies(companiesList);
        };
        fetchCompanies();
    }, []);

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

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('user');
        setSelectedCompanies([]);
        setIsRegistering(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (selectedCompanies.length === 0) {
            setErrorMessage('Please select at least one company');
            return;
        }
        setErrorMessage('');
        setSuccessMessage('');
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password, role, selectedCompanies);
                setSuccessMessage('Registrado com sucesso!');
                clearForm();
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <main className="w-full flex flex-col self-center place-content-center place-items-center">
            <div className="w-96 text-gray-600 space-y-5 p-4">
                <div className="text-center mb-6">
                    <div className="mt-2">
                        <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Cadastrar novo usuário</h3>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Senha</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Confirme a Senha</label>
                        <input
                            type="password"
                            autoComplete="off"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Função</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        >
                            <option value="user">Usuário</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Clientes</label>
                        <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg p-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    onChange={handleSelectAll}
                                    checked={companies.length === selectedCompanies.length}
                                    className="mr-2"
                                />
                                <label htmlFor="select-all" className="text-gray-600">Selecionar todos</label>
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
                    {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}
                    {successMessage && <span className="text-green-600 font-bold">{successMessage}</span>}
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                    >
                        {isRegistering ? 'Signing Up...' : 'Registrar'}
                    </button>
                </form>
            </div>
        </main>
    );
}
