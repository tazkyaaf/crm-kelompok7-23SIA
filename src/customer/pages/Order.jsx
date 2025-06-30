import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import OrderSearchSection from "../components/OrderSearchSection";
import OrderStatusModal from "../components/OrderStatusModal";

import { FaSearch, FaFilter, FaBox, FaClock, FaCheckCircle, FaExclamationCircle, FaCalendarAlt, FaUser } from "react-icons/fa";
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Input } from "@headlessui/react";

// Mock data for orders
const mockOrders = [
  {
    id: "HTM001234",
    customerName: "Sarah Wijaya",
    phone: "081234567890",
    email: "sarah@email.com",
    address: "Jl. Dago No. 123, Bandung",
    items: [
      { type: "Express", quantity: "2.5 kg", price: 30000 },
      { type: "Setrika Saja", quantity: "1 kg", price: 4000 },
    ],
    total: 34000,
    status: "completed",
    paymentStatus: "paid",
    membershipLevel: "regular",
    orderDate: "2024-01-15T08:30:00Z",
    pickupDate: "2024-01-15T14:00:00Z",
    completedDate: "2024-01-16T16:30:00Z",
    deliveryDate: "2024-01-16T18:00:00Z",
    estimatedDelivery: "2024-01-16T18:00:00Z",
    notes: "Pakaian kerja, harap hati-hati dengan kemeja putih",
    timeline: [
      {
        status: "ordered",
        time: "2024-01-15T08:30:00Z",
        description: "Pesanan diterima",
      },
      {
        status: "picked_up",
        time: "2024-01-15T14:00:00Z",
        description: "Pakaian sudah dijemput",
      },
      {
        status: "processing",
        time: "2024-01-15T15:30:00Z",
        description: "Sedang dalam proses pencucian",
      },
      {
        status: "completed",
        time: "2024-01-16T16:30:00Z",
        description: "Pencucian selesai",
      },
      {
        status: "delivered",
        time: "2024-01-16T18:00:00Z",
        description: "Pakaian sudah diantar",
      },
    ],
  },
];


export default function Order() {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    filterOrders();
  }, [searchQuery, statusFilter, orders]);

  const filterOrders = () => {
    let filtered = orders;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.phone.includes(searchQuery) ||
          order.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending_pickup":
        return "bg-yellow-100 text-yellow-800";
      case "ready_delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "pending_pickup", label: "Menunggu Pickup" },
    { value: "processing", label: "Dalam Proses" },
    { value: "ready_delivery", label: "Siap Diantar" },
    { value: "completed", label: "Selesai" },
    { value: "delivered", label: "Sudah Diantar" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Lacak Pesanan Anda
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pantau status dan riwayat pesanan laundry Anda secara real-time.
              Masukkan nomor pesanan atau data pribadi untuk mencari.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <OrderSearchSection />

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cari berdasarkan ID pesanan, nama, phone, atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <FaFilter className="w-4 h-4 text-gray-400" />
              <Select.Root value={statusFilter} onValueChange={setStatusFilter}>
                <Select.Trigger className="flex items-center justify-between w-48 h-12 px-4 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:outline-none">
                  <Select.Value placeholder="Filter by status" />
                  <Select.Icon className="text-gray-500">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                
                <Select.Content className="z-50 w-48 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <Select.Viewport className="p-1">
                    {statusOptions.map((option) => (
                      <Select.Item 
                        key={option.value} 
                        value={option.value}
                        className="relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      >
                        <Select.ItemText>{option.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-500">
            Menampilkan {filteredOrders.length} dari {orders.length} pesanan
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <FaBox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Tidak ada pesanan ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kata kunci pencarian atau filter status.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onClick={() => handleOrderClick(order)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Order Status Modal */}
      {showOrderModal && selectedOrder && (
        <OrderStatusModal
          isOpen={showOrderModal}
          onClose={() => setShowOrderModal(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
}
