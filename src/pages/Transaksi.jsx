import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

const initialTransaksiList = [
  {
    id: "TX001",
    order: "Order001",
    kasir: "Kasir A",
    statusPembayaran: "Lunas",
    perkiraanSelesai: "2025-06-17T14:00",
    tanggal: "16-06-2025 / 10:00:00",
  },
];

export default function TransaksiManagement() {
  const [transaksiList, setTransaksiList] = useState(() => {
    const saved = localStorage.getItem("transaksiList");
    return saved ? JSON.parse(saved) : initialTransaksiList;
  });

  useEffect(() => {
    localStorage.setItem("transaksiList", JSON.stringify(transaksiList));
  }, [transaksiList]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    order: "",
    kasir: "",
    statusPembayaran: "Belum Lunas",
    perkiraanSelesai: "",
  });

  const [selectedTransaksi, setSelectedTransaksi] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.order || !formData.kasir || !formData.perkiraanSelesai) {
      alert("Isi data dengan lengkap!");
      return;
    }

    const now = new Date();
    const formattedTanggal =
      now.toLocaleDateString("id-ID") + " / " + now.toLocaleTimeString("id-ID");

    const newData = {
      id: "TX" + Date.now(),
      ...formData,
      tanggal: formattedTanggal,
    };

    setTransaksiList([...transaksiList, newData]);
    setFormData({
      order: "",
      kasir: "",
      statusPembayaran: "Belum Lunas",
      perkiraanSelesai: "",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus transaksi ini?");
    if (!confirmDelete) return;
    setTransaksiList(transaksiList.filter((t) => t.id !== id));
    setSelectedTransaksi(null);
  };

  const formatTanggalWaktu = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(",", " -");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 drop-shadow-md">
        Manajemen Transaksi
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? "Tutup Form" : "Tambah Transaksi"}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 border border-blue-300 rounded-xl bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Order</label>
              <input
                name="order"
                type="text"
                value={formData.order}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-300 focus:border-blue-500 px-4 py-2 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Kasir</label>
              <input
                name="kasir"
                type="text"
                value={formData.kasir}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-300 focus:border-blue-500 px-4 py-2 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Status Pembayaran</label>
              <select
                name="statusPembayaran"
                value={formData.statusPembayaran}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-300 focus:border-blue-500 px-4 py-2 rounded-lg outline-none"
              >
                <option value="Lunas">Lunas</option>
                <option value="Belum Lunas">Belum Lunas</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Perkiraan Selesai</label>
              <input
                name="perkiraanSelesai"
                type="datetime-local"
                value={formData.perkiraanSelesai}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-300 focus:border-blue-500 px-4 py-2 rounded-lg outline-none"
              />
            </div>
          </div>
          <div className="text-right mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            >
              Simpan Transaksi
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">Order</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">Kasir</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-blue-800">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-blue-800">Perkiraan</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-blue-800">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transaksiList.map((t) => (
              <tr key={t.id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-3">{t.order}</td>
                <td className="px-6 py-3">{t.kasir}</td>
                <td className="px-6 py-3 text-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      t.statusPembayaran === "Lunas"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {t.statusPembayaran}
                  </span>
                </td>
                <td className="px-6 py-3 text-center">{formatTanggalWaktu(t.perkiraanSelesai)}</td>
                <td className="px-6 py-3 text-center space-x-3">
                  <button
                    onClick={() => setSelectedTransaksi(t)}
                    className="text-blue-600 hover:underline"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTransaksi && (
        <div className="mt-10 p-6 border rounded-xl bg-white shadow-xl max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Detail Transaksi</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Order:</strong> {selectedTransaksi.order}</p>
            <p><strong>Kasir:</strong> {selectedTransaksi.kasir}</p>
            <p><strong>Status:</strong> {selectedTransaksi.statusPembayaran}</p>
            <p><strong>Perkiraan Selesai:</strong> {formatTanggalWaktu(selectedTransaksi.perkiraanSelesai)}</p>
            <p><strong>Tanggal Input:</strong> {selectedTransaksi.tanggal}</p>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setSelectedTransaksi(null)}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              Tutup
            </button>
            <button
              onClick={() => handleDelete(selectedTransaksi.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
