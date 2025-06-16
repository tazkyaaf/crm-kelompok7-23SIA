import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

const initialKasirList = [
  {
    id: "47TCNCMV",
    nama: "kasir tenten laundry",
    noHp: "101010",
    status: "Aktif",
    totalTransaksi: 0,
    diperbaharui: "02-06-2025 / 13:30:48",
    terdaftar: "02-06-2025",
    alamat: "",
    kodePos: "",
    ijinPembatalan: "Diijinkan",
  },
];

export default function KasirManagement() {
  const [kasirList, setKasirList] = useState(() => {
    const saved = localStorage.getItem("kasirList");
    return saved ? JSON.parse(saved) : initialKasirList;
  });

  useEffect(() => {
    localStorage.setItem("kasirList", JSON.stringify(kasirList));
  }, [kasirList]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedKasir, setSelectedKasir] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    noHp: "",
    status: "Aktif",
    alamat: "",
    kodePos: "",
    ijinPembatalan: "Diijinkan",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      noHp: "",
      status: "Aktif",
      alamat: "",
      kodePos: "",
      ijinPembatalan: "Diijinkan",
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.nama || !formData.noHp) {
      alert("Nama dan No HP wajib diisi!");
      return;
    }

    const currentTime = new Date();
    const formattedTime =
      currentTime.toLocaleDateString("id-ID") +
      " / " +
      currentTime.toLocaleTimeString("id-ID");

    if (editingId) {
      const updatedList = kasirList.map((k) =>
        k.id === editingId
          ? { ...k, ...formData, diperbaharui: formattedTime }
          : k
      );
      setKasirList(updatedList);
    } else {
      const newKasir = {
        id: Date.now().toString(),
        ...formData,
        totalTransaksi: 0,
        terdaftar: currentTime.toLocaleDateString("id-ID"),
        diperbaharui: formattedTime,
      };
      setKasirList([...kasirList, newKasir]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (kasir) => {
    setFormData({
      nama: kasir.nama,
      noHp: kasir.noHp,
      status: kasir.status,
      alamat: kasir.alamat,
      kodePos: kasir.kodePos,
      ijinPembatalan: kasir.ijinPembatalan,
    });
    setEditingId(kasir.id);
    setShowForm(true);
  };

  const handlePreview = (kasir) => {
    setSelectedKasir(kasir);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Manajemen Kasir
      </h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          if (!showForm) resetForm();
        }}
        className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md"
      >
        {showForm ? <X size={20} /> : <Plus size={20} />}
        {showForm ? "Tutup Form" : "Tambah Kasir"}
      </button>

      {showForm && (
        <div className="mb-8 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium mb-2">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nama kasir"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">No HP</label>
              <input
                type="text"
                name="noHp"
                value={formData.noHp}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nomor HP"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Alamat</label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Alamat"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Kode Pos</label>
              <input
                type="text"
                name="kodePos"
                value={formData.kodePos}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Kode Pos"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Izin Pembatalan</label>
              <select
                name="ijinPembatalan"
                value={formData.ijinPembatalan}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Diijinkan">Diijinkan</option>
                <option value="Tidak Diijinkan">Tidak Diijinkan</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-shadow shadow-md"
          >
            Simpan
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase">
                No HP
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-blue-700 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-blue-700 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {kasirList.map((kasir) => (
              <tr key={kasir.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-3">{kasir.id}</td>
                <td className="px-6 py-3">{kasir.nama}</td>
                <td className="px-6 py-3">{kasir.noHp}</td>
                <td className="px-6 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      kasir.status === "Aktif"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {kasir.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-center space-x-3">
                  <button
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                    onClick={() => handleEdit(kasir)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-gray-600 hover:text-black font-semibold"
                    onClick={() => handlePreview(kasir)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedKasir && (
        <div className="mt-8 p-6 border rounded-lg shadow-lg bg-white max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Detail Kasir
          </h3>
          <p>
            <strong>Nama:</strong> {selectedKasir.nama}
          </p>
          <p>
            <strong>No. HP:</strong> {selectedKasir.noHp}
          </p>
          <p>
            <strong>Status:</strong> {selectedKasir.status}
          </p>
          <p>
            <strong>Total Transaksi:</strong> {selectedKasir.totalTransaksi}
          </p>
          <p>
            <strong>Diperbaharui:</strong> {selectedKasir.diperbaharui}
          </p>
          <p>
            <strong>Terdaftar:</strong> {selectedKasir.terdaftar}
          </p>
          <p>
            <strong>Alamat:</strong> {selectedKasir.alamat || "-"}
          </p>
          <p>
            <strong>Kode Pos:</strong> {selectedKasir.kodePos || "-"}
          </p>
          <p>
            <strong>Izin Pembatalan:</strong> {selectedKasir.ijinPembatalan}
          </p>

          <button
            onClick={() => setSelectedKasir(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-shadow shadow-md"
          >
            Tutup Detail
          </button>
        </div>
      )}
    </div>
  );
}
