// src/pages/ServiceConfigurationPage.jsx
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Truck, Shirt, Scissors, WashingMachine, Car } from "lucide-react";

const ServiceConfigurationPage = () => {
  const defaultServices = [
    { name: "Express", category: "Laundry", price: "Rp.12000", duration: "24 Jam", status: "Nonaktif", icon: "Truck" },
    { name: "Reguler", category: "Laundry", price: "Rp.7000", duration: "24 Jam", status: "Aktif", icon: "Shirt" },
    { name: "Cuci Lipat", category: "Laundry", price: "Rp.5000", duration: "24 Jam", status: "Aktif", icon: "Scissors" },
    { name: "Strika Saja", category: "Laundry", price: "Rp.4000", duration: "24 Jam", status: "Aktif", icon: "WashingMachine" },
    { name: "Antar Jemput", category: "Tambahan", price: "Rp.4000", duration: "10 Jam", status: "Aktif", icon: "Car" },
  ];

  const iconMap = {
    Truck: <Truck />, Shirt: <Shirt />, Scissors: <Scissors />, WashingMachine: <WashingMachine />, Car: <Car />
  };

  const [services, setServices] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", category: "", price: "", duration: "", status: "", icon: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("serviceList");
    if (stored) {
      setServices(JSON.parse(stored));
    } else {
      setServices(defaultServices);
      localStorage.setItem("serviceList", JSON.stringify(defaultServices));
    }
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem("serviceList", JSON.stringify(services));
    }
  }, [services]);

  const handleEdit = (index) => {
    setEditIndex(index);
    const service = services[index];
    setEditForm({ ...service });
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedServices = [...services];
    updatedServices[editIndex] = { ...editForm };
    setServices(updatedServices);
    setEditIndex(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Service Configuration</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Layanan</h2>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
          onClick={() => {
            setEditForm({ name: "", category: "", price: "", duration: "", status: "Aktif", icon: "Truck" });
            setEditIndex(services.length);
            setShowForm(true);
          }}
        >
          <FaPlus /> Tambah Layanan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-2 font-semibold">Nama Layanan</th>
              <th className="p-2 font-semibold">Kategori</th>
              <th className="p-2 font-semibold">Harga</th>
              <th className="p-2 font-semibold">Durasi</th>
              <th className="p-2 font-semibold">Status</th>
              <th className="p-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2 flex items-center gap-2 font-medium">
                  <span className="text-indigo-500">{iconMap[s.icon]}</span> {s.name}
                </td>
                <td className="p-2">{s.category}</td>
                <td className="p-2">{s.price}</td>
                <td className="p-2">{s.duration}</td>
                <td className={`p-2 font-semibold ${s.status === 'Aktif' ? 'text-green-600' : 'text-red-500'}`}>{s.status}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(i)} className="text-yellow-600 hover:text-yellow-800"><FaEdit /></button>
                  <button onClick={() => handleDelete(i)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Layanan</h2>
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-2 px-4 py-2 bg-[#004AAD] text-white rounded hover:bg-blue-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <input
                name="name"
                placeholder="Nama Layanan"
                className="border border-indigo-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-indigo-500"
                value={editForm.name}
                onChange={handleChange}
                required
              />
              <input
                name="category"
                placeholder="Kategori"
                className="border border-indigo-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-indigo-500"
                value={editForm.category}
                onChange={handleChange}
                required
              />
              <input
                name="price"
                placeholder="Harga"
                className="border border-indigo-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-indigo-500"
                value={editForm.price}
                onChange={handleChange}
                required
              />
              <input
                name="duration"
                placeholder="Durasi"
                className="border border-indigo-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-indigo-500"
                value={editForm.duration}
                onChange={handleChange}
                required
              />
              <select
                name="status"
                className="border border-indigo-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-indigo-500"
                value={editForm.status}
                onChange={handleChange}
                required
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
              <select
                name="icon"
                className="border border-indigo-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-indigo-500"
                value={editForm.icon}
                onChange={handleChange}
                required
              >
                <option value="Truck">Truck</option>
                <option value="Shirt">Shirt</option>
                <option value="Scissors">Scissors</option>
                <option value="WashingMachine">Washing Machine</option>
                <option value="Car">Car</option>
              </select>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 border rounded-full">Batal</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-full">Simpan Layanan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceConfigurationPage;