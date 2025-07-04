import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaDollarSign, FaChartLine, FaStar, FaRocket } from "react-icons/fa";
import { Truck, Shirt, Scissors, WashingMachine } from "lucide-react";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Dashboard = () => {
  const cards = [
    {
      title: "Total Orders",
      value: "$12,750",
      icon: <FaDollarSign className="text-indigo-600 text-2xl" />,
    },
    {
      title: "Revenue",
      value: "$5,600",
      icon: <FaChartLine className="text-indigo-600 text-2xl" />,
    },
    {
      title: "Kepuasan Pelanggan",
      value: "4.9/5",
      icon: <FaStar className="text-yellow-400 text-2xl" />,
    },
    {
      title: "Popular Service",
      value: "Express",
      icon: <FaRocket className="text-indigo-600 text-2xl" />,
    },
  ];

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
    datasets: [
      {
        label: "Deposit",
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        data: [300, 250, 280, 310, 150, 290, 310],
      },
      {
        label: "Withdraw",
        backgroundColor: "#ec4899",
        borderRadius: 6,
        data: [450, 350, 340, 470, 190, 400, 390],
      },
    ],
  };

  const topService = [
    {
      name: "Express",
      date: "25 Jan 2021",
      icon: <Truck className="text-indigo-600" />,
      value: 470,
    },
    {
      name: "Reguler",
      date: "25 Jan 2021",
      icon: <Shirt className="text-orange-400" />,
      value: 290,
    },
    {
      name: "Cuci Lipat",
      date: "25 Jan 2021",
      icon: <WashingMachine className="text-indigo-600" />,
      value: 210,
    },
    {
      name: "Strika Saja",
      date: "25 Jan 2021",
      icon: <Scissors className="text-orange-400" />,
      value: 180,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center"
          >
            <div className="mb-2 p-3 rounded-full bg-indigo-100">{card.icon}</div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="text-xl font-bold text-indigo-600">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Orders Chart */}
      <div>
        <h2 className="font-semibold text-xl mt-8 mb-2">Orders Per Month</h2>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="w-full h-[300px]">
            <Bar
              data={ordersData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Services */}
      <div>
        <h2 className="font-semibold text-xl mt-8 mb-2">Top Service</h2>
        <div className="bg-white rounded-xl shadow p-4 space-y-4">
          {topService.map((service, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-full">{service.icon}</div>
              <div className="w-full">
                <p className="font-semibold">{service.name}</p>
                <p className="text-sm text-gray-500">{service.date}</p>
                <div className="mt-1 w-full h-3 bg-gray-200 rounded-full">
                  <div
                    className="h-3 rounded-full bg-indigo-600"
                    style={{ width: `${(service.value / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
