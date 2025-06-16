import React, { useEffect, useState } from "react";
import { Users, CalendarCheck2, BadgeCheck } from "lucide-react";

export default function LoyaltyAdminPage() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("loyaltyData");
    setMemberships(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-[#004AAD] text-center">
        <BadgeCheck className="inline mr-2" /> Manajemen Loyalty Pelanggan
      </h1>

      {memberships.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada data loyalty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberships.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 shadow-md border border-gray-200 rounded-2xl hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 text-[#004AAD] font-semibold mb-2">
                <Users size={18} /> {item.namaPelanggan}
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">ID:</span> {item.idPelanggan}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Tipe Membership:</span> {item.tipe}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Harga:</span> Rp {item.harga.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Benefit:</span> {item.benefit}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-bold ${
                    item.status === "Aktif" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <CalendarCheck2 className="inline w-4 h-4 mr-1" />
                {item.tanggalPembelian}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}