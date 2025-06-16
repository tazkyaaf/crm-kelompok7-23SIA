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
import { Line, Bar, Doughnut } from "react-chartjs-2";

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
    { title: "Total Sales", value: "$560K" },
    { title: "Total Profit", value: "$185K" },
    { title: "Total Cost", value: "$375K" },
    { title: "Revenue", value: "$742K" },
    { title: "Net Income", value: "$150K" },
    { title: "Today", value: "$4600" },
  ];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Sales",
        data: [90, 85, 99, 88, 95, 98, 100, 97],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "Cost",
        data: [72, 69, 81, 66, 75, 79, 82, 80],
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const doughnutData = {
    labels: ["Fashion", "Accessories"],
    datasets: [
      {
        data: [251, 176],
        backgroundColor: ["#6366F1", "#93C5FD"],
        borderWidth: 1,
      },
    ],
  };

  const conversionsData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Visitors",
        data: [100, 120, 90, 130, 110, 115, 125],
        backgroundColor: "#A5B4FC",
      },
      {
        label: "Conversions",
        data: [60, 80, 50, 70, 60, 75, 85],
        backgroundColor: "#60A5FA",
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Hello Aisah!</h1>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-3 text-center"
          >
            <p className="text-xs text-gray-500">{card.title}</p>
            <h2 className="text-lg font-bold text-indigo-600">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Gross Sales Chart - Full Width */}
      <div className="bg-white rounded-lg shadow p-4 w-full">
        <h2 className="font-semibold text-sm mb-2">Gross Sales</h2>
        <div className="w-full h-[300px]">
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Website Visitors & History */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-3 text-center">
          <p className="text-xs text-gray-500">Website Visitors</p>
          <h2 className="text-xl font-bold">750K</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-3 text-center">
          <p className="text-xs text-gray-500">New Customers</p>
          <h2 className="text-xl font-bold">7,500</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-3 text-sm">
          <h2 className="font-semibold mb-1">Histori</h2>
          <ul className="space-y-1">
            <li>✅ $2400 Purchase - 11 JUL</li>
            <li>🛒 New order #8744152 - 11 JUL</li>
            <li>👤 New user - 11 JUL</li>
          </ul>
        </div>
      </div>

      {/* Earnings + Full Width Conversions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-3">
          <h2 className="text-sm font-semibold mb-2">Earnings</h2>
          <div className="h-40">
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 w-full">
          <h2 className="text-sm font-semibold mb-2">Conversions</h2>
          <div className="h-40">
            <Bar data={conversionsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
