import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
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
  };

  const handleSaveEdit = () => {
    const updatedServices = [...services];
    updatedServices[editIndex] = { ...editForm };
    setServices(updatedServices);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Service Configuration</h1>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Daftar Layanan</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
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
                <td className="p-2">
                  <button onClick={() => handleEdit(i)} className="text-yellow-600 hover:text-yellow-800"><FaEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Edit */}
      {editIndex !== null && (
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h2 className="text-lg font-semibold">Edit Layanan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={editForm.name} onChange={handleChange} placeholder="Nama Layanan" className="border p-2 rounded" />
            <input name="category" value={editForm.category} onChange={handleChange} placeholder="Kategori" className="border p-2 rounded" />
            <input name="price" value={editForm.price} onChange={handleChange} placeholder="Harga" className="border p-2 rounded" />
            <input name="duration" value={editForm.duration} onChange={handleChange} placeholder="Durasi" className="border p-2 rounded" />
            <select name="status" value={editForm.status} onChange={handleChange} className="border p-2 rounded">
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
          <button onClick={handleSaveEdit} className="bg-indigo-600 text-white px-4 py-2 rounded">Simpan</button>
        </div>
      )}
    </div>
  );
};

export default ServiceConfigurationPage;
