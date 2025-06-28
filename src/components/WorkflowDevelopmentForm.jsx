import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkflowManagementForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    order: "Express",
    status: "Dijemput",
    waktuUpdate: "",
    petugas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data disimpan:", formData);
    navigate("/workflow"); // kembali ke halaman utama
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Tambah Petugas Workflow</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="ID"
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="order"
          value={formData.order}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Express">Express</option>
          <option value="Setrika">Setrika</option>
          <option value="Reguler">Reguler</option>
          <option value="Cuci Kering Lipat">Cuci Kering Lipat</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Dijemput">Dijemput</option>
          <option value="Diterima">Diterima</option>
          <option value="Diproses">Diproses</option>
          <option value="Diantar">Diantar</option>
          <option value="Selesai">Selesai</option>
        </select>

        <input
          type="time"
          name="waktuUpdate"
          value={formData.waktuUpdate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="petugas"
          value={formData.petugas}
          onChange={handleChange}
          placeholder="Petugas"
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/workflow")}
            className="border px-4 py-2 rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Simpan Kontak
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkflowManagementForm;
