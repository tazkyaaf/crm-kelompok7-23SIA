import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingCalculatorSection from "../components/PricingCalculatorSection";
import MembershipCard from "../components/MembershipCard";

const Service = ({ onSeeAll }) => {
  const [showMembershipRegistration, setShowMembershipRegistration] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const services = [
    {
      title: "Express",
      desc: "Cuci kilat selesai dalam 24 jam",
      icon: (
        <img
          src="/assets/wm.png"
          alt="Express"
          className="w-10 h-10 mx-auto mb-4"
        />
      ),
    },
    {
      title: "Setrika Saja",
      desc: "Layanan setrika profesional",
      icon: (
        <img
          src="/assets/strika.png"
          alt="Setrika"
          className="w-10 h-10 mx-auto mb-4"
        />
      ),
    },
    {
      title: "Cuci Lipat",
      desc: "Cuci bersih dengan lipatan rapi",
      icon: (
        <img
          src="/assets/Clothes.png"
          alt="Cuci Lipat"
          className="w-10 h-10 mx-auto mb-4"
        />
      ),
    },
    {
      title: "Reguler",
      desc: "Paket lengkap cuci & setrika",
      icon: (
        <img
          src="/assets/Shoes.png"
          alt="Reguler"
          className="w-10 h-10 mx-auto mb-4"
        />
      ),
    },
  ];

  const handleMembershipClick = (membershipData) => {
    setSelectedMembership(membershipData);
    setShowMembershipRegistration(true);
  };

  const membershipCards = [
    {
      title: "BASIC MEMBER",
      benefit: [
        "Stempel/Poin di setiap transaksi",
        "Gratis 1x cuci setelah 10x transaksi",
        "Member card digital",
        "Notifikasi promo khusus",
      ],
      price: "0 dollars",
      button: "Daftar Sekarang",
      active: false,
    },
    {
      title: "REGULAR MEMBER",
      benefit: [
        "Semua benefit Basic Member",
        "Penjemputan dan pengantaran gratis",
        "Promo khusus member regular",
        "Priority customer service",
        "Diskon 10% untuk layanan premium",
      ],
      price: "3 dollars",
      button: "Daftar Sekarang",
      active: true,
    },
    {
      title: "LOYAL MEMBER",
      benefit: [
        "Semua benefit Regular Member",
        "Prioritas penjemputan di jam sibuk",
        "Layanan express gratis (24 jam)",
        "Personal laundry consultant",
        "Diskon 20% untuk layanan premium",
        "Voucher gratis dry cleaning (1x/bulan)",
      ],
      price: "6 dollars",
      button: "Daftar Sekarang",
      active: false,
    },
  ];

  return (
    <div className="font-sans text-gray-800 bg-[#f3fafd] pt-20">
      {/* Hero Section */}
     <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-16 bg-[#f3fafd]">
  <div>
    <h2 className="text-5xl font-semibold text-[#1c2c40] mb-2">Dapatkan 20% Diskon</h2>
    <p className="text-4xl text-gray-700">Untuk 3 order pertama Anda</p>
    <a
      href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20order%20laundry"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-5 bg-[#a9cdf7] hover:bg-[#8ab6f8] text-white font-semibold rounded-md px-6 py-3 shadow-md transition"
    >
      Order via WhatsApp
    </a>
        </div>
        <img
          src="/assets/hpmc.png"
          alt="Promo"
          className="w-80 md:w-96 mt-6 md:mt-0"
        />
       
      </section>

      {/* Services Section */}
      <section className="bg-[#b4d8f7] py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a2b49] mb-10">Layanan Kami</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-md w-52 hover:shadow-lg transition-shadow hover:-translate-y-1"
              >
                {service.icon}
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <PricingCalculatorSection />

      {/* Membership Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1a2b49] mb-10">Pilih Membership</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {membershipCards.map((card, index) => (
              <MembershipCard
                key={index}
                title={card.title}
                benefit={card.benefit}
                price={card.price}
                button={card.button}
                active={card.active}
                onClick={handleMembershipClick}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Service;
