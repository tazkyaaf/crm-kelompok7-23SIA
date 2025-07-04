import { useState, useRef } from "react";
import { FaBox, FaClock, FaBell, FaShieldAlt, FaSave, FaImage, FaTrash } from "react-icons/fa";

export default function AdminSettings() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "HTM LAUNDRY",
    address: "Jl. Sudirman No. 123, Pekanbaru",
    phone: "+62 761-123-456",
    email: "info@htmlaundry.com",
    logo: null, // Will store the logo file or URL
    operatingHours: {
      weekdays: { open: "08:00", close: "20:00" },
      saturday: { open: "08:00", close: "18:00" },
      sunday: { open: "09:00", close: "17:00" }
    }
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (day, field, value) => {
    setBusinessInfo(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessInfo(prev => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setBusinessInfo(prev => ({ ...prev, logo: null }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Saving business info:", businessInfo);
    alert('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>
          <p className="text-gray-600">
            Konfigurasi sistem dan preferensi aplikasi
          </p>
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center shadow hover:shadow-md transition-all"
        >
          <FaSave className="mr-2" />
          Simpan Perubahan
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business Settings */}
          <div className="bg-white rounded-xl shadow border border-gray-200">
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center space-x-2">
                <FaBox className="text-red-500" />
                <span className="font-semibold text-gray-800">Pengaturan Bisnis</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Perusahaan
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {businessInfo.logo ? (
                      <>
                        <img 
                          src={businessInfo.logo} 
                          alt="Company Logo" 
                          className="w-16 h-16 rounded-lg object-cover border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                        <FaImage className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center"
                    >
                      <FaImage className="mr-2" />
                      {businessInfo.logo ? "Ganti Logo" : "Unggah Logo"}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: JPG, PNG (Maks. 2MB)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Bisnis
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={businessInfo.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <input 
                  type="text" 
                  name="address"
                  value={businessInfo.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telepon
                  </label>
                  <input 
                    type="text" 
                    name="phone"
                    value={businessInfo.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={businessInfo.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-xl shadow border border-gray-200">
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center space-x-2">
                <FaClock className="text-blue-500" />
                <span className="font-semibold text-gray-800">Jam Operasional</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {[
                { day: "weekdays", label: "Senin - Jumat", open: businessInfo.operatingHours.weekdays.open, close: businessInfo.operatingHours.weekdays.close },
                { day: "saturday", label: "Sabtu", open: businessInfo.operatingHours.saturday.open, close: businessInfo.operatingHours.saturday.close },
                { day: "sunday", label: "Minggu", open: businessInfo.operatingHours.sunday.open, close: businessInfo.operatingHours.sunday.close },
              ].map((schedule, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-24 text-sm font-medium text-gray-700">
                    {schedule.label}
                  </div>
                  <input
                    type="time"
                    value={schedule.open}
                    onChange={(e) => handleTimeChange(schedule.day, 'open', e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="time"
                    value={schedule.close}
                    onChange={(e) => handleTimeChange(schedule.day, 'close', e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}