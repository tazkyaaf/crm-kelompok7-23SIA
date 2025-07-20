import React, { useState } from "react";
import axios from "axios";


const PredictForm = () => {
  const [berat, setBerat] = useState("");
  const [jenisPewangi, setJenisPewangi] = useState("Ocean Fresh");
  const [statusPembayaran, setStatusPembayaran] = useState("Lunas");
  const [durasiLayanan, setDurasiLayanan] = useState(1);
  const [hariOrder, setHariOrder] = useState("");
  const [hariSelesai, setHariSelesai] = useState("");
  const [hasil, setHasil] = useState(null);

  const convertToDayNumber = (tanggal) => {
    const date = new Date(tanggal);
    return date.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://0cdebf7d9602.ngrok-free.app/predict", {
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
        deskripsi = `Prediksi layanan adalah "${prediksi}" karena berat cucian cukup tinggi, durasi layanan cepat, 
        dan pewangi yang digunakan termasuk favorit pelanggan. Cocok untuk pelanggan yang butuh hasil cepat dan bersih maksimal.`;
      } else if (prediksi === "Reguler") {
        deskripsi = `Prediksi layanan adalah "${prediksi}" karena kombinasi berat yang sedang dan durasi layanan 
        yang normal, cocok untuk kebutuhan laundry harian.`;
      } else if (prediksi === "Cuci Kering Lipat") {
        deskripsi = `Prediksi layanan adalah "${prediksi}" karena durasi cukup panjang dan berat relatif ringan, 
        cocok untuk pelanggan yang ingin hasil rapi dan wangi.`;
      } else if (prediksi === "Setrika") {
        deskripsi = `Prediksi layanan adalah "${prediksi}" karena durasi layanan pendek dan berat cucian ringan. 
        Biasanya digunakan untuk pakaian yang hanya perlu disetrika saja tanpa pencucian.`;
      }

      setHasil({ layanan: prediksi, alasan: deskripsi });
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan prediksi. Cek backend atau input data.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Form Prediksi Layanan Laundry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Berat Cucian (kg):</label>
          <input
            type="number"
            step="0.1"
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Jenis Pewangi:</label>
          <select value={jenisPewangi} onChange={(e) => setJenisPewangi(e.target.value)} required className="w-full p-2 border rounded">
            <option value="">Pilih Pewangi</option>
            <option value="Lavender">Lavender</option>
            <option value="Ocean Fresh">Ocean Fresh</option>
            <option value="Musk">Musk</option>
            <option value="Rose">Rose</option>
            {/* Sesuaikan dengan encoder kamu */}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Status Pembayaran:</label>
          <select
            value={statusPembayaran}
            onChange={(e) => setStatusPembayaran(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="Lunas">Lunas</option>
            <option value="Belum Lunas">Belum Lunas</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Durasi Layanan (hari):</label>
          <input
            type="number"
            value={durasiLayanan}
            onChange={(e) => setDurasiLayanan(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tanggal Order:</label>
          <input
            type="date"
            value={hariOrder}
            onChange={(e) => setHariOrder(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tanggal Selesai:</label>
          <input
            type="date"
            value={hariSelesai}
            onChange={(e) => setHariSelesai(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Prediksi Layanan
        </button>
      </form>

      {hasil && (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-600 rounded">
          <h3 className="text-lg font-semibold">Hasil Prediksi:</h3>
          <p className="text-green-800">
            <strong>{hasil.layanan}</strong> — {hasil.alasan}
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictForm;
