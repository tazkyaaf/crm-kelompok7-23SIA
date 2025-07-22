import React, { useState } from "react";
import axios from "axios";

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const PredictForm = () => {
  const [berat, setBerat] = useState("");
  const [jenisPewangi, setJenisPewangi] = useState("Ocean Fresh");
  const [statusPembayaran, setStatusPembayaran] = useState("Lunas");
  const [durasiLayanan, setDurasiLayanan] = useState(1);
  const [hariOrder, setHariOrder] = useState("");
  const [hariSelesai, setHariSelesai] = useState("");
  const [hasil, setHasil] = useState(null);
  const [statistik, setStatistik] = useState({});

  const BASE_URL = "https://47889774ed37.ngrok-free.app";

  const convertToDayNumber = (tanggal) => {
    const date = new Date(tanggal);
    return date.getDay(); // 0 = Minggu, ..., 6 = Sabtu
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/predict`, {
        berat: parseFloat(berat),
        jenis_pewangi: jenisPewangi,
        status_pembayaran: statusPembayaran,
        durasi_layanan: parseInt(durasiLayanan),
        hari_order: convertToDayNumber(hariOrder),
        hari_selesai: convertToDayNumber(hariSelesai),
      });

      const prediksi = response.data.predicted_layanan;
      let deskripsi = "";

      if (prediksi === "Express") {
        deskripsi = `Prediksi layanan adalah "${prediksi}" karena berat cucian cukup tinggi, durasi layanan cepat, dan pewangi favorit pelanggan.`;
      } else if (prediksi === "Reguler") {
        deskripsi = `Prediksi layanan adalah "${prediksi}" karena kombinasi berat sedang dan durasi layanan normal.`;
      } else if (prediksi === "Cuci Kering Lipat") {
        deskripsi = `Prediksi layanan adalah "${prediksi}" karena durasi cukup panjang dan berat ringan.`;
      } else if (prediksi === "Setrika") {
        deskripsi = `Prediksi layanan adalah "${prediksi}" karena durasi pendek dan berat cucian ringan.`;
      }

      setHasil({ layanan: prediksi, alasan: deskripsi });

      // Update statistik
      setStatistik((prev) => ({
        ...prev,
        [prediksi]: (prev[prediksi] || 0) + 1,
      }));
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan prediksi. Cek backend atau input data.");
    }
  };

  const pieChartData = Object.entries(statistik).map(([key, value]) => ({
    name: key,
    value,
  }));

  const barChartData = pieChartData;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Form Prediksi Layanan Laundry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Berat Cucian (kg):</label>
          <input type="number" step="0.1" value={berat} onChange={(e) => setBerat(e.target.value)} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label>Jenis Pewangi:</label>
          <select value={jenisPewangi} onChange={(e) => setJenisPewangi(e.target.value)} required className="w-full p-2 border rounded">
            <option value="Lavender">Lavender</option>
            <option value="Ocean Fresh">Ocean Fresh</option>
            <option value="Musk">Musk</option>
            <option value="Rose">Rose</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Status Pembayaran:</label>
          <select value={statusPembayaran} onChange={(e) => setStatusPembayaran(e.target.value)} className="w-full border p-2 rounded">
            <option value="Lunas">Lunas</option>
            <option value="Belum Lunas">Belum Lunas</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Durasi Layanan (hari):</label>
          <input type="number" value={durasiLayanan} onChange={(e) => setDurasiLayanan(e.target.value)} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tanggal Order:</label>
          <input type="date" value={hariOrder} onChange={(e) => setHariOrder(e.target.value)} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tanggal Selesai:</label>
          <input type="date" value={hariSelesai} onChange={(e) => setHariSelesai(e.target.value)} required className="w-full border p-2 rounded" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Prediksi Layanan</button>
      </form>

      {hasil && (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-600 rounded">
          <h3 className="text-lg font-semibold">Hasil Prediksi:</h3>
          <p className="text-green-800">
            <strong>{hasil.layanan}</strong> — {hasil.alasan}
          </p>
        </div>
      )}

      {/* Tree */}
      {/* <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Visualisasi Pohon Keputusan</h2>
        <div style={{ width: "100%", height: "400px", border: "1px solid #ddd" }}>
          <Tree data={treeData} orientation="vertical" />
        </div>
      </div> */}

      {/* Chart */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-2">Distribusi Prediksi (Pie Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Frekuensi Layanan (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PredictForm;
