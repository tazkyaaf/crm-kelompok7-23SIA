import React, { useState, useEffect } from "react";
import { Receipt, Calendar, Package, Plus, X } from "lucide-react";

export default function OrderManagementPage() {
  const jenisLaundryList = [
    { label: "Express", harga: 12000 },
    { label: "Reguler", harga: 7000 },
    { label: "Cuci Kering Lipat", harga: 5000 },
    { label: "Strika", harga: 4000 },
  ];

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orderList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orderList", JSON.stringify(orders));
  }, [orders]);

  const [formData, setFormData] = useState({
    namaPelanggan: "",
    nid: "",
    tanggalLaundry: "",
    tanggalAmbil: "",
    metodePembayaran: "Tunai",
    alamat: "",
    catatan: "",
    berat: 0,
    jenisLaundry: "Reguler",
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "berat" ? parseFloat(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      namaPelanggan: "",
      nid: "",
      tanggalLaundry: "",
      tanggalAmbil: "",
      metodePembayaran: "Tunai",
      alamat: "",
      catatan: "",
      berat: 0,
      jenisLaundry: "Reguler",
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedWaktu =
      now.toLocaleDateString("id-ID") + " / " + now.toLocaleTimeString("id-ID");

    const hargaPerJenis = jenisLaundryList.find(
      (j) => j.label === formData.jenisLaundry
    )?.harga || 0;

    const total = formData.berat * hargaPerJenis;

    if (editingId) {
      const updated = orders.map((order) =>
        order.id === editingId
          ? { ...order, ...formData, total, diperbaharui: formattedWaktu }
          : order
      );
      setOrders(updated);
    } else {
      const newOrder = {
        id: Date.now().toString(),
        ...formData,
        total,
        dibuat: now.toLocaleDateString("id-ID"),
        diperbaharui: formattedWaktu,
      };
      setOrders([...orders, newOrder]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (order) => {
    setFormData({ ...order });
    setEditingId(order.id);
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-[#004AAD] text-center">
        🧺 Manajemen Pesanan Laundry
      </h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          if (!showForm) resetForm();
        }}
        className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-[#004AAD] text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
      >
        {showForm ? <X size={20} /> : <Plus size={20} />}
        {showForm ? "Tutup Form" : "Tambah Pesanan"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 p-6 border border-gray-200 bg-white rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn"
        >
          {[
            { label: "Nama Pelanggan", name: "namaPelanggan", type: "text", placeholder: "Masukkan nama" },
            { label: "NID", name: "nid", type: "text", placeholder: "Masukkan NID" },
            { label: "Tanggal Laundry", name: "tanggalLaundry", type: "date" },
            { label: "Tanggal Ambil", name: "tanggalAmbil", type: "date" },
            {
              label: "Metode Pembayaran",
              name: "metodePembayaran",
              type: "select",
              options: ["Tunai", "Transfer", "QRIS"],
            },
            {
              label: "Jenis Laundry",
              name: "jenisLaundry",
              type: "select",
              options: jenisLaundryList.map((j) => j.label),
            },
            { label: "Alamat", name: "alamat", type: "text", placeholder: "Masukkan alamat" },
            {
              label: "Berat (kg)",
              name: "berat",
              type: "number",
              placeholder: "Contoh: 2.5",
              min: 0,
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  min={field.min}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
                  required={field.name !== "alamat"}
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Catatan
            </label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
              rows="3"
              placeholder="Masukkan catatan tambahan..."
            />
          </div>

          <div className="text-[#004AAD] font-semibold">
            Total: Rp{" "}
            {(
              formData.berat *
              (jenisLaundryList.find((j) => j.label === formData.jenisLaundry)
                ?.harga || 0)
            ).toLocaleString()}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              💾 Simpan Pesanan
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md border border-gray-200 hover:shadow-xl transition rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 text-[#004AAD] font-semibold mb-2">
              <Receipt size={18} />
              Order ID: {order.id}
            </div>
            <p className="text-sm text-gray-600">
              <Calendar className="inline w-4 h-4 mr-1" />
              <span className="block">Laundry: {order.tanggalLaundry}</span>
              <span className="block">Ambil: {order.tanggalAmbil}</span>
            </p>
            <p className="text-sm text-gray-700">Nama: {order.namaPelanggan}</p>
            <p className="text-sm text-gray-700">NID: {order.nid}</p>
            <p className="text-sm text-gray-700">Alamat: {order.alamat}</p>
            <p className="text-sm text-gray-700">Berat: {order.berat} kg</p>
            <p className="text-sm text-gray-700">Jenis: {order.jenisLaundry}</p>
            <p className="text-sm text-gray-700">Metode: {order.metodePembayaran}</p>
            <p className="text-sm text-gray-700">
              Catatan: {order.catatan || "-"}
            </p>
            <p className="text-[#004AAD] font-bold mt-2 text-lg">
              <Package className="inline w-5 h-5 mr-1" />
              Rp {order.total.toLocaleString()}
            </p>
            <button
              className="text-blue-600 hover:text-blue-800 font-semibold mt-4 text-sm"
              onClick={() => handleEdit(order)}
            >
              ✏️ Edit Pesanan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
