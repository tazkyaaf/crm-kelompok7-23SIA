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

  const topService = [
    { name: "Express", length: 300, color: "bg-indigo-600" },
    { name: "Reguler", length: 250, color: "bg-orange-400" },
    { name: "Cuci Lipat", length: 180, color: "bg-indigo-600" },
    { name: "Strika Saja", length: 130, color: "bg-orange-400" },
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <div className="mb-2">{card.icon}</div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="text-xl font-bold text-indigo-600">{card.value}</h2>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-xl mt-8 mb-2">Orders Per Month</h2>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="w-full h-[300px]">
          <Bar data={ordersData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <h2 className="font-semibold text-xl mt-8 mb-2">Top Service</h2>
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
