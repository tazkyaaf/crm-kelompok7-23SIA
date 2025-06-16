import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
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
        data: [85, 91, 98, 87, 95, 90, 100, 110],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Cost",
        data: [70, 75, 80, 72, 78, 76, 83, 85],
        borderColor: "#34d399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Fashion", "Accessories"],
    datasets: [
      {
        data: [251000, 176000],
        backgroundColor: ["#4f46e5", "#06b6d4"],
      },
    ],
  };

  const conversionsData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Fashion",
        data: [80, 90, 100, 85, 95, 110, 120],
        backgroundColor: "#4f46e5",
      },
      {
        label: "Accessories",
        data: [60, 70, 85, 60, 70, 90, 100],
        backgroundColor: "#06b6d4",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Hello Aisah!</h1>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="text-xl font-bold text-indigo-600">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold text-lg mb-2">Gross Sales</h2>
        <Line data={lineData} />
      </div>

      {/* Visitors and Customers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Website Visitors</p>
          <h2 className="text-2xl font-bold">750K</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">New Customers</p>
          <h2 className="text-2xl font-bold">7,500</h2>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-2">Histori</h2>
          <ul className="text-sm space-y-2">
            <li>✅ $2400, Purchase - 11 JUL 8:10 PM</li>
            <li>🛒 New order #8744152 - 11 JUL 7 PM</li>
            <li>👤 New user added - 11 JUL 1:21 AM</li>
          </ul>
        </div>
      </div>

      {/* Earnings and Conversions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-2">Earnings</h2>
          <Doughnut data={doughnutData} />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-2">Conversions</h2>
          <Bar data={conversionsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
