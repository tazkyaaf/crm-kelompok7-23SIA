import React from "react";
import {
  FaBox,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaMoneyBillWave,
  FaClock
} from "react-icons/fa";

const OrderCard = ({ order, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending_pickup":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ready_delivery":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "processing":
        return "Dalam Proses";
      case "pending_pickup":
        return "Menunggu Pickup";
      case "ready_delivery":
        return "Siap Diantar";
      case "delivered":
        return "Sudah Diantar";
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Lunas";
      case "pending":
        return "Menunggu";
      case "failed":
        return "Gagal";
      default:
        return status;
    }
  };

  const getMembershipIcon = (level) => {
    switch (level) {
      case "basic":
        return <span className="text-yellow-500">🎁</span>;
      case "regular":
        return <span className="text-blue-500">⭐</span>;
      case "loyal":
        return <span className="text-purple-500">👑</span>;
      default:
        return <span className="text-gray-500">👤</span>;
    }
  };

  const getMembershipColor = (level) => {
    switch (level) {
      case "basic":
        return "bg-gray-100 text-gray-800";
      case "regular":
        return "bg-blue-100 text-blue-800";
      case "loyal":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-5xl mx-auto border border-blue-200 rounded-2xl p-6 shadow-md bg-white">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <FaBox className="text-2xl text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
              <p className="text-sm text-gray-500">{order.serviceType}</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-blue-100 p-3 rounded-xl">
              <h4 className="font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaBox className="text-blue-400" /> Item Laundry:
              </h4>
              <ul className="text-gray-600 text-sm list-disc list-inside">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.type}</li>
                ))}
              </ul>
            </div>
            <div className="border border-blue-100 p-3 rounded-xl">
              <h4 className="font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaClock className="text-blue-400" /> Timeline:
              </h4>
              <p className="text-gray-600 text-sm">
                Tanggal Order: <strong>{formatDate(order.orderDate)}</strong><br />
                Estimasi Selesai: <strong>{formatDate(order.estimatedDelivery)}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-56 flex flex-col justify-between gap-4">
          <div>
            <div className="text-right text-xl font-bold text-gray-800">{formatCurrency(order.total)}</div>
            <p className="text-right text-sm text-gray-500">Total Pembayaran</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={onClick}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium py-2 px-3 rounded-lg"
            >
              Lihat Detail
            </button>
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-500 bg-gray-50 text-sm font-medium py-2 px-3 rounded-lg cursor-not-allowed"
            >
              <FaPhone className="text-xs" /> Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;