import React from "react";

const testimonials = [
  {
    quoteTitle: "Pakaian jadi bersih dan wangi!",
    quoteDesc: "Pelayanan HTM Laundry benar-benar memuaskan. Pakaian saya kembali dalam kondisi sangat bersih, rapi, dan harum.",
    name: "Jaydon Aminoff",
    role: "Pelanggan Reguler",
    img: "/assets/org3.jpeg"
  },
  {
    quoteTitle: "Cepat dan tepat waktu!",
    quoteDesc: "Saya sangat terbantu dengan layanan antar jemput dari HTM Laundry. Pakaian selesai tepat waktu dan prosesnya sangat mudah.",
    name: "Alfredo Donin",
    role: "Pelanggan Setia",
    img: "/assets/org2.png"
  },
  {
    quoteTitle: "Layanan profesional dan ramah",
    quoteDesc: "Staf HTM Laundry sangat ramah dan profesional. Mereka menangani pakaian saya dengan sangat hati-hati. Highly recommended!",
    name: "Makenna Korsgaard",
    role: "Pelanggan Member",
    img: "/assets/org1.png"
  }
];

const TestimonialSection = () => (
  <section className="bg-[#eaf4fc] py-20 text-center">
    <h4 className="text-[#92bedc] font-medium text-base mb-1">TESTIMONI PELANGGAN</h4>
    <h2 className="text-2xl md:text-3xl font-bold text-[#243b56] mb-12">Apa Kata Mereka Tentang HTM Laundry?</h2>
    <div className="flex flex-wrap justify-center gap-8 px-6">
      {testimonials.map((item, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow text-left px-7 py-6 w-[320px]">
          <div className="flex gap-2 items-center mb-4">
            <svg width="24" height="20" fill="none">
              <path d="M8 10.667V19.333H0V13.333C0 8.15067 4.15067 4 9.33333 4C10.07 4 10.6667 4.59667 10.6667 5.33333C10.6667 6.07 10.07 6.66667 9.33333 6.66667C6.01933 6.66667 3.33333 9.35267 3.33333 12.6667V16H8V10.667ZM24 10.667V19.333H16V13.333C16 8.15067 20.1507 4 25.3333 4C26.07 4 26.6667 4.59667 26.6667 5.33333C26.6667 6.07 26.07 6.66667 25.3333 6.66667C22.0193 6.66667 19.3333 9.35267 19.3333 12.6667V16H24V10.667Z" fill="#bdd8e7"/>
            </svg>
          </div>
          <h4 className="text-[#223651] font-semibold mb-2">{item.quoteTitle}</h4>
          <p className="text-gray-600 text-sm mb-6">{item.quoteDesc}</p>
          <div className="flex items-center gap-3 mt-2">
            <img src={item.img} alt={item.name} className="rounded-full w-9 h-9 object-cover" />
            <div>
              <div className="font-semibold text-[#193252] text-sm">{item.name}</div>
              <div className="text-gray-500 text-xs">{item.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialSection;
