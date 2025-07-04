import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaBox,
  FaMoneyBillWave,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaMapPin,
  FaFileInvoice,
  FaDownload,
  FaComments,
  FaMinus,
} from "react-icons/fa";

const OrderStatusModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const getStatusProgress = () => {
    const allStatuses = [
      "pending_pickup",
      "processing",
      "ready_delivery",
      "completed",
      "delivered",
    ];
    const index = allStatuses.indexOf(order.status);
    return ((index + 1) / allStatuses.length) * 100;
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

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-8">
                <h3 className="text-2xl font-bold text-center text-gray-800">
                  Detail Pesanan {order.id}
                </h3>

                {/* Order Summary */}
                <div className="border-2 border-blue-200 bg-blue-50/50 rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <FaBox className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {order.id}
                          </h3>
                          <p className="text-gray-600">
                            Dipesan pada {formatDate(order.orderDate)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {formatCurrency(order.total)}
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          <FaMoneyBillWave className="w-4 h-4 mr-1" />
                          {order.paymentStatus === "paid" ? "Lunas" : "Menunggu"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium text-gray-800">
                          {Math.round(getStatusProgress())}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getStatusProgress()}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informasi Pelanggan & Detail Pesanan */}
                <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaUser /> Informasi Pelanggan
                      </h4>
                      <p><strong>Nama:</strong> {order.customerName}</p>
                      <p><FaPhone className="inline mr-2" /> {order.phone}</p>
                      <p><FaMapMarkerAlt className="inline mr-2" /> {order.address}</p>
                      <p className="flex items-center gap-2">
                        <span>Membership:</span>
                        {getMembershipIcon(order.membershipLevel)}
                        <span className="uppercase font-medium">
                          {order.membershipLevel}
                        </span>
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaBox /> Detail Pesanan
                      </h4>
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded border"
                        >
                          <span>{item.type} <span className="text-sm">({item.quantity})</span></span>
                          <span className="font-medium text-blue-600">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      ))}
                      <div className="text-right font-bold text-blue-700 mt-2">
                        Total: {formatCurrency(order.total)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <FaClock /> Timeline
                  </h4>
                  <div className="space-y-4">
                    {order.timeline?.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-800">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(item.time)}
                        </p>
                        {item.location && (
                          <p className="text-sm text-gray-500">
                            <FaMapPin className="inline mr-1" /> {item.location}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Catatan:</strong> {order.notes}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.print()}
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded flex items-center gap-2"
                  >
                    <FaFileInvoice className="w-4 h-4" /> Cetak Invoice
                  </button>

                  <button
                    onClick={() => alert("Fitur download PDF akan segera tersedia")}
                    className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded flex items-center gap-2"
                  >
                    <FaDownload className="w-4 h-4" /> Download PDF
                  </button>

                  <button
                    onClick={() => window.open("tel:+6281234567890", "_self")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                  >
                    <FaComments className="w-4 h-4" /> Hubungi CS
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OrderStatusModal;
