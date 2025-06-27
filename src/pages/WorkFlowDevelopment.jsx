import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { User } from "lucide-react";

const WorkflowDevelopment = () => {
  const [workflows, setWorkflows] = useState([
    { orderId: "#E001", status: "Dicuci", updateTime: "10:00", officer: "Operator" },
    { orderId: "#R001", status: "Diantar", updateTime: "12:00", officer: "Kurir" },
    { orderId: "#CL001", status: "Diantar", updateTime: "09:00", officer: "Kurir" },
    { orderId: "#S001", status: "Diantar", updateTime: "11:30", officer: "Kurir" },
    { orderId: "#AJ001", status: "Diantar", updateTime: "09:45", officer: "Kurir" },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ orderId: "", status: "", updateTime: "", officer: "" });

  const handleEdit = (index) => {
    setEditIndex(index);
    const data = workflows[index];
    setEditForm({ ...data });
  };

  const handleDelete = (index) => {
    const updated = workflows.filter((_, i) => i !== index);
    setWorkflows(updated);
  };

  const handleSaveEdit = () => {
    const updated = [...workflows];
    updated[editIndex] = { ...updated[editIndex], ...editForm };
    setWorkflows(updated);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Workflow Development</h1>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Petugas Penanggung Jawab</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
          <FaPlus /> Tambah Petugas
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-2 font-semibold">Id Order</th>
              <th className="p-2 font-semibold">Status</th>
              <th className="p-2 font-semibold">Waktu Update</th>
              <th className="p-2 font-semibold">Petugas</th>
              <th className="p-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((w, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium">{w.orderId}</td>
                <td className={`p-2 font-semibold ${w.status === 'Diantar' ? 'text-green-600' : 'text-red-500'}`}>{w.status}</td>
                <td className="p-2">{w.updateTime}</td>
                <td className="p-2">{w.officer}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(i)} className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(i)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Edit */}
      {editIndex !== null && (
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h2 className="text-lg font-semibold">Edit Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="orderId" value={editForm.orderId} onChange={handleChange} placeholder="Id Order" className="border p-2 rounded" />
            <input name="updateTime" value={editForm.updateTime} onChange={handleChange} placeholder="Waktu Update" className="border p-2 rounded" />
            <input name="officer" value={editForm.officer} onChange={handleChange} placeholder="Petugas" className="border p-2 rounded" />
            <select name="status" value={editForm.status} onChange={handleChange} className="border p-2 rounded">
              <option value="Diantar">Diantar</option>
              <option value="Dicuci">Dicuci</option>
            </select>
          </div>
          <button onClick={handleSaveEdit} className="bg-indigo-600 text-white px-4 py-2 rounded">Simpan</button>
        </div>
      )}
    </div>
  );
};

export default WorkflowDevelopment;
