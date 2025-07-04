import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import OrderSearchSection from "../components/OrderSearchSection";
import { useLocation } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaBox,
  FaCrown,
} from "react-icons/fa";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import OrderStatusModal from "../components/OrderStatusModal";
import { Input } from "@headlessui/react";
import { Badge, Crown } from "lucide-react";

// Dummy data
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
      { status: "ordered", time: "2024-01-15T08:30:00Z", description: "Pesanan diterima" },
      { status: "picked_up", time: "2024-01-15T14:00:00Z", description: "Pakaian sudah dijemput" },
      { status: "processing", time: "2024-01-15T15:30:00Z", description: "Sedang dalam proses pencucian" },
      { status: "completed", time: "2024-01-16T16:30:00Z", description: "Pencucian selesai" },
      { status: "delivered", time: "2024-01-16T18:00:00Z", description: "Pakaian sudah diantar" },
    ],
  },
  {
    id: "HTM001235",
    customerName: "Andi Pratama",
    phone: "081987654321",
    email: "andi@email.com",
    address: "Jl. Asia Afrika No. 45, Bandung",
    items: [
      { type: "Cuci Kering", quantity: "3 kg", price: 24000 },
      { type: "Bed Cover", quantity: "1 pcs", price: 15000 },
    ],
    total: 39000,
    status: "processing",
    paymentStatus: "pending",
    membershipLevel: "basic",
    orderDate: "2024-02-10T09:15:00Z",
    estimatedPickup: "2024-02-10T12:00:00Z",
    estimatedDelivery: "2024-02-11T18:00:00Z",
    notes: "Gunakan deterjen khusus untuk bed cover",
    timeline: [
      { status: "ordered", time: "2024-02-10T09:15:00Z", description: "Pesanan diterima" },
      { status: "processing", time: "2024-02-10T12:30:00Z", description: "Sedang dalam proses pencucian" },
    ],
  },
  {
    id: "HTM001236",
    customerName: "Lina Sari",
    phone: "082234567890",
    email: "lina@email.com",
    address: "Jl. Riau No. 88, Bandung",
    items: [
      { type: "Setrika Saja", quantity: "4 kg", price: 16000 },
    ],
    total: 16000,
    status: "pending_pickup",
    paymentStatus: "failed",
    membershipLevel: "loyal",
    orderDate: "2024-03-01T07:50:00Z",
    estimatedPickup: "2024-03-01T10:00:00Z",
    estimatedDelivery: "2024-03-02T16:00:00Z",
    notes: "Setrika lipat, tanpa pewangi",
    timeline: [
      { status: "ordered", time: "2024-03-01T07:50:00Z", description: "Pesanan diterima" },
    ],
  },
  {
    id: "HTM001237",
    customerName: "Rudi Hartono",
    phone: "085611223344",
    email: "rudi@email.com",
    address: "Jl. Merdeka No. 7, Bandung",
    items: [
      { type: "Express", quantity: "1.5 kg", price: 20000 },
      { type: "Cuci Lipat", quantity: "2 kg", price: 12000 },
    ],
    total: 32000,
    status: "ready_delivery",
    paymentStatus: "paid",
    membershipLevel: "regular",
    orderDate: "2024-03-05T10:00:00Z",
    pickupDate: "2024-03-05T12:00:00Z",
    estimatedDelivery: "2024-03-06T09:00:00Z",
    notes: "",
    timeline: [
      { status: "ordered", time: "2024-03-05T10:00:00Z", description: "Pesanan diterima" },
      { status: "picked_up", time: "2024-03-05T12:00:00Z", description: "Pakaian sudah dijemput" },
      { status: "processing", time: "2024-03-05T13:00:00Z", description: "Sedang dicuci" },
      { status: "completed", time: "2024-03-05T18:00:00Z", description: "Selesai dicuci" },
      { status: "ready_delivery", time: "2024-03-06T08:00:00Z", description: "Siap diantar" },
    ],
  },
];

// Ambil query string dari URL (?q=...)
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Order() {
  const [orders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const query = useQuery();

  useEffect(() => {
    const q = query.get("q");
    if (q) setSearchQuery(q);
  }, [query]);

  useEffect(() => {
    filterOrders();
  }, [searchQuery, statusFilter]);

  const filterOrders = () => {
    let filtered = orders;

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.phone.includes(searchQuery) ||
          order.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "pending_pickup", label: "Menunggu Pickup" },
    { value: "processing", label: "Dalam Proses" },
    { value: "ready_delivery", label: "Siap Diantar" },
    { value: "completed", label: "Selesai" },
    { value: "delivered", label: "Sudah Diantar" },
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
       {/* Header */}
            <div className="relative bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 text-blue-900 py-16 overflow-hidden">
              <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center mb-4 bg-white/20 text-blue-900 border border-white/30 px-3 py-1 rounded-full text-sm">
                  <FaCrown className="w-4 h-4 mr-2" />
                  Membership Eksklusif
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Order</h1>
                <p className="text-lg text-blue-900/80 max-w-2xl mx-auto">
                  Pantau status pesanan laundry anda secara real-time.
                </p>
              </div>
            </div>

      <OrderSearchSection />

      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari berdasarkan ID pesanan, nama, phone, atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <FaFilter className="w-4 h-4 text-gray-400" />
            <Select.Root value={statusFilter} onValueChange={setStatusFilter}>
              <Select.Trigger className="flex items-center justify-between w-48 h-12 px-4 border border-gray-300 rounded-md bg-white">
                <Select.Value placeholder="Filter by status" />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Content className="z-50 w-48 mt-1 bg-white border rounded-md shadow-lg">
                <Select.Viewport className="p-1">
                  {statusOptions.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      className="relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500 px-4">
          Menampilkan {filteredOrders.length} dari {orders.length} pesanan
        </div>
      </section>

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
