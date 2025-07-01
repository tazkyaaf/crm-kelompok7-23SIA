import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  FaShippingFast,
  FaBox,
  FaTshirt
} from "react-icons/fa";
import { MdIron, MdLocalLaundryService } from "react-icons/md";
import PricingCalculatorSection from "../components/PricingCalculatorSection";
// import { MembershipRegistrationModal } from "../components/MembershipRegistrationModal";
import MembershipCard from "../components/MembershipCard";

const Service = () => {
  const [showMembershipRegistration, setShowMembershipRegistration] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const services = [
    {
      title: "Express",
      desc: "Cuci kilat selesai dalam 24 jam",
      icon: <FaShippingFast className="text-blue-600 w-10 h-10 mx-auto mb-4" />,
    },
    {
      title: "Setrika Saja",
      desc: "Layanan setrika profesional",
      icon: <MdIron className="text-green-600 w-10 h-10 mx-auto mb-4" />,
    },
    {
      title: "Cuci Lipat",
      desc: "Cuci bersih dengan lipatan rapi",
      icon: <FaBox className="text-purple-600 w-10 h-10 mx-auto mb-4" />,
    },
    {
      title: "Reguler",
      desc: "Paket lengkap cuci & setrika",
      icon: <MdLocalLaundryService className="text-orange-500 w-10 h-10 mx-auto mb-4" />,
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
        "Notifikasi promo khusus"
      ],
      price: "0 dollars",
      button: "Daftar Sekarang",
      active: false
    },
    {
      title: "REGULAR MEMBER",
      benefit: [
        "Semua benefit Basic Member",
        "Penjemputan dan pengantaran gratis",
        "Promo khusus member regular",
        "Priority customer service",
        "Diskon 10% untuk layanan premium"
      ],
      price: "3 dollars",
      button: "Daftar Sekarang",
      active: true
    },
    {
      title: "LOYAL MEMBER",
      benefit: [
        "Semua benefit Regular Member",
        "Prioritas penjemputan di jam sibuk",
        "Layanan express gratis (24 jam)",
        "Personal laundry consultant",
        "Diskon 20% untuk layanan premium",
        "Voucher gratis dry cleaning (1x/bulan)"
      ],
      price: "6 dollars",
      button: "Daftar Sekarang",
      active: false
    }
  ];

  return (
    <div className="font-sans text-gray-800 bg-[#f3fafd] pt-20">
  

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-16 bg-[#f3fafd]">
        <div>
          <h2 className="text-4xl font-bold text-[#a64500] mb-2">Dapatkan 20% Diskon</h2>
          <p className="text-xl text-gray-700">Untuk 3 order pertama Anda</p>
        </div>
        <img 
          src="/assets/hero-promo.png" 
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