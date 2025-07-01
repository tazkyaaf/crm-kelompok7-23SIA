import { useState } from "react";
import { 
  FiSearch, 
  FiPackage, 
  FiPhone, 
  FiMail, 
  FiCalendar,
  FiAlertTriangle,
  FiRefreshCw,
  FiBell
} from "react-icons/fi";


const OrderSearchSection = () => {
  const [searchData, setSearchData] = useState({
    orderId: "",
    phone: "",
    email: "",
    orderDate: "",
  });
  const [activeTab, setActiveTab] = useState("order-id");

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();
    console.log("Quick search:", searchData);
  };

  // Custom select component
  const CustomSelect = ({ options, placeholder, className, ...props }) => {
    return (
      <select 
        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border-0 shadow-xl rounded-lg bg-white overflow-hidden">
          {/* Card Header */}
          <div className="text-center p-6 border-b">
            <div className="text-2xl font-bold text-gray-800 flex items-center justify-center space-x-2">
              <FiSearch className="text-blue-600" />
              <span>Cari Pesanan Anda</span>
            </div>
            <p className="text-gray-500 mt-2">
              Masukkan informasi pesanan untuk melacak status secara real-time
            </p>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Tabs Navigation */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveTab("order-id")}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-t-lg border-b-2 ${activeTab === "order-id" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600"}`}
                >
                  <FiPackage className="w-5 h-5" />
                  <span>ID Pesanan</span>
                </button>
                <button
                  onClick={() => setActiveTab("phone")}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-t-lg border-b-2 ${activeTab === "phone" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600"}`}
                >
                  <FiPhone className="w-5 h-5" />
                  <span>No. Telepon</span>
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-t-lg border-b-2 ${activeTab === "email" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600"}`}
                >
                  <FiMail className="w-5 h-5" />
                  <span>Email</span>
                </button>
              </div>

              {/* Order ID Tab Content */}
              {activeTab === "order-id" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Nomor Pesanan
                    </label>
                    <div className="relative">
                      <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="orderId"
                        placeholder="Contoh: HTM001234"
                        value={searchData.orderId}
                        onChange={(e) => handleInputChange("orderId", e.target.value)}
                        className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center font-mono text-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      Nomor pesanan dapat ditemukan di email konfirmasi atau struk
                      pembayaran
                    </p>
                  </div>

                  <button
                    onClick={handleQuickSearch}
                    disabled={!searchData.orderId}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSearch className="w-5 h-5 mr-2" />
                    Cari Pesanan
                  </button>
                </div>
              )}

              {/* Phone Tab Content */}
              {activeTab === "phone" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Nomor Telepon
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="081234567890"
                        value={searchData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      Masukkan nomor telepon yang digunakan saat pemesanan
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tanggal Pesanan (Opsional)
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="orderDate"
                        type="date"
                        value={searchData.orderDate}
                        onChange={(e) => handleInputChange("orderDate", e.target.value)}
                        className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleQuickSearch}
                    disabled={!searchData.phone}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSearch className="w-5 h-5 mr-2" />
                    Cari Pesanan
                  </button>
                </div>
              )}

              {/* Email Tab Content */}
              {activeTab === "email" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={searchData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      Email yang digunakan untuk menerima konfirmasi pesanan
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tanggal Pesanan (Opsional)
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="orderDateEmail"
                        type="date"
                        value={searchData.orderDate}
                        onChange={(e) => handleInputChange("orderDate", e.target.value)}
                        className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleQuickSearch}
                    disabled={!searchData.email}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSearch className="w-5 h-5 mr-2" />
                    Cari Pesanan
                  </button>
                </div>
              )}

              {/* Help Section */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FiAlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-800">
                      Tidak menemukan pesanan Anda?
                    </h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>
                        • Pastikan nomor pesanan, telepon, atau email yang
                        dimasukkan benar
                      </p>
                      <p>
                        • Pesanan mungkin masih dalam proses konfirmasi (tunggu
                        5-10 menit)
                      </p>
                      <p>
                        • Hubungi customer service kami di WhatsApp:{" "}
                        <strong>0812-3456-7890</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-gray-500">Tracking Online</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    <FiRefreshCw className="inline-block animate-spin" />
                  </div>
                  <div className="text-sm text-gray-500">Update Status</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    <FiBell className="mx-auto" />
                  </div>
                  <div className="text-sm text-gray-500">
                    Notifikasi Otomatis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default OrderSearchSection;