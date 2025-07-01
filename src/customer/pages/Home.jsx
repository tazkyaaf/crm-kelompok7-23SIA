import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import WhyUsSection from "../components/WhyUsSection";
import ContactUsSection from "../components/ContactUsSection";
import ModalLogin from "../components/ModalLogin";
import TestimonialSection from "../components/TestimoniSection";
import FAQSection from "../components/FAQSection";
import MembershipCard from "../components/MembershipCard";

const Home = () => {
  const [user, setUser] = useState(null);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();
  const whyUsRef = useRef(null);
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } catch (e) {
      console.error("Invalid user in localStorage");
    }
  }, []);

  const handleMembershipClick = () => {
    if (user) {
      navigate("/membership");
    } else {
      setShowLoginOptions(true);
    }
  };

    const handleScrollToWhyUs = () => {
    if (whyUsRef.current) {
      whyUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
    <div className="font-sans text-gray-800 bg-[#f3fbff] min-h-screen pt-24">
     <HeroSection onSeeAll={handleScrollToWhyUs} />
<div ref={whyUsRef}>
  <WhyUsSection />
</div>

      
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
<TestimonialSection/>
<FAQSection/>
      <ContactUsSection />

      {showLoginOptions && <ModalLogin onClose={() => setShowLoginOptions(false)} />}
    </div>
  );
};

export default Home;
