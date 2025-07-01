// src/pages/WorkflowDevelopment.jsx
import React, { useEffect, useState } from "react";
import { FaPlus, FaUserEdit, FaTrash } from "react-icons/fa";

const STORAGE_KEY = "workflowData";

const WorkflowDevelopment = () => {
  const defaultData = [
    { id: "#E001", status: "Dijemput", waktu: "10:00", petugas: "Petugas Laundry" },
    { id: "#R001", status: "Diantar", waktu: "12:00", petugas: "Kurir" },
    { id: "#CL001", status: "Diantar", waktu: "09:00", petugas: "Kurir" },
    { id: "#S001", status: "Diproses", waktu: "11:30", petugas: "Kurir" },
    { id: "#AJ001", status: "Selesai", waktu: "09:45", petugas: "Kurir" },
  ];

  // Ambil dari localStorage saat pertama kali load
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: "", status: "", waktu: "", petugas: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...data];
    if (editIndex !== null) {
      updatedData[editIndex] = form;
    } else {
      updatedData.push(form);
    }
    setData(updatedData);
    setForm({ id: "", status: "", waktu: "", petugas: "" });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(data[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Petugas Penanggung Jawab</h1>
        <button
          onClick={() => {
            setForm({ id: "", status: "", waktu: "", petugas: "" });
            setEditIndex(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#004AAD] text-white rounded hover:bg-blue-700"
        >
          <FaPlus /> Tambah Petugas
        </button>
      </div>

      {/* Form Tambah/Edit */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editIndex !== null ? "Edit Petugas" : "Tambah Petugas"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1 bg-red-500 text-white rounded-full"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="id"
                placeholder="Id Order"
                className="border p-2 w-full rounded"
                value={form.id}
                onChange={handleChange}
                required
              />
              <select
                name="status"
                className="border p-2 w-full rounded"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Status</option>
                <option value="Dijemput">Dijemput</option>
                <option value="Diterima">Diterima</option>
                <option value="Diproses">Diproses</option>
                <option value="Diantar">Diantar</option>
                <option value="Selesai">Selesai</option>
              </select>
              <input
                type="time"
                name="waktu"
                className="border p-2 w-full rounded"
                value={form.waktu}
                onChange={handleChange}
                required
              />
              <select
                name="petugas"
                className="border p-2 w-full rounded"
                value={form.petugas}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Petugas</option>
                <option value="Kurir">Kurir</option>
                <option value="Petugas Laundry">Petugas Laundry</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Data */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="p-3">Id Order</th>
              <th className="p-3">Status</th>
              <th className="p-3">Waktu Update</th>
              <th className="p-3">Petugas</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="p-3 font-medium">{item.id}</td>
                <td
                  className={`p-3 font-medium ${
                    item.status === "Selesai"
                      ? "text-green-600"
                      : item.status === "Diproses"
                      ? "text-yellow-600"
                      : item.status === "Diterima"
                      ? "text-blue-600"
                      : item.status === "Dijemput"
                      ? "text-purple-600"
                      : "text-gray-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="p-3">{item.waktu}</td>
                <td className="p-3">{item.petugas}</td>
                <td className="p-3 flex gap-2">
                  <FaUserEdit
                    className="text-yellow-600 cursor-pointer"
                    onClick={() => handleEdit(index)}
                  />
                  <FaTrash
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkflowDevelopment;
