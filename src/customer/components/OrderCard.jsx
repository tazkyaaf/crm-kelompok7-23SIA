import React from "react";
import { 
  FaBox, 
  FaCalendarAlt,
  FaChevronDown,
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
      hour: "2-digit",
      minute: "2-digit",
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
    <div className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden rounded-lg">
      <div className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-gray-800">
                  {order.id}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>{formatDate(order.orderDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getMembershipIcon(order.membershipLevel)}
                  <span className={`px-2 py-1 rounded-full text-xs ${getMembershipColor(order.membershipLevel)}`}>
                    {order.membershipLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatCurrency(order.total)}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                <FaMoneyBillWave className="inline mr-1" />
                {getPaymentStatusText(order.paymentStatus)}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <FaUser className="text-gray-400" />
                <span className="font-medium text-gray-800">
                  {order.customerName}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FaPhone className="text-gray-400" />
                <span className="text-gray-500">{order.phone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-sm">
                <FaMapMarkerAlt className="mt-0.5 text-gray-400" />
                <span className="text-gray-500 leading-relaxed">
                  {order.address}
                </span>
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
              <FaBox className="text-gray-400" />
              <span>Detail Layanan</span>
            </h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-800">
                      {item.type}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({item.quantity})
                    </span>
                  </div>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Summary */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
              <FaClock className="text-gray-400" />
              <span>Timeline</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {order.pickupDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup:</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(order.pickupDate)}
                  </span>
                </div>
              )}
              {order.estimatedPickup && !order.pickupDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Est. Pickup:</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(order.estimatedPickup)}
                  </span>
                </div>
              )}
              {order.estimatedDelivery && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Est. Delivery:</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(order.estimatedDelivery)}
                  </span>
                </div>
              )}
              {order.deliveryDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivered:</span>
                  <span className="font-medium text-green-600">
                    {formatDate(order.deliveryDate)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Catatan:</strong> {order.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md flex items-center"
            >
              <FaEye className="mr-2" />
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;