import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaDollarSign, FaChartLine, FaStar, FaRocket } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const cards = [
    { title: "Total Orders", value: "$12,750", icon: <FaDollarSign className="text-indigo-600 text-2xl" /> },
    { title: "Revenue", value: "$5,600", icon: <FaChartLine className="text-indigo-600 text-2xl" /> },
    { title: "Kepuasan Pelanggan", value: "4.9/5⭐", icon: <FaStar className="text-yellow-400 text-2xl" /> },
    { title: "Popular Service", value: "Express", icon: <FaRocket className="text-indigo-600 text-2xl" /> },
  ];

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
    datasets: [
      {
        label: "Deposit",
        backgroundColor: "#06b6d4",
        borderRadius: 999,
        data: [300, 250, 280, 310, 150, 290, 310],
      },
      {
        label: "Withdraw",
        backgroundColor: "#4f46e5",
        borderRadius: 999,
        data: [200, 180, 210, 240, 120, 220, 270],
      },
    ],
  };

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

  const topService = [
    { name: "Express", length: 300, color: "bg-indigo-600" },
    { name: "Reguler", length: 250, color: "bg-orange-400" },
    { name: "Cuci Lipat", length: 180, color: "bg-indigo-600" },
    { name: "Strika Saja", length: 130, color: "bg-orange-400" },
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <div className="mb-2">{card.icon}</div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="text-xl font-bold text-indigo-600">{card.value}</h2>
          </div>
        ))}
      </div>

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

      {/* Chart Orders */}
      <h2 className="font-semibold text-sm mt-8 mb-2">Orders Per Month</h2>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="w-full h-[300px]">
          <Bar data={ordersData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Chart Bar Penjualan */}
      <h2 className="font-semibold text-sm mt-8 mb-2">Penjualan Bulanan</h2>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="w-full h-[300px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Chart Line Pelanggan */}
      <h2 className="font-semibold text-sm mt-8 mb-2">Pertumbuhan Pelanggan</h2>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="w-full h-[300px]">
          <Bar data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Top Service */}
      <h2 className="font-semibold text-sm mt-8 mb-2">Top Service</h2>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="space-y-3">
          {topService.map((service, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{service.name}</span>
                <span>{service.length}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className={`${service.color} h-3 rounded-full`}
                  style={{ width: `${(service.length / 300) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
