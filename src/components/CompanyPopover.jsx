import { useState } from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";

import {
    createCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
} from "../firebase/company"

import { UserPlusIcon } from "@heroicons/react/24/solid";
export function CompanyPopover() {
    const [form, setForm] = useState({ name: "", description: "" });
    const [editingId, setEditingId] = useState(null);
    const [companies, setCompanies] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateCompany(editingId, form);
            setEditingId(null);
        } else {
            await createCompany(form.name, form.description);
        }
        setForm({ name: "", description: "" });
        fetchCompanies();
    };

    const fetchCompanies = async () => {
        try {
            const fetchedCompanies = await getAllCompanies();
            setCompanies(fetchedCompanies);
        } catch (error) {
            console.error("Error fetching companies:", error.message);
        }
    };

    return (
        <Popover placement="bottom">
            <PopoverHandler>
                <Button className="flex items-center gap-2">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                    Usuário
                </Button>
            </PopoverHandler>
            <PopoverContent className="w-96">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded px-8 pt-6 pb-8 w-full"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Nome do Cliente
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Company Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Descri
                        </label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Description"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {editingId ? "Update" : "Add"}
                        </button>
                    </div>
                </form>


            </PopoverContent>
        </Popover>
    );
}