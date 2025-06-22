import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const stats = [
    {
      label: "Pendapatan Hari Ini",
      value: "$53,000",
      percent: "+55%",
      color: "text-green-600",
      percentColor: "text-green-500",
    },
    {
      label: "Pengguna Hari Ini",
      value: "2,300",
      percent: "+3%",
      color: "text-blue-600",
      percentColor: "text-blue-500",
    },
    {
      label: "Klien Baru",
      value: "+3,462",
      percent: "-2%",
      color: "text-red-600",
      percentColor: "text-red-500",
    },
    {
      label: "Penjualan",
      value: "$103,430",
      percent: "+5%",
      color: "text-purple-600",
      percentColor: "text-purple-500",
    },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penjualan (dalam ribuan $)",
        data: [12, 19, 14, 17, 22, 30, 28, 26, 32, 35, 40, 45],
        backgroundColor: "rgba(139, 92, 246, 0.7)", // purple
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Penjualan Bulanan Tahun Ini" },
    },
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Jumlah Pelanggan",
        data: [50, 75, 120, 180, 220, 260, 300, 350, 400, 430, 460, 500],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pertumbuhan Pelanggan Tahun Ini" },
    },
  };

  return (
    <div className="p-6 space-y-8">
      {/* Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, percent, color, percentColor }) => (
          <div key={label} className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <h2 className={`text-2xl font-bold flex items-center gap-2 ${color}`}>
              {value}
              <span className={`text-xs font-semibold ${percentColor}`}>{percent}</span>
            </h2>
          </div>
        ))}
      </div>

      {/* Grafik Penjualan Bulanan */}
      <div className="bg-white rounded-xl shadow p-6">
        <Bar options={barOptions} data={barData} />
      </div>

      {/* Grafik Pertumbuhan Pelanggan */}
      <div className="bg-white rounded-xl shadow p-6">
        <Line options={lineOptions} data={lineData} />
      </div>
    </div>
  );
};

export default Dashboard;
