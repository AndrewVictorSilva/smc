import { useState, useEffect } from "react";
import {
  getDocs,
  db,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "../firebase/firebase";

export function AdminDashboard() {
  const [form, setForm] = useState({ title: "", customer: "", src: "", reportType: "" });
  const [documents, setDocuments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDocuments();
    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, "forms"));
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDocuments(docs);
  };

  const fetchCompanies = async () => {
    const querySnapshot = await getDocs(collection(db, "companies"));
    const companiesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    setCompanies(companiesList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, "forms", editingId), form);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "forms"), form);
    }
    setForm({ title: "", customer: "", src: "", reportType: "" });
    fetchDocuments();
  };

  const handleEdit = (document) => {
    setForm({
      title: document.title,
      customer: document.customer,
      src: document.src,
      reportType: document.reportType || "",
    });
    setEditingId(document.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "forms", id));
    fetchDocuments();
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Controle Dashboard</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 lg:w-1/3 mx-auto"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Título
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Título"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="customer"
          >
            Cliente
          </label>
          <select
            id="customer"
            name="customer"
            value={form.customer}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Selecione um Cliente</option>
            {companies.map((company) => (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="src"
          >
            Source Link
          </label>
          <input
            id="src"
            type="text"
            name="src"
            value={form.src}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Link"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reportType"
          >
            Tipo de Relatório
          </label>
          <select
            id="reportType"
            name="reportType"
            value={form.reportType}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Escolha a recorrência</option>
            <option value="Diário">Diário</option>
            <option value="Semanal">Semanal</option>
            <option value="Mensal">Mensal</option>
          </select>
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

      <h2 className="text-xl font-bold mb-4">Documents</h2>
      <ul className="space-y-4">
        {documents.map((document) => (
          <li key={document.id} className="bg-gray-100 p-4 rounded shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-800">
                  <strong>Title:</strong> {document.title}
                </p>
                <p className="text-gray-800">
                  <strong>Customer:</strong> {document.customer}
                </p>
                <p className="text-gray-800">
                  <strong>Report Type:</strong> {document.reportType}
                </p>
                <p className="text-gray-800">
                  <strong>Source:</strong>{" "}
                  <span className="truncate block w-32 sm:w-48 lg:w-64">
                    {document.src}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleEdit(document)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(document.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
