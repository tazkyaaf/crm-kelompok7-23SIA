import React from "react";
import "./HeroSection.css"; 

const HeroSection = ({ onSeeAll }) => (
  <section className="bg-[#f8fdff] relative overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-24">
    {/* Kiri - Teks */}
    <div className="md:w-1/2 w-full text-center md:text-left mt-10 md:mt-0 z-10">
      <h1 className="text-4xl md:text-5xl font-light text-[#1c2c40] leading-tight mb-8">
        Laundry today or <br /> <span className="font-medium">Naked tomorrow.</span>
      </h1>
      <button
        onClick={onSeeAll}
        className="bg-[#a9cdf7] hover:bg-[#8ab6f8] text-white font-semibold rounded-md px-6 py-3 shadow-md transition"
      >
        See All
      </button>
    </div>

    {/* Kanan - Mesin Cuci dan elemen visual */}
    <div className="md:w-1/2 w-full relative flex justify-center items-center z-10 md:pl-28"> {/* digeser kanan */}
      {/* Lingkaran biru di belakang mesin */}
      <div className="absolute bg-[#c8e2fb] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 -z-10 opacity-70"></div>

      {/* Mesin Cuci */}
      <img
        src="/assets/mesincuci.png"
        alt="Laundry Machine"
        className="w-64 md:w-[320px] z-10 relative"
      />

      {/* Ikon pickup & iron di kiri mesin */}
      <div className="absolute left-[0px] md:left-[155px]  md:bottom-[200px] flex flex-col gap-6 z-20">
        <div className="bg-white rounded-2xl p-4 shadow-lg w-20 md:w-24 animate-float-slow">
          <img src="/assets/icon1.png" alt="Pickup Icon" className="w-full" />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg w-20 md:w-24 animate-float">
          <img src="/assets/icon2.png" alt="Iron Icon" className="w-full" />
        </div>
      </div>
    </div>

    {/* Gelembung besar dengan gradasi di tengah lingkaran */}
    <div className="absolute top-1/2 left-[62%] w-16 h-16 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 animate-bubble-slow bg-gradient-to-br from-white to-[#b3d9ff] opacity-80"></div>

    {/* Gelembung kecil lainnya */}
    <div className="absolute top-[55%] left-[67%] w-6 h-6 rounded-full shadow-md bg-gradient-to-br from-white to-[#c5e5ff] opacity-70 animate-bubble"></div>
    <div className="absolute top-[65%] left-[65%] w-4 h-4 rounded-full shadow-md bg-gradient-to-br from-white to-[#d2ecff] opacity-60 animate-bubble-fast"></div>
    <div className="absolute top-[60%] left-[70%] w-3 h-3 rounded-full shadow-md bg-gradient-to-br from-white to-[#e1f4ff] opacity-50 animate-bubble"></div>
  </section>
);

export default HeroSection;
