// MembershipSelectionPage.jsx (untuk customer memilih dan membeli loyalty)
import React, { useState } from "react";

const memberships = [
  {
    type: "Basic",
    harga: 0,
    deskripsi: "Akses standar tanpa loyalty."
  },
  {
    type: "Regular",
    harga: 30000,
    deskripsi: "Diskon 10% semua layanan, berlaku 30 hari"
  },
  {
    type: "Loyal",
    harga: 75000,
    deskripsi: "Diskon 20%, berlaku 60 hari, layanan prioritas"
  }
];

export default function MembershipSelectionPage() {
  const [membershipList, setMembershipList] = useState(() => {
    const saved = localStorage.getItem("membershipList");
    return saved ? JSON.parse(saved) : [];
  });

  const user = {
    id: "u001",
    nama: "Dita"
  };

  const handleBeli = (m) => {
    const nama = prompt("Masukkan Nama Lengkap:", user.nama);
    const noHp = prompt("Masukkan Nomor WhatsApp Aktif:", "08xxxxxxxxxx");
    if (!nama || !noHp) {
      alert("Pembelian dibatalkan. Data tidak lengkap.");
      return;
    }

    const tanggalBeli = new Date().toISOString().split("T")[0];
    const masaAktifHari = m.type === "Loyal" ? 60 : 30;

    const newData = {
      id: Date.now().toString(),
      namaPelanggan: nama,
      idPelanggan: user.id,
      tipe: m.type,
      harga: m.harga,
      tanggalBeli,
      masaAktifHari,
      status: "Aktif",
      noHp,
      benefit: m.deskripsi,
      tanggalPembelian: tanggalBeli
    };

    const updated = [...membershipList, newData];
    setMembershipList(updated);
    localStorage.setItem("membershipList", JSON.stringify(updated));

    const loyaltyData = localStorage.getItem("loyaltyData");
    const loyaltyList = loyaltyData ? JSON.parse(loyaltyData) : [];
    const updatedLoyalty = [...loyaltyList, newData];
    localStorage.setItem("loyaltyData", JSON.stringify(updatedLoyalty));

    const pesanWA = `Halo Admin, saya ingin membeli membership *${m.type}* dengan detail berikut:\n\nNama: ${nama}\nNo. WhatsApp: ${noHp}\nMembership: ${m.type}\nHarga: Rp ${m.harga.toLocaleString()}\nTanggal Beli: ${tanggalBeli}`;
    const linkWA = `https://wa.me/6281234567890?text=${encodeURIComponent(pesanWA)}`;
    window.open(linkWA, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#004AAD] text-center">
        Pilih Membership Loyalty
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memberships.map((m) => (
          <div
            key={m.type}
            className="border p-4 rounded-xl shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold text-[#004AAD]">
              {m.type} Member
            </h2>
            <p className="text-sm text-gray-700 my-2">{m.deskripsi}</p>
            <p className="font-bold text-lg text-green-700 mb-3">
              Rp {m.harga.toLocaleString()}
            </p>
            {m.harga > 0 ? (
              <button
                onClick={() => handleBeli(m)}
                className="w-full py-2 bg-[#004AAD] text-white rounded-lg hover:bg-blue-700"
              >
                Beli Sekarang
              </button>
            ) : (
              <p className="text-sm italic text-gray-500">Default Member</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
